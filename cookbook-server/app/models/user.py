from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    openid: Mapped[str] = mapped_column(String(128), unique=True, nullable=False, index=True)
    nickname: Mapped[str] = mapped_column(String(64), nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    role: Mapped[str] = mapped_column(String(16), nullable=False, default="user")

    dishes = relationship("Dish", back_populates="author")
    ratings = relationship("Rating", back_populates="user")
    suggestions = relationship("Suggestion", back_populates="user")
