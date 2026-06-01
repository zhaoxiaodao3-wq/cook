from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.suggestion import Suggestion


async def create_suggestion(db: AsyncSession, dish_id: str, user_id: str, content: str) -> Suggestion:
    suggestion = Suggestion(dish_id=dish_id, user_id=user_id, content=content)
    db.add(suggestion)
    await db.commit()
    await db.refresh(suggestion)
    return suggestion


async def upsert_suggestion(db: AsyncSession, dish_id: str, user_id: str, content: str) -> Suggestion:
    result = await db.execute(
        select(Suggestion).where(Suggestion.dish_id == dish_id, Suggestion.user_id == user_id)
    )
    suggestion = result.scalar_one_or_none()
    if suggestion:
        suggestion.content = content
    else:
        suggestion = Suggestion(dish_id=dish_id, user_id=user_id, content=content)
        db.add(suggestion)
    await db.commit()
    await db.refresh(suggestion)
    return suggestion


async def get_suggestions_for_dish(
    db: AsyncSession, dish_id: str, page: int = 1, page_size: int = 20,
) -> tuple[list[Suggestion], int]:
    base = (
        select(Suggestion)
        .where(Suggestion.dish_id == dish_id)
        .options(selectinload(Suggestion.user))
    )
    count_base = select(func.count(Suggestion.id)).where(Suggestion.dish_id == dish_id)
    total_result = await db.execute(count_base)
    total = total_result.scalar_one()
    base = base.order_by(Suggestion.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(base)
    return list(result.scalars().all()), total


async def get_user_suggestions(
    db: AsyncSession, user_id: str, page: int = 1, page_size: int = 20,
) -> tuple[list[Suggestion], int]:
    base = (
        select(Suggestion)
        .where(Suggestion.user_id == user_id)
        .options(selectinload(Suggestion.dish))
        .order_by(Suggestion.created_at.desc())
    )
    count_base = select(func.count(Suggestion.id)).where(Suggestion.user_id == user_id)
    total_result = await db.execute(count_base)
    total = total_result.scalar_one()
    base = base.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(base)
    return list(result.scalars().all()), total


async def get_user_suggestion_count(db: AsyncSession, user_id: str) -> int:
    result = await db.execute(
        select(func.count(Suggestion.id)).where(Suggestion.user_id == user_id)
    )
    return result.scalar_one()
