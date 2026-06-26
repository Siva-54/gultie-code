from sqlalchemy import (
    Column,
    Integer,
    Text,
    DateTime,
    ForeignKey,
    String
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Comment(Base):

    __tablename__ = "comments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    blog_id = Column(
        Integer,
        ForeignKey("blogs.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    content = Column(
        Text,
        nullable=False
    )

    status = Column(
        String,
        default="active",
        nullable=False
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

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    blog = relationship(
        "Blog",
        back_populates="comments"
    )

    user = relationship(
        "User",
        foreign_keys=[user_id]
    )