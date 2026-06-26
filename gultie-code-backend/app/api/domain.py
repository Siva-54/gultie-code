from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_user
)

from app.models.user import User

from app.schemas.domain import (
    DomainCreate,
    DomainUpdate,
    DomainResponse
)

from app.services.domain_service import (
    create_domain,
    get_domains,
    get_domain_by_id,
    update_domain,
    delete_domain
)

router = APIRouter(
    prefix="/domains",
    tags=["Domains"]
)

@router.post(
    "",
    response_model=DomainResponse
)
def create_domain_route(
    data: DomainCreate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return create_domain(
        data,
        current_user,
        db
    )

@router.get(
    "",
    response_model=list[
        DomainResponse
    ]
)
def get_domains_route(
    db: Session = Depends(
        get_db
    )
):
    return get_domains(
        db
    )

@router.get(
    "/{domain_id}",
    response_model=DomainResponse
)
def get_domain_route(
    domain_id: int,
    db: Session = Depends(
        get_db
    )
):
    return get_domain_by_id(
        domain_id,
        db
    )


@router.patch(
    "/{domain_id}",
    response_model=DomainResponse
)
def update_domain_route(
    domain_id: int,
    data: DomainUpdate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return update_domain(
        domain_id,
        data,
        current_user,
        db
    )

@router.delete(
    "/{domain_id}",
    response_model=DomainResponse
)
def delete_domain_route(
    domain_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return delete_domain(
        domain_id,
        current_user,
        db
    )