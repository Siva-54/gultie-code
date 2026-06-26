from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, nullable=False, unique=True)

    email = Column(String, nullable=False, unique=True)

    password_hash = Column(String, nullable=False)

    role = Column(
        String,
        nullable=False,
        default="user"
    )

    status = Column(
        String,
        nullable=False,
        default="pending"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    approved_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    approved_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    rejected_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    rejected_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    deleted_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    deleted_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    email_verified = Column(
        Boolean,
        default=False
    )

    email_verified_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    verification_token = Column(
        String,
        unique=True,
        nullable=True
    )

    blogs = relationship(
        "Blog",
        foreign_keys="Blog.author_id"
    )

    comments = relationship(
        "Comment",
        foreign_keys="Comment.user_id"
    )

    learning_plans = relationship(
        "LearningPlan",
        back_populates="user"
    )