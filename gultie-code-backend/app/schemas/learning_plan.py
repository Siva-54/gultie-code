from pydantic import BaseModel
from datetime import datetime

class LearningPlanCreate(
    BaseModel
):
    domain_id: int
    current_knowledge: str
    hours_per_day: int
    duration_weeks: int
    goal: str | None = None

    class Config:

        from_attributes = True


class LearningPlanResponse(
    BaseModel
):
    id: int
    user_id: int
    domain_id: int
    current_knowledge: str
    hours_per_day: int
    duration_weeks: int
    goal: str | None
    status: str
    created_at: datetime

    class Config:

        from_attributes = True

class GeneratePlanRequest(
    BaseModel
):
    domain_id: int
    current_knowledge: str
    hours_per_day: int
    duration_weeks: int
    goal: str