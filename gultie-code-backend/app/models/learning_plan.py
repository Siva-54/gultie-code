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


class LearningPlan(Base):

    __tablename__ = "learning_plans"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    domain_id = Column(
        Integer,
        ForeignKey("domains.id"),
        nullable=False
    )

    current_knowledge = Column(
        String,
        nullable=False
    )

    hours_per_day = Column(
        Integer,
        nullable=False
    )

    duration_weeks = Column(
        Integer,
        nullable=False
    )

    goal = Column(
        Text,
        nullable=True
    )

    status = Column(
        String,
        default="active"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )

    tasks = relationship(
        "LearningPlanTask",
        back_populates="plan",
        cascade="all, delete-orphan"
    )

    domain = relationship(
        "Domain",
        back_populates="plans"
    )

    user = relationship(
        "User",
        back_populates="learning_plans"
    )