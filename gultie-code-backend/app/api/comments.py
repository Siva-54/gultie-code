from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.dependencies import get_db

from app.schemas.comment import (
    CommentCreate,
    CommentResponse
)

from app.models.user import User

from app.core.dependencies import (
    get_current_user
)

from app.services.comment_service import (
    create_comment,
    get_blog_comments,
    delete_comment
)

router = APIRouter(
    tags=["Comments"]
)


@router.post(
    "/blogs/{blog_id}/comments",
    response_model=CommentResponse
)
def create_comment_route(
    blog_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return create_comment(
        blog_id,
        data,
        current_user,
        db
    )


@router.get(
    "/blogs/{blog_id}/comments",
    response_model=list[CommentResponse]
)
def get_comments_route(
    blog_id: int,
    db: Session = Depends(get_db)
):
    return get_blog_comments(
        blog_id,
        db
    )


@router.patch(
    "/comments/{comment_id}/delete",
    response_model=CommentResponse
)
def delete_comment_route(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return delete_comment(
        comment_id,
        current_user,
        db
    )