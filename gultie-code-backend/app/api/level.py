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

from app.schemas.level import (
    LevelCreate,
    LevelUpdate,
    LevelResponse
)

from app.services.level_service import (
    create_level,
    get_levels,
    get_level_by_id,
    get_levels_by_domain,
    update_level,
    delete_level
)

router = APIRouter(
    prefix="/levels",
    tags=["Levels"]
)

@router.post(
    "",
    response_model=LevelResponse
)
def create_level_route(
    data: LevelCreate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return create_level(
        data,
        current_user,
        db
    )


@router.get(
    "",
    response_model=list[
        LevelResponse
    ]
)
def get_levels_route(
    db: Session = Depends(
        get_db
    )
):
    return get_levels(
        db
    )


@router.get(
    "/{level_id}",
    response_model=LevelResponse
)
def get_level_route(
    level_id: int,
    db: Session = Depends(
        get_db
    )
):
    return get_level_by_id(
        level_id,
        db
    )


@router.get(
    "/domain/{domain_id}",
    response_model=list[
        LevelResponse
    ]
)
def get_domain_levels_route(
    domain_id: int,
    db: Session = Depends(
        get_db
    )
):
    return get_levels_by_domain(
        domain_id,
        db
    )

@router.patch(
    "/{level_id}",
    response_model=LevelResponse
)
def update_level_route(
    level_id: int,
    data: LevelUpdate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return update_level(
        level_id,
        data,
        current_user,
        db
    )

@router.delete(
    "/{level_id}",
    response_model=LevelResponse
)
def delete_level_route(
    level_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return delete_level(
        level_id,
        current_user,
        db
    )

