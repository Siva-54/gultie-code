from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.blog import Blog
from app.models.comment import Comment
from app.models.user import User

from app.schemas.comment import (
    CommentCreate
)

def create_comment(
    blog_id: int,
    data: CommentCreate,
    current_user: User,
    db: Session
):

    blog = (
        db.query(Blog)
        .filter(
            Blog.id == blog_id,
            Blog.status == "active"
        )
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )

    comment = Comment(
        blog_id=blog_id,
        user_id=current_user.id,
        content=data.comment
    )

    db.add(comment)

    db.commit()

    db.refresh(comment)

    return {
        "id": comment.id,
        "blog_id": comment.blog_id,
        "user_id": comment.user_id,
        "commenter_username": comment.user.username,
        "comment": comment.content,
        "status": comment.status,
        "created_at": comment.created_at
    }


def get_blog_comments(
    blog_id: int,
    db: Session
):

    comments = (
        db.query(Comment)
        .filter(
            Comment.blog_id == blog_id,
            Comment.status == "active"
        )
        .order_by(
            Comment.created_at.asc()
        )
        .all()
    )

    return [
        {
            "id": comment.id,
            "blog_id": comment.blog_id,
            "user_id": comment.user_id,
            "commenter_username": comment.user.username,
            "comment": comment.content,
            "status": comment.status,
            "created_at": comment.created_at
        }
        for comment in comments
    ]

def delete_comment(
    comment_id: int,
    current_user: User,
    db: Session
):

    comment = (
        db.query(Comment)
        .filter(
            Comment.id == comment_id
        )
        .first()
    )

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if comment.status == "deleted":
        raise HTTPException(
            status_code=400,
            detail="Comment already deleted"
        )

    is_owner = (
        comment.user_id ==
        current_user.id
    )

    is_admin = (
        current_user.role ==
        "admin"
    )

    if not (
        is_owner or is_admin
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    comment.status = "deleted"

    comment.deleted_by = (
        current_user.id
    )

    comment.deleted_at = (
        datetime.now(timezone.utc)
    )

    db.commit()

    db.refresh(comment)

    return {
        "id": comment.id,
        "blog_id": comment.blog_id,
        "user_id": comment.user_id,
        "commenter_username": comment.user.username,
        "comment": comment.content,
        "status": comment.status,
        "created_at": comment.created_at
    }