from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, timezone
import secrets

from app.models.user import User
from app.models.blog import Blog
from app.models.comment import Comment
from app.schemas.auth import RegisterRequest, LoginRequest

from app.core.security import (
    verify_password,
    create_access_token,
    hash_password
)


def register_user(
    data: RegisterRequest,
    db: Session
):

    existing_user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if existing_user:

        if existing_user.status == "deleted":
            raise HTTPException(
                status_code=403,
                detail="This account was deleted by admin and cannot be registered again"
            )

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_username = (
        db.query(User)
        .filter(User.username == data.username)
        .first()
    )

    if existing_username:

        if existing_username.status == "deleted":
            raise HTTPException(
                status_code=403,
                detail="This account was deleted by admin and cannot be registered again"
            )

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    verification_token = secrets.token_urlsafe(32)

    user = User(
        username=data.username,
        email=data.email,
        password_hash=hash_password(
            data.password
        ),
        verification_token=verification_token,
        role="user",
        status="pending"
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {
        "message":
        "Registration successful. Please verify your email.",
        "verification_token":
        verification_token
    }

def verify_email(
    token: str,
    db: Session
):

    user = (
        db.query(User)
        .filter(
            User.verification_token == token
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Invalid verification token"
        )

    if user.email_verified:
        return {
            "message": "Email already verified"
        }

    user.email_verified = True

    user.email_verified_at = datetime.now(timezone.utc)

    user.verification_token = None

    db.commit()

    return {
        "message": "Email verified successfully"
    }

def login_user(
    data: LoginRequest,
    db: Session
):

    user = (
        db.query(User)
        .filter(
            User.email == data.email
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # if not user.email_verified:
    #     raise HTTPException(
    #         status_code=403,
    #         detail="Email not verified"
    #     )

    if user.status == "pending":
        raise HTTPException(
            status_code=403,
            detail="Awaiting admin approval"
        )

    if user.status == "rejected":
        raise HTTPException(
            status_code=403,
            detail="Account rejected by admin"
        )

    if user.status == "deleted":
        raise HTTPException(
            status_code=403,
            detail="Account deleted by admin"
        )

    token = create_access_token(
        {
            "user_id": user.id,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }

def get_me(user: User):

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "status": user.status,
        "email_verified": user.email_verified,
        "created_at": user.created_at,
        "approved_at": user.approved_at
    }

def get_pending_users(
    db: Session
):

    users = (
        db.query(User)
        .filter(
            User.status == "pending"
        )
        .all()
    )

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "email_verified": user.email_verified,
            "created_at": user.created_at
        }
        for user in users
    ]

def approve_user(
    user_id: int,
    admin: User,
    db: Session
):

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

    user.status = "approved"

    user.approved_by = admin.id

    user.approved_at = datetime.now(timezone.utc)

    db.commit()

    return {
        "message":
        f"{user.username} approved successfully"
    }


def delete_user(
    user_id: int,
    admin: User,
    db: Session
):

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

    if user.id == admin.id:
        raise HTTPException(
            status_code=403,
            detail="Cannot delete yourself"
        )

    if user.role == "admin":
        raise HTTPException(
            status_code=403,
            detail="Cannot delete admin users"
        )

    if user.status == "deleted":
        raise HTTPException(
            status_code=400,
            detail="User is already deleted"
        )

    user.status = "deleted"
    user.deleted_by = admin.id
    user.deleted_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(user)

    return {
        "message":
        f"{user.username} deleted successfully"
    }

def get_active_users(
    db: Session
):

    users = (
        db.query(User)
        .filter(User.status != "deleted")
        .all()
    )

    return users

def get_all_users(
    db: Session
):

    return (
        db.query(User)
        .all()
    )


def reject_user(
    user_id: int,
    admin: User,
    db: Session
):

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

    if user.role == "admin":
        raise HTTPException(
            status_code=403,
            detail="Cannot reject admin"
        )

    user.status = "rejected"

    user.rejected_by = admin.id

    user.rejected_at = datetime.now(timezone.utc)

    db.commit()

    db.refresh(user)

    return user


def change_role(
    user_id: int,
    role: str,
    admin: User,
    db: Session
):

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

    if user.id == admin.id:
        raise HTTPException(
            status_code=403,
            detail="Cannot modify your own role"
        )

    user.role = role

    db.commit()

    db.refresh(user)

    return user


def get_profile_stats(
    current_user: User,
    db: Session
):

    blogs_count = (
        db.query(Blog)
        .filter(
            Blog.author_id == current_user.id,
            Blog.status != "deleted"
        )
        .count()
    )

    comments_count = (
        db.query(Comment)
        .filter(
            Comment.user_id == current_user.id,
            Comment.status != "deleted"
        )
        .count()
    )

    return {
        "blogs_count": blogs_count,
        "comments_count": comments_count
    }