from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.level import Level
from app.models.domain import Domain
from app.models.user import User

from app.schemas.level import (
    LevelCreate,
    LevelUpdate
)


def create_level(
    data: LevelCreate,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can create levels"
        )

    domain = (
        db.query(Domain)
        .filter(
            Domain.id == data.domain_id,
            Domain.status != "deleted"
        )
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    level = Level(
        domain_id=data.domain_id,
        title=data.title,
        description=data.description,
        order_no=data.order_no,
        created_by=current_user.id
    )

    db.add(level)

    db.commit()

    db.refresh(level)

    return level


def get_levels(
    db: Session
):

    return (
        db.query(Level)
        .filter(
            Level.status != "deleted"
        )
        .order_by(
            Level.order_no.asc()
        )
        .all()
    )


def get_level_by_id(
    level_id: int,
    db: Session
):

    level = (
        db.query(Level)
        .filter(
            Level.id == level_id,
            Level.status != "deleted"
        )
        .first()
    )

    if not level:
        raise HTTPException(
            status_code=404,
            detail="Level not found"
        )

    return level


def get_levels_by_domain(
    domain_id: int,
    db: Session
):

    return (
        db.query(Level)
        .filter(
            Level.domain_id == domain_id,
            Level.status != "deleted"
        )
        .order_by(
            Level.order_no.asc()
        )
        .all()
    )


def update_level(
    level_id: int,
    data: LevelUpdate,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can update levels"
        )

    level = (
        db.query(Level)
        .filter(
            Level.id == level_id,
            Level.status != "deleted"
        )
        .first()
    )

    if not level:
        raise HTTPException(
            status_code=404,
            detail="Level not found"
        )

    update_data = (
        data.model_dump(
            exclude_unset=True
        )
    )

    for key, value in update_data.items():
        setattr(
            level,
            key,
            value
        )

    level.updated_by = current_user.id

    db.commit()

    db.refresh(level)

    return level


def delete_level(
    level_id: int,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can delete levels"
        )

    level = (
        db.query(Level)
        .filter(
            Level.id == level_id
        )
        .first()
    )

    if not level:
        raise HTTPException(
            status_code=404,
            detail="Level not found"
        )

    level.status = "deleted"

    level.updated_by = current_user.id

    db.commit()

    db.refresh(level)

    return level