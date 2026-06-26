from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    status: str
    created_at: datetime
    updated_at: datetime | None = None
    email_verified: bool
    email_verified_at: datetime | None = None
    approved_by: int | None = None
    approved_at: datetime | None = None
    rejected_by: int | None = None
    rejected_at: datetime | None = None
    deleted_by: int | None = None
    deleted_at: datetime | None = None

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None


class UserApprovalResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    status: str
    role: str
    approved_by: int | None
    approved_at: datetime | None

    class Config:
        from_attributes = True