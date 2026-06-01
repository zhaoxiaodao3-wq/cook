from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse, PaginatedData
from app.schemas.dish import DishListOut
from app.schemas.rating import UserRatingOut
from app.schemas.suggestion import UserSuggestionOut
from app.schemas.user import UserOut, UserStatsOut, UserUpdateIn
from app.services.dish import get_user_dishes
from app.services.rating import get_user_ratings
from app.services.suggestion import get_user_suggestions
from app.services.user import get_user_by_id, get_user_stats, update_user as svc_update_user

router = APIRouter(prefix="/users", tags=["用户"])


@router.get("/me", response_model=ApiResponse[UserOut], summary="获取当前用户信息")
async def get_me(current_user: User = Depends(get_current_user)):
    return ApiResponse(data=UserOut.model_validate(current_user))


@router.put("/me", response_model=ApiResponse[UserOut], summary="更新用户信息")
async def update_me(
    body: UserUpdateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user = await svc_update_user(db, current_user, body.nickname, body.avatar_url)
    return ApiResponse(data=UserOut.model_validate(user))


@router.get("/me/stats", response_model=ApiResponse[UserStatsOut], summary="个人统计数据")
async def my_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stats = await get_user_stats(db, current_user.id)
    return ApiResponse(data=UserStatsOut(**stats))


@router.get("/me/dishes", response_model=ApiResponse[PaginatedData[DishListOut]], summary="我上传的菜品")
async def my_dishes(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页数量"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    dishes, total = await get_user_dishes(db, current_user.id, page=page, page_size=page_size)
    return ApiResponse(
        data=PaginatedData(
            items=[DishListOut.model_validate(d) for d in dishes],
            total=total,
            page=page,
            page_size=page_size,
        )
    )


@router.get("/me/ratings", response_model=ApiResponse[PaginatedData[UserRatingOut]], summary="我评分过的记录")
async def my_ratings(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页数量"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    ratings, total = await get_user_ratings(db, current_user.id, page=page, page_size=page_size)
    items = [
        UserRatingOut(
            id=r.id,
            dish_id=r.dish_id,
            dish_name=r.dish.name if r.dish else "",
            dish_cover=r.dish.cover if r.dish else None,
            stars=r.stars,
            created_at=r.created_at,
        )
        for r in ratings
    ]
    return ApiResponse(data=PaginatedData(items=items, total=total, page=page, page_size=page_size))


@router.get("/me/suggestions", response_model=ApiResponse[PaginatedData[UserSuggestionOut]], summary="我写过的建议")
async def my_suggestions(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页数量"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    suggestions, total = await get_user_suggestions(db, current_user.id, page=page, page_size=page_size)
    items = [
        UserSuggestionOut(
            id=s.id,
            dish_id=s.dish_id,
            dish_name=s.dish.name if s.dish else "",
            dish_cover=s.dish.cover if s.dish else None,
            content=s.content,
            created_at=s.created_at,
        )
        for s in suggestions
    ]
    return ApiResponse(data=PaginatedData(items=items, total=total, page=page, page_size=page_size))


@router.get("/{user_id}", response_model=ApiResponse[UserOut], summary="查看用户主页")
async def get_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
):
    user = await get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    return ApiResponse(data=UserOut.model_validate(user))
