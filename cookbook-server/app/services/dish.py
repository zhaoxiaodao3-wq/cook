from datetime import datetime, timedelta, timezone

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.dish import Dish
from app.models.ingredient import Ingredient
from app.models.rating import Rating
from app.models.step import Step
from app.schemas.dish import DishCreateIn, DishUpdateIn


async def get_dishes(
    db: AsyncSession,
    *,
    page: int = 1,
    page_size: int = 20,
    category_id: int | None = None,
    difficulty: int | None = None,
    keyword: str | None = None,
    sort: str = "latest",
) -> tuple[list[Dish], int]:
    base = select(Dish).where(Dish.status == "published")
    count_base = select(func.count(Dish.id)).where(Dish.status == "published")

    if category_id is not None:
        base = base.where(Dish.category_id == category_id)
        count_base = count_base.where(Dish.category_id == category_id)
    if difficulty is not None:
        base = base.where(Dish.difficulty == difficulty)
        count_base = count_base.where(Dish.difficulty == difficulty)
    if keyword:
        subq = select(Ingredient.dish_id).where(Ingredient.name.ilike(f"%{keyword}%"))
        base = base.where(
            (Dish.name.ilike(f"%{keyword}%")) | (Dish.id.in_(subq))
        )
        count_base = count_base.where(
            (Dish.name.ilike(f"%{keyword}%")) | (Dish.id.in_(subq))
        )

    total_result = await db.execute(count_base)
    total = total_result.scalar_one()

    rated_count_subq = (
        select(func.count(Rating.id))
        .where(Rating.dish_id == Dish.id)
        .correlate(Dish)
        .scalar_subquery()
    )

    if sort == "rating":
        base = base.order_by(Dish.avg_rating.desc(), rated_count_subq.desc())
    elif sort == "popular_week":
        since = datetime.now(timezone.utc) - timedelta(days=7)
        week_count_subq = (
            select(func.count(Rating.id))
            .where(Rating.dish_id == Dish.id, Rating.created_at >= since)
            .correlate(Dish)
            .scalar_subquery()
        )
        base = base.order_by(week_count_subq.desc(), Dish.avg_rating.desc())
    elif sort == "popular_month":
        since = datetime.now(timezone.utc) - timedelta(days=30)
        month_count_subq = (
            select(func.count(Rating.id))
            .where(Rating.dish_id == Dish.id, Rating.created_at >= since)
            .correlate(Dish)
            .scalar_subquery()
        )
        base = base.order_by(month_count_subq.desc(), Dish.avg_rating.desc())
    else:
        base = base.order_by(Dish.created_at.desc())

    base = base.options(selectinload(Dish.author))
    base = base.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(base)
    dishes = list(result.scalars().all())

    return dishes, total


async def get_dish_detail(db: AsyncSession, dish_id: str) -> Dish | None:
    result = await db.execute(
        select(Dish)
        .where(Dish.id == dish_id)
        .options(
            selectinload(Dish.author),
            selectinload(Dish.category),
            selectinload(Dish.ingredients),
            selectinload(Dish.steps),
        )
    )
    return result.scalar_one_or_none()


async def create_dish(db: AsyncSession, author_id: str, data: DishCreateIn) -> Dish:
    dish = Dish(
        name=data.name,
        cover=data.cover,
        description=data.description,
        category_id=data.category_id,
        cooking_time=data.cooking_time,
        difficulty=data.difficulty,
        servings=data.servings,
        tips=data.tips,
        nutrition=data.nutrition,
        suitable_for=data.suitable_for,
        status=data.status,
        author_id=author_id,
    )
    db.add(dish)
    await db.flush()

    for ing in data.ingredients:
        db.add(Ingredient(dish_id=dish.id, name=ing.name, amount=ing.amount, unit=ing.unit, sort_order=ing.sort_order))
    for step in data.steps:
        db.add(Step(dish_id=dish.id, step_number=step.step_number, description=step.description, image=step.image, duration=step.duration))

    await db.commit()
    await db.refresh(dish)
    return await get_dish_detail(db, dish.id)


async def update_dish(db: AsyncSession, dish: Dish, data: DishUpdateIn) -> Dish:
    update_data = data.model_dump(exclude_unset=True)
    ingredients_data = update_data.pop("ingredients", None)
    steps_data = update_data.pop("steps", None)

    for key, value in update_data.items():
        setattr(dish, key, value)

    if ingredients_data is not None:
        existing = await db.execute(select(Ingredient).where(Ingredient.dish_id == dish.id))
        for ing in existing.scalars().all():
            await db.delete(ing)
        for ing in ingredients_data:
            db.add(Ingredient(dish_id=dish.id, **ing))

    if steps_data is not None:
        existing = await db.execute(select(Step).where(Step.dish_id == dish.id))
        for step in existing.scalars().all():
            await db.delete(step)
        for step in steps_data:
            db.add(Step(dish_id=dish.id, **step))

    await db.commit()
    await db.refresh(dish)
    return await get_dish_detail(db, dish.id)


async def delete_dish(db: AsyncSession, dish: Dish) -> None:
    await db.delete(dish)
    await db.commit()


async def get_user_dishes(
    db: AsyncSession, user_id: str, page: int = 1, page_size: int = 20,
) -> tuple[list[Dish], int]:
    base = select(Dish).where(Dish.author_id == user_id).options(selectinload(Dish.author))
    count_base = select(func.count(Dish.id)).where(Dish.author_id == user_id)
    total_result = await db.execute(count_base)
    total = total_result.scalar_one()
    base = base.order_by(Dish.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(base)
    return list(result.scalars().all()), total
