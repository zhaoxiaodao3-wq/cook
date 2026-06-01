from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.dish import Dish
from app.models.user import User
from app.models.rating import Rating
from app.models.suggestion import Suggestion


async def get_or_create_user(db: AsyncSession, openid: str, nickname: str = "") -> User:
    result = await db.execute(select(User).where(User.openid == openid))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(openid=openid, nickname=nickname or f"用户_{openid[:8]}")
        db.add(user)
        await db.commit()
        await db.refresh(user)
    return user


async def get_user_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def update_user(db: AsyncSession, user: User, nickname: str | None, avatar_url: str | None) -> User:
    if nickname is not None:
        user.nickname = nickname
    if avatar_url is not None:
        user.avatar_url = avatar_url
    await db.commit()
    await db.refresh(user)
    return user


async def get_user_stats(db: AsyncSession, user_id: str) -> dict:
    dish_count = await db.scalar(select(func.count(Dish.id)).where(Dish.author_id == user_id))
    rated_count = await db.scalar(select(func.count(Rating.id)).where(Rating.user_id == user_id))
    suggestion_count = await db.scalar(select(func.count(Suggestion.id)).where(Suggestion.user_id == user_id))
    return {
        "dish_count": dish_count or 0,
        "rated_count": rated_count or 0,
        "suggestion_count": suggestion_count or 0,
    }
