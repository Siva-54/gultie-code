from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.core.database import Base


class LearningPlanTask(Base):

    __tablename__ = "learning_plan_tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    plan_id = Column(
        Integer,
        ForeignKey(
            "learning_plans.id"
        ),
        nullable=False
    )

    week_no = Column(
        Integer,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    checkpoint = Column(
        Text,
        nullable=True
    )

    completed = Column(
        Boolean,
        default=False
    )

    completed_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    plan = relationship(
        "LearningPlan",
        back_populates="tasks"
    )