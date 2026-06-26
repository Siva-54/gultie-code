from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.domain import Domain
from app.models.level import Level
from app.models.user import User

from app.schemas.domain import (
    DomainCreate,
    DomainUpdate
)


def create_domain(
    data: DomainCreate,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can create domains"
        )

    existing_domain = (
        db.query(Domain)
        .filter(
            Domain.name == data.name,
            Domain.status != "deleted"
        )
        .first()
    )

    if existing_domain:
        raise HTTPException(
            status_code=400,
            detail="Domain already exists"
        )

    domain = Domain(
        name=data.name,
        description=data.description,
        minimum_duration_weeks=data.minimum_duration_weeks,
        created_by=current_user.id,
        updated_by =current_user.id
    )

    db.add(domain)

    db.commit()

    db.refresh(domain)

    return domain


def get_domains(
    db: Session
):

    return (
        db.query(Domain)
        .filter(
            Domain.status != "deleted"
        )
        .all()
    )


def get_domain_by_id(
    domain_id: int,
    db: Session
):

    domain = (
        db.query(Domain)
        .filter(
            Domain.id == domain_id,
            Domain.status != "deleted"
        )
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    return domain


def update_domain(
    domain_id: int,
    data: DomainUpdate,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can update domains"
        )

    domain = (
        db.query(Domain)
        .filter(
            Domain.id == domain_id,
            Domain.status != "deleted"
        )
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    update_data = (
        data.model_dump(
            exclude_unset=True
        )
    )

    for key, value in update_data.items():
        setattr(
            domain,
            key,
            value
        )

    domain.updated_by = current_user.id

    db.commit()

    db.refresh(domain)

    return domain


def delete_domain(
    domain_id: int,
    current_user: User,
    db: Session
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can delete domains"
        )

    domain = (
        db.query(Domain)
        .filter(
            Domain.id == domain_id
        )
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    domain.status = "deleted"

    domain.updated_by = current_user.id

    levels = (
        db.query(Level)
        .filter(
            Level.domain_id == domain_id,
            Level.status != "deleted"
        )
        .all()
    )

    for level in levels:
        level.status = "deleted"
        level.updated_by = current_user.id

    db.commit()

    db.refresh(domain)

    return domain