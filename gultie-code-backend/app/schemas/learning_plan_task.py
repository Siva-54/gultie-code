from datetime import datetime

from pydantic import BaseModel


class LearningPlanTaskResponse(
    BaseModel
):
    id: int
    plan_id: int
    week_no: int
    title: str
    description: str | None
    checkpoint: str | None
    completed: bool
    completed_at: datetime | None

    class Config:

        from_attributes = True

class CompleteTaskRequest(
    BaseModel
):

    completed: bool