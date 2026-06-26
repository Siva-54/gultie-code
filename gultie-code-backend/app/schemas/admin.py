from pydantic import BaseModel, EmailStr
from typing import Literal
from datetime import datetime

class RoleUpdateRequest(BaseModel):
    role: str

class StatusUpdateRequest(BaseModel):
    status: str

class UserApprovalResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    status: str
    approved_by: int | None = None
    approved_at: datetime | None = None
    rejected_by: int | None = None
    rejected_at: datetime | None = None
    deleted_by: int | None = None
    deleted_at: datetime | None = None

    class Config:
        from_attributes = True


class RoleUpdateRequest(BaseModel):
    role: Literal[
        "user",
        "admin"
    ]