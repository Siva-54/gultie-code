from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.blog import Blog
from app.models.user import User

from app.schemas.blog import BlogCreate

def create_blog(
    data: BlogCreate,
    current_user: User,
    db: Session
):

    blog = Blog(
        title=data.title,
        content=data.content,
        author_id=current_user.id
    )

    db.add(blog)

    db.commit()

    db.refresh(blog)

    return {
        "id": blog.id,
        "title": blog.title,
        "content": blog.content,
        "author_id": blog.author_id,
        "author_username": blog.author.username,
        "created_at": blog.created_at,
        "status": blog.status
    }


def get_all_blogs(
    db: Session
):

    blogs = (
        db.query(Blog)
        .filter(
            Blog.status == "active"
        )
        .order_by(
            Blog.created_at.desc()
        )
        .all()
    )

    return [
        {
            "id": blog.id,
            "title": blog.title,
            "content": blog.content,
            "author_id": blog.author_id,
            "author_username": blog.author.username,
            "created_at": blog.created_at,
            "status": blog.status
        }
        for blog in blogs
    ]


def get_blog_by_id(
    blog_id: int,
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

    return {
        "id": blog.id,
        "title": blog.title,
        "content": blog.content,
        "author_id": blog.author_id,
        "author_username": blog.author.username,
        "created_at": blog.created_at,
        "status": blog.status
    }


def delete_blog(
    blog_id: int,
    current_user: User,
    db: Session
):

    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )

    if blog.status == "deleted":
        raise HTTPException(
            status_code=400,
            detail="Blog already deleted"
        )

    is_author = (
        blog.author_id ==
        current_user.id
    )

    is_admin = (
        current_user.role ==
        "admin"
    )

    if not (
        is_author or is_admin
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    blog.status = "deleted"

    blog.deleted_by = (
        current_user.id
    )

    blog.deleted_at = (
        datetime.now(timezone.utc)
    )

    db.commit()

    db.refresh(blog)

    return {
        "id": blog.id,
        "title": blog.title,
        "content": blog.content,
        "author_id": blog.author_id,
        "author_username": blog.author.username,
        "created_at": blog.created_at,
        "status": blog.status
    }
