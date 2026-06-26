from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func

from app.core.database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    level_id = Column(
        Integer,
        ForeignKey("levels.id"),
        nullable=False
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