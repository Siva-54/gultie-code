from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest
)

from app.services.auth_service import (
    register_user,
    verify_email,
    login_user,
    get_me,
    get_profile_stats
)

from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    return register_user(
        data,
        db
    )

@router.get("/verify-email")
def verify_email_route(
    token: str,
    db: Session = Depends(get_db)
):
    return verify_email(
        token,
        db
    )

@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    return login_user(
        data,
        db
    )

@router.get("/me")
def me(
    current_user: User = Depends(
        get_current_user
    )
):
    return get_me(current_user)

@router.get(
    "/profile/stats"
)
def get_profile_stats_route(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    )
):
    return get_profile_stats(
        current_user,
        db
    )
