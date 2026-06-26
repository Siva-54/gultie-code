from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base

class Level(Base):
    __tablename__ = "levels"

    id = Column(Integer, primary_key=True, index=True)

    domain_id = Column(
        Integer,
        ForeignKey("domains.id"),
        nullable=False
    )

    title = Column(String, nullable=False)

    description = Column(Text)

    points = Column(
        Integer,
        nullable=False,
        default=10
    )

    order_no = Column(
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

    domain = relationship(
        "Domain",
        back_populates="levels"
    )

    