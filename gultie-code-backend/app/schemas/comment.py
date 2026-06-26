from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    blog_id: int
    comment: str

class CommentResponse(BaseModel):
    id: int
    blog_id: int
    user_id: int
    commenter_username: str
    comment: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
