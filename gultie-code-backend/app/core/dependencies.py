from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from jose import JWTError

from app.core.security import decode_access_token
from app.models.user import User
from app.core.database import SessionLocal

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    try:

        payload = decode_access_token(token)

        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.status == "deleted":
        raise HTTPException(
            status_code=401,
            detail="Account deleted"
        )

    if user.status == "rejected":
        raise HTTPException(
            status_code=401,
            detail="Account rejected"
        )

    return user


def get_current_admin(
    current_user: User = Depends(
        get_current_user
    )
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user

