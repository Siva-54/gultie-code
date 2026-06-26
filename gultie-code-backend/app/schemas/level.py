from pydantic import BaseModel
from datetime import datetime


class LevelCreate(BaseModel):
    domain_id: int
    title: str
    description: str | None = None
    order_no: int


class LevelUpdate(BaseModel):
    domain_id: int | None = None
    name: str | None = None
    description: str | None = None
    order_no: int | None = None
    status: str | None = None


class LevelResponse(BaseModel):
    id: int
    domain_id: int
    title: str
    description: str | None = None
    order_no: int
    created_by: int
    updated_by: int | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
