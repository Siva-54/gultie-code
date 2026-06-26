from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.schemas.learning_plan import GeneratePlanRequest
from app.models.user import User
from app.core.dependencies import (get_db, get_current_user)
from app.services.learning_plan_service import *

router = APIRouter(
    prefix="/learning-plans",
    tags=["Learning Plans"]
)


@router.post(
    "/generate"
)
def generate_plan_route(
    data: GeneratePlanRequest,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return generate_plan(
        data,
        current_user,
        db
    )

@router.get("")
def get_my_plans_route(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return get_my_plans(
        current_user,
        db
    )

@router.get(
    "/{plan_id}"
)
def get_plan_route(
    plan_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return get_plan(
        plan_id,
        current_user,
        db
    )

@router.patch(
    "/tasks/{task_id}/complete"
)
def complete_task_route(
    task_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return toggle_task_completion(
        task_id,
        current_user,
        db
    )

@router.delete("/{plan_id}")
def remove_plan(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return delete_plan(
        plan_id,
        current_user,
        db
    )