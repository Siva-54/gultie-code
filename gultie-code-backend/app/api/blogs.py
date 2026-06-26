from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.dependencies import get_db

from app.schemas.blog import (
    BlogCreate,
    BlogResponse
)

from app.models.user import User

from app.core.dependencies import (
    get_current_user
)

from app.services.blog_service import (
    create_blog,
    get_all_blogs,
    get_blog_by_id,
    delete_blog
)

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)


@router.post(
    "",
    response_model=BlogResponse
)
def create_blog_route(
    data: BlogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return create_blog(
        data,
        current_user,
        db
    )


@router.get(
    "",
    response_model=list[BlogResponse]
)
def get_blogs_route(
    db: Session = Depends(get_db)
):
    return get_all_blogs(db)


@router.get(
    "/{blog_id}",
    response_model=BlogResponse
)
def get_blog_route(
    blog_id: int,
    db: Session = Depends(get_db)
):
    return get_blog_by_id(
        blog_id,
        db
    )


@router.patch(
    "/{blog_id}/delete",
    response_model=BlogResponse
)
def delete_blog_route(
    blog_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return delete_blog(
        blog_id,
        current_user,
        db
    )