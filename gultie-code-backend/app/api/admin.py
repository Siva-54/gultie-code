from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_admin
)

from app.models.user import User
from app.schemas.user import UserResponse, UserApprovalResponse
from app.schemas.admin import RoleUpdateRequest

from app.services.auth_service import (
    get_pending_users,
    approve_user,
    delete_user,
    get_all_users,
    reject_user,
    change_role
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/users/pending")
def pending_users(
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return get_pending_users(db)

@router.patch(
    "/users/{user_id}/approve"
)
def approve_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return approve_user(
        user_id,
        admin,
        db
    )

@router.patch(
    "/users/{user_id}/delete"
)
def delete_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return delete_user(
        user_id,
        admin,
        db
    )

@router.get(
    "/users",
    response_model=list[UserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return get_all_users(db)

@router.patch(
    "/users/{user_id}/reject",
    response_model=UserApprovalResponse
)
def reject_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return reject_user(
        user_id,
        admin,
        db
    )

@router.patch(
    "/users/{user_id}/role",
    response_model=UserResponse
)
def change_role_route(
    user_id: int,
    data: RoleUpdateRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    )
):
    return change_role(
        user_id,
        data.role,
        admin,
        db
    )