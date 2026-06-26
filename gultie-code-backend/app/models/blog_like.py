from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from app.core.database import Base

class BlogLike(Base):
    __tablename__ = "blog_likes"

    id = Column(Integer, primary_key=True, index=True)

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