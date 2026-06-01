from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.dish import Dish
from app.models.rating import Rating


async def upsert_rating(db: AsyncSession, dish_id: str, user_id: str, stars: int) -> Rating:
    result = await db.execute(
        select(Rating).where(Rating.dish_id == dish_id, Rating.user_id == user_id)
    )
    rating = result.scalar_one_or_none()
    if rating:
        rating.stars = stars
    else:
        rating = Rating(dish_id=dish_id, user_id=user_id, stars=stars)
        db.add(rating)

    await db.flush()

    avg_result = await db.execute(
        select(func.avg(Rating.stars)).where(Rating.dish_id == dish_id)
    )
    avg = avg_result.scalar_one()
    dish_result = await db.execute(select(Dish).where(Dish.id == dish_id))
    dish = dish_result.scalar_one()
    dish.avg_rating = float(avg) if avg else 0.0

    await db.commit()
    await db.refresh(rating)
    return rating


async def get_ratings_for_dish(
    db: AsyncSession, dish_id: str, page: int = 1, page_size: int = 20,
) -> tuple[list[Rating], int]:
    base = select(Rating).where(Rating.dish_id == dish_id).options(selectinload(Rating.user))
    count_base = select(func.count(Rating.id)).where(Rating.dish_id == dish_id)
    total_result = await db.execute(count_base)
    total = total_result.scalar_one()
    base = base.order_by(Rating.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(base)
    return list(result.scalars().all()), total


async def get_user_ratings(
    db: AsyncSession, user_id: str, page: int = 1, page_size: int = 20,
) -> tuple[list[Rating], int]:
    base = (
        select(Rating)
        .where(Rating.user_id == user_id)
        .options(selectinload(Rating.dish))
        .order_by(Rating.created_at.desc())
    )
    count_base = select(func.count(Rating.id)).where(Rating.user_id == user_id)
    total_result = await db.execute(count_base)
    total = total_result.scalar_one()
    base = base.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(base)
    return list(result.scalars().all()), total


async def get_user_rating_count(db: AsyncSession, user_id: str) -> int:
    result = await db.execute(
        select(func.count(Rating.id)).where(Rating.user_id == user_id)
    )
    return result.scalar_one()


async def get_dish_rating_count(db: AsyncSession, dish_id: str) -> int:
    result = await db.execute(
        select(func.count(Rating.id)).where(Rating.dish_id == dish_id)
    )
    return result.scalar_one()
