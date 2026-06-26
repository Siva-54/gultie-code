from pydantic import BaseModel
from datetime import datetime


class DomainCreate(BaseModel):
    name: str
    description: str | None = None
    minimum_duration_weeks: int


class DomainUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    minimum_duration_weeks: int | None = None
    status: str | None = None


class DomainResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    minimum_duration_weeks: int
    created_by: int
    created_at: datetime
    updated_at: datetime | None = None
    updated_by: int | None = None

    class Config:
        from_attributes = True