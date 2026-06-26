from fastapi import HTTPException

from sqlalchemy.orm import Session
from datetime import ( datetime, timezone )
 
from app.models.domain import Domain
from app.models.user import User

from app.models.learning_plan import (
    LearningPlan
)

from app.services.ai_service import (
    generate_roadmap
)

from app.models.learning_plan_task import (
    LearningPlanTask
)

from app.schemas.learning_plan import (
    GeneratePlanRequest
)

from app.constants.roadmaps import (
    ROADMAPS
)

def generate_plan(
    data: GeneratePlanRequest,
    current_user: User,
    db: Session
):

    domain = (
        db.query(Domain)
        .filter(
            Domain.id == data.domain_id,
            Domain.status != "deleted"
        )
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    if (
        data.duration_weeks <
        domain.minimum_duration_weeks
    ):
        raise HTTPException(
            status_code=400,
            detail=
            f"Minimum duration for {domain.name} is {domain.minimum_duration_weeks} weeks"
        )

    roadmap = generate_roadmap(
        domain=domain.name,
        current_knowledge=data.current_knowledge,
        hours_per_day=data.hours_per_day,
        duration_weeks=data.duration_weeks,
        goal=data.goal
    )

    if not roadmap:
        raise HTTPException(
            status_code=400,
            detail="Roadmap template not found"
        )

    plan = LearningPlan(
        user_id=current_user.id,
        domain_id=domain.id,
        current_knowledge=data.current_knowledge,
        hours_per_day=data.hours_per_day,
        duration_weeks=data.duration_weeks,
        goal=data.goal
    )

    db.add(plan)

    db.commit()

    db.refresh(plan)

    for item in roadmap["weeks"]:

        task = LearningPlanTask(
            plan_id=plan.id,
            week_no=item["week"],
            title=item["title"],
            description=item["description"],
            checkpoint=item["checkpoint"]
        )

        db.add(task)

    db.commit()

    return {
        "plan_id": plan.id,
        "user_id": plan.user_id,
        "domain_id": plan.domain_id,
        "current_knowledge": plan.current_knowledge,
        "hours_per_day": plan.hours_per_day,
        "duration_weeks": plan.duration_weeks,
        "goal": plan.goal,
        "status": plan.status
    }


def get_my_plans(
    current_user: User,
    db: Session
):

    plans = (
        db.query(
            LearningPlan
        )
        .filter(
            LearningPlan.user_id ==
            current_user.id
        )
        .all()
    )

    response = []

    for plan in plans:

        total_tasks = len(
            plan.tasks
        )

        completed_tasks = len([
            task
            for task in plan.tasks
            if task.completed
        ])

        progress = (
            round(
                completed_tasks
                / total_tasks
                * 100
            )
            if total_tasks > 0
            else 0
        )

        response.append({

            "id": plan.id,

            "domain_id":
                plan.domain_id,

            "domain_name":
                plan.domain.name,

            "duration_weeks":
                plan.duration_weeks,

            "current_knowledge":
                plan.current_knowledge,

            "goal":
                plan.goal,

            "total_tasks":
                total_tasks,

            "completed_tasks":
                completed_tasks,

            "progress":
                progress,

            "created_at":
                plan.created_at

        })

    return response

def get_plan(
    plan_id: int,
    current_user: User,
    db: Session
):

    plan = (
        db.query(
            LearningPlan
        )
        .filter(
            LearningPlan.id == plan_id
        )
        .first()
    )

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Plan not found"
        )

    if (
        plan.user_id !=
        current_user.id
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return {
        "plan": plan,
        "domain": plan.domain,
        "tasks": plan.tasks
    }

def toggle_task_completion(
    task_id: int,
    current_user: User,
    db: Session
):

    task = (
        db.query(
            LearningPlanTask
        )
        .join(
            LearningPlan
        )
        .filter(
            LearningPlanTask.id == task_id,
            LearningPlan.user_id == current_user.id
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.completed = (
        not task.completed
    )

    if task.completed:

        task.completed_at = (
            datetime.now(
                timezone.utc
            )
        )

    else:

        task.completed_at = None

    db.commit()

    db.refresh(task)

    return task

def delete_plan(
    plan_id: int,
    current_user: User,
    db: Session
):

    plan = (
        db.query(LearningPlan)
        .filter(
            LearningPlan.id == plan_id,
            LearningPlan.user_id == current_user.id
        )
        .first()
    )

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Plan not found"
        )

    db.delete(plan)

    db.commit()

    return {
        "message": "Plan deleted"
    }
