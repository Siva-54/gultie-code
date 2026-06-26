from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Domain(Base):

    __tablename__ = "domains"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    minimum_duration_weeks = Column(
        Integer,
        nullable=False
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id")
    )

    updated_by = Column(
        Integer,
        ForeignKey("users.id")
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    status = Column(
        String,
        default="active"
    )

    levels = relationship(
        "Level",
        back_populates="domain"
    )

    plans = relationship(
        "LearningPlan",
        back_populates="domain"
    )