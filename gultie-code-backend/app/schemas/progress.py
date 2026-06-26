from pydantic import BaseModel
from datetime import datetime


class ProgressResponse(BaseModel):
    user_id: int
    level_id: int
    completed: bool
    completed_at: datetime | None

    class Config:
        from_attributes = True