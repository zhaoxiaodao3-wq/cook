from sqlalchemy import ForeignKey, Integer, Numeric, SmallInteger, String, Text, select, func
from sqlalchemy.orm import Mapped, mapped_column, relationship, column_property

from app.models.base import Base, UUIDMixin, TimestampMixin
from app.models.rating import Rating


class Dish(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "dishes"

    name: Mapped[str] = mapped_column(String(128), nullable=False)
    cover: Mapped[str | None] = mapped_column(String(512), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    cooking_time: Mapped[int | None] = mapped_column(Integer, nullable=True)
    difficulty: Mapped[int | None] = mapped_column(SmallInteger, nullable=True)
    servings: Mapped[int | None] = mapped_column(Integer, nullable=True)
    tips: Mapped[str | None] = mapped_column(Text, nullable=True)
    nutrition: Mapped[str | None] = mapped_column(Text, nullable=True)
    suitable_for: Mapped[str | None] = mapped_column(String(128), nullable=True)
    author_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="published")
    avg_rating: Mapped[float] = mapped_column(Numeric(2, 1), nullable=False, default=0.0)

    rating_count: Mapped[int] = column_property(
        select(func.count()).where(Rating.dish_id == id).correlate_except(Rating).scalar_subquery()
    )

    author = relationship("User", back_populates="dishes")
    category = relationship("Category", back_populates="dishes")
    ingredients = relationship("Ingredient", back_populates="dish", cascade="all, delete-orphan")
    steps = relationship("Step", back_populates="dish", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="dish", cascade="all, delete-orphan")
    suggestions = relationship("Suggestion", back_populates="dish", cascade="all, delete-orphan")
