# Cookbook Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a FastAPI server for a recipe-sharing mini-program with JWT auth, dish CRUD, ratings, and suggestions.

**Architecture:** 4-layer (api → services → models, schemas as validation layer). Async SQLAlchemy 2.0 + PostgreSQL. Alembic for migrations. JWT from WeChat openid.

**Tech Stack:** Python 3.12+, FastAPI, SQLAlchemy 2.0 (async), Alembic, asyncpg, Pydantic v2, python-jose (JWT), pytest + httpx

---

## File Structure

```
cookbook-server/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, lifespan, router registration
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # pydantic-settings
│   │   ├── security.py      # JWT create/decode
│   │   ├── deps.py          # get_db, get_current_user
│   │   └── database.py      # engine, async_session factory
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py          # declarative base, UUID mixin, timestamp mixin
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── dish.py
│   │   ├── ingredient.py
│   │   ├── step.py
│   │   ├── rating.py
│   │   └── suggestion.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── common.py        # ApiResponse[T], PaginatedResponse[T]
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── dish.py
│   │   ├── rating.py
│   │   └── suggestion.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py  # router aggregation
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── dishes.py
│   │       ├── categories.py
│   │       ├── ratings.py
│   │       └── suggestions.py
│   └── services/
│       ├── __init__.py
│       ├── user.py
│       ├── dish.py
│       ├── category.py
│       ├── rating.py
│       └── suggestion.py
├── alembic/
│   ├── env.py
│   └── versions/
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_users.py
│   ├── test_dishes.py
│   ├── test_categories.py
│   ├── test_ratings.py
│   └── test_suggestions.py
├── requirements.txt
├── pyproject.toml
├── .env.example
└── README.md
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `cookbook-server/pyproject.toml`
- Create: `cookbook-server/requirements.txt`
- Create: `cookbook-server/.env.example`
- Create: `cookbook-server/app/__init__.py`
- Create: `cookbook-server/app/core/__init__.py`
- Create: `cookbook-server/app/models/__init__.py`
- Create: `cookbook-server/app/schemas/__init__.py`
- Create: `cookbook-server/app/api/__init__.py`
- Create: `cookbook-server/app/api/v1/__init__.py`
- Create: `cookbook-server/app/services/__init__.py`
- Create: `cookbook-server/tests/__init__.py`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p cookbook-server/app/core cookbook-server/app/models cookbook-server/app/schemas cookbook-server/app/api/v1 cookbook-server/app/services cookbook-server/tests cookbook-server/alembic/versions
```

- [ ] **Step 2: Write pyproject.toml**

```toml
[project]
name = "cookbook-server"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi[standard]>=0.115.0",
    "sqlalchemy[asyncio]>=2.0.36",
    "asyncpg>=0.30.0",
    "alembic>=1.14.0",
    "pydantic-settings>=2.7.0",
    "python-jose[cryptography]>=3.3.0",
    "pydantic>=2.10.0",
    "uvicorn[standard]>=0.34.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.25.0",
    "httpx>=0.28.0",
    "aiosqlite>=0.20.0",
]
```

- [ ] **Step 3: Write requirements.txt**

```
fastapi[standard]>=0.115.0
sqlalchemy[asyncio]>=2.0.36
asyncpg>=0.30.0
alembic>=1.14.0
pydantic-settings>=2.7.0
python-jose[cryptography]>=3.3.0
pydantic>=2.10.0
uvicorn[standard]>=0.34.0
```

- [ ] **Step 4: Write .env.example**

```
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/cookbook
SECRET_KEY=change-me-to-a-random-string
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=43200
WECHAT_APP_ID=your-app-id
WECHAT_APP_SECRET=your-app-secret
```

- [ ] **Step 5: Install dependencies**

```bash
cd cookbook-server && pip install -r requirements.txt
```

- [ ] **Step 6: Commit**

```bash
git add cookbook-server/
git commit -m "chore: scaffold project structure and dependencies"
```

---

### Task 2: Core — Config and Database

**Files:**
- Create: `cookbook-server/app/core/config.py`
- Create: `cookbook-server/app/core/database.py`

- [ ] **Step 1: Write config.py**

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/cookbook"
    SECRET_KEY: str = "change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 43200
    WECHAT_APP_ID: str = ""
    WECHAT_APP_SECRET: str = ""


settings = Settings()
```

- [ ] **Step 2: Write database.py**

```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app.core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/core/config.py cookbook-server/app/core/database.py
git commit -m "feat: add config and database session factory"
```

---

### Task 3: Core — Security and Dependencies

**Files:**
- Create: `cookbook-server/app/core/security.py`
- Create: `cookbook-server/app/core/deps.py`

- [ ] **Step 1: Write security.py**

```python
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.core.config import settings


def create_access_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    to_encode = {"sub": user_id, "exp": expire}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None
```

- [ ] **Step 2: Write deps.py**

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User

bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    user_id = decode_access_token(credentials.credentials)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="无效的登录凭证")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在")
    return user
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/core/security.py cookbook-server/app/core/deps.py
git commit -m "feat: add JWT security and auth dependency"
```

---

### Task 4: Models — Base

**Files:**
- Create: `cookbook-server/app/models/base.py`

- [ ] **Step 1: Write base.py**

```python
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class UUIDMixin:
    id: Mapped[str] = mapped_column(
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/models/base.py
git commit -m "feat: add model base with UUID and timestamp mixins"
```

---

### Task 5: Models — User and Category

**Files:**
- Create: `cookbook-server/app/models/user.py`
- Create: `cookbook-server/app/models/category.py`

- [ ] **Step 1: Write user.py**

```python
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
```

- [ ] **Step 2: Write category.py**

```python
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin


class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    icon: Mapped[str | None] = mapped_column(String(64), nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    dishes = relationship("Dish", back_populates="category")
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/models/user.py cookbook-server/app/models/category.py
git commit -m "feat: add user and category models"
```

---

### Task 6: Models — Dish

**Files:**
- Create: `cookbook-server/app/models/dish.py`

- [ ] **Step 1: Write dish.py**

```python
from sqlalchemy import ForeignKey, Integer, Numeric, SmallInteger, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


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
    author_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="published")
    avg_rating: Mapped[float] = mapped_column(Numeric(2, 1), nullable=False, default=0.0)

    author = relationship("User", back_populates="dishes")
    category = relationship("Category", back_populates="dishes")
    ingredients = relationship("Ingredient", back_populates="dish", cascade="all, delete-orphan")
    steps = relationship("Step", back_populates="dish", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="dish", cascade="all, delete-orphan")
    suggestions = relationship("Suggestion", back_populates="dish", cascade="all, delete-orphan")
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/models/dish.py
git commit -m "feat: add dish model"
```

---

### Task 7: Models — Ingredient, Step, Rating, Suggestion

**Files:**
- Create: `cookbook-server/app/models/ingredient.py`
- Create: `cookbook-server/app/models/step.py`
- Create: `cookbook-server/app/models/rating.py`
- Create: `cookbook-server/app/models/suggestion.py`

- [ ] **Step 1: Write ingredient.py**

```python
from sqlalchemy import ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin


class Ingredient(Base, UUIDMixin):
    __tablename__ = "ingredients"

    dish_id: Mapped[str] = mapped_column(ForeignKey("dishes.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(64), nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(8, 2), nullable=False)
    unit: Mapped[str] = mapped_column(String(16), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    dish = relationship("Dish", back_populates="ingredients")
```

- [ ] **Step 2: Write step.py**

```python
from sqlalchemy import ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


class Step(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "steps"
    __table_args__ = (UniqueConstraint("dish_id", "step_number"),)

    dish_id: Mapped[str] = mapped_column(ForeignKey("dishes.id", ondelete="CASCADE"), nullable=False)
    step_number: Mapped[int] = mapped_column(Integer, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image: Mapped[str | None] = mapped_column(String(512), nullable=True)
    duration: Mapped[int | None] = mapped_column(Integer, nullable=True)

    dish = relationship("Dish", back_populates="steps")
```

- [ ] **Step 3: Write rating.py**

```python
from sqlalchemy import ForeignKey, Integer, SmallInteger, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


class Rating(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "ratings"
    __table_args__ = (UniqueConstraint("dish_id", "user_id"),)

    dish_id: Mapped[str] = mapped_column(ForeignKey("dishes.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False)
    stars: Mapped[int] = mapped_column(SmallInteger, nullable=False)

    dish = relationship("Dish", back_populates="ratings")
    user = relationship("User", back_populates="ratings")
```

- [ ] **Step 4: Write suggestion.py**

```python
from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


class Suggestion(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "suggestions"

    dish_id: Mapped[str] = mapped_column(ForeignKey("dishes.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    dish = relationship("Dish", back_populates="suggestions")
    user = relationship("User", back_populates="suggestions")
```

- [ ] **Step 5: Commit**

```bash
git add cookbook-server/app/models/ingredient.py cookbook-server/app/models/step.py cookbook-server/app/models/rating.py cookbook-server/app/models/suggestion.py
git commit -m "feat: add ingredient, step, rating, suggestion models"
```

---

### Task 8: Alembic Migration Setup

**Files:**
- Create: `cookbook-server/alembic.ini`
- Create: `cookbook-server/alembic/env.py`
- Create: `cookbook-server/alembic/script.py.mako`

- [ ] **Step 1: Run alembic init**

```bash
cd cookbook-server && alembic init alembic
```

- [ ] **Step 2: Configure alembic.ini — set sqlalchemy.url**

Replace the sqlalchemy.url line:
```
sqlalchemy.url = postgresql+asyncpg://postgres:postgres@localhost:5432/cookbook
```

- [ ] **Step 3: Configure alembic/env.py**

Replace env.py content:

```python
import asyncio
from logging.config import fileConfig

from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

from app.core.config import settings
from app.models.base import Base
from app.models import user, category, dish, ingredient, step, rating, suggestion

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(url=settings.DATABASE_URL, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    connectable = create_async_engine(settings.DATABASE_URL)
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
```

- [ ] **Step 4: Generate and apply migration**

```bash
cd cookbook-server && alembic revision --autogenerate -m "init_all_tables"
alembic upgrade head
```

- [ ] **Step 5: Commit**

```bash
git add cookbook-server/alembic.ini cookbook-server/alembic/ cookbook-server/app/models/__init__.py
git commit -m "feat: add alembic migration for all tables"
```

---

### Task 9: Schemas — Common

**Files:**
- Create: `cookbook-server/app/schemas/common.py`

- [ ] **Step 1: Write common.py**

```python
from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    code: int = 200
    message: str = "ok"
    data: T | None = None


class PaginatedData(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int


class PaginatedResponse(ApiResponse[PaginatedData[T]]):
    pass
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/schemas/common.py
git commit -m "feat: add common response schemas"
```

---

### Task 10: Schemas — User and Category

**Files:**
- Create: `cookbook-server/app/schemas/user.py`
- Create: `cookbook-server/app/schemas/category.py`

- [ ] **Step 1: Write user.py**

```python
from datetime import datetime
from pydantic import BaseModel


class WechatLoginIn(BaseModel):
    code: str


class UserUpdateIn(BaseModel):
    nickname: str | None = None
    avatar_url: str | None = None


class UserOut(BaseModel):
    id: str
    nickname: str
    avatar_url: str | None
    role: str
    created_at: datetime

    model_config = {"from_attributes": True}


class LoginOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
```

- [ ] **Step 2: Write category.py**

```python
from datetime import datetime
from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: int
    name: str
    icon: str | None
    sort_order: int
    created_at: datetime

    model_config = {"from_attributes": True}
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/schemas/user.py cookbook-server/app/schemas/category.py
git commit -m "feat: add user and category schemas"
```

---

### Task 11: Schemas — Dish

**Files:**
- Create: `cookbook-server/app/schemas/dish.py`

- [ ] **Step 1: Write dish.py**

```python
from datetime import datetime
from pydantic import BaseModel, Field

from app.schemas.user import UserOut
from app.schemas.category import CategoryOut


class IngredientIn(BaseModel):
    name: str
    amount: float
    unit: str
    sort_order: int = 0


class IngredientOut(BaseModel):
    id: str
    name: str
    amount: float
    unit: str
    sort_order: int

    model_config = {"from_attributes": True}


class StepIn(BaseModel):
    step_number: int
    description: str
    image: str | None = None
    duration: int | None = None


class StepOut(BaseModel):
    id: str
    step_number: int
    description: str
    image: str | None = None
    duration: int | None = None

    model_config = {"from_attributes": True}


class DishCreateIn(BaseModel):
    name: str = Field(..., max_length=128)
    cover: str | None = None
    description: str | None = None
    category_id: int
    cooking_time: int | None = None
    difficulty: int | None = Field(None, ge=1, le=3)
    servings: int | None = None
    tips: str | None = None
    status: str = "published"
    ingredients: list[IngredientIn] = []
    steps: list[StepIn] = []


class DishUpdateIn(BaseModel):
    name: str | None = Field(None, max_length=128)
    cover: str | None = None
    description: str | None = None
    category_id: int | None = None
    cooking_time: int | None = None
    difficulty: int | None = Field(None, ge=1, le=3)
    servings: int | None = None
    tips: str | None = None
    status: str | None = None
    ingredients: list[IngredientIn] | None = None
    steps: list[StepIn] | None = None


class DishListOut(BaseModel):
    id: str
    name: str
    cover: str | None
    category_id: int
    cooking_time: int | None
    difficulty: int | None
    avg_rating: float
    author: UserOut
    created_at: datetime

    model_config = {"from_attributes": True}


class DishDetailOut(BaseModel):
    id: str
    name: str
    cover: str | None
    description: str | None
    category: CategoryOut
    cooking_time: int | None
    difficulty: int | None
    servings: int | None
    tips: str | None
    status: str
    avg_rating: float
    author: UserOut
    ingredients: list[IngredientOut] = []
    steps: list[StepOut] = []
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/schemas/dish.py
git commit -m "feat: add dish schemas with nested ingredients and steps"
```

---

### Task 12: Schemas — Rating and Suggestion

**Files:**
- Create: `cookbook-server/app/schemas/rating.py`
- Create: `cookbook-server/app/schemas/suggestion.py`

- [ ] **Step 1: Write rating.py**

```python
from datetime import datetime
from pydantic import BaseModel, Field

from app.schemas.user import UserOut


class RatingCreateIn(BaseModel):
    stars: int = Field(..., ge=1, le=5)


class RatingUpdateIn(BaseModel):
    stars: int = Field(..., ge=1, le=5)


class RatingOut(BaseModel):
    id: str
    dish_id: str
    user: UserOut
    stars: int
    created_at: datetime

    model_config = {"from_attributes": True}
```

- [ ] **Step 2: Write suggestion.py**

```python
from datetime import datetime
from pydantic import BaseModel

from app.schemas.user import UserOut


class SuggestionCreateIn(BaseModel):
    content: str


class SuggestionOut(BaseModel):
    id: str
    dish_id: str
    user: UserOut
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/schemas/rating.py cookbook-server/app/schemas/suggestion.py
git commit -m "feat: add rating and suggestion schemas"
```

---

### Task 13: Services — User and Category

**Files:**
- Create: `cookbook-server/app/services/user.py`
- Create: `cookbook-server/app/services/category.py`

- [ ] **Step 1: Write user.py**

```python
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


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
```

- [ ] **Step 2: Write category.py**

```python
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


async def get_all_categories(db: AsyncSession) -> list[Category]:
    result = await db.execute(select(Category).order_by(Category.sort_order))
    return list(result.scalars().all())
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/services/user.py cookbook-server/app/services/category.py
git commit -m "feat: add user and category services"
```

---

### Task 14: Services — Dish

**Files:**
- Create: `cookbook-server/app/services/dish.py`

- [ ] **Step 1: Write dish.py**

```python
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.dish import Dish
from app.models.ingredient import Ingredient
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
) -> tuple[list[Dish], int]:
    query = select(Dish).where(Dish.status == "published").options(selectinload(Dish.author))
    count_query = select(func.count(Dish.id)).where(Dish.status == "published")

    if category_id is not None:
        query = query.where(Dish.category_id == category_id)
        count_query = count_query.where(Dish.category_id == category_id)
    if difficulty is not None:
        query = query.where(Dish.difficulty == difficulty)
        count_query = count_query.where(Dish.difficulty == difficulty)
    if keyword:
        query = query.where(Dish.name.ilike(f"%{keyword}%"))
        count_query = count_query.where(Dish.name.ilike(f"%{keyword}%"))

    total_result = await db.execute(count_query)
    total = total_result.scalar_one()

    query = query.order_by(Dish.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
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
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/services/dish.py
git commit -m "feat: add dish service with CRUD and filtering"
```

---

### Task 15: Services — Rating and Suggestion

**Files:**
- Create: `cookbook-server/app/services/rating.py`
- Create: `cookbook-server/app/services/suggestion.py`

- [ ] **Step 1: Write rating.py**

```python
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.rating import Rating
from app.models.dish import Dish


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
```

- [ ] **Step 2: Write suggestion.py**

```python
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.suggestion import Suggestion


async def create_suggestion(db: AsyncSession, dish_id: str, user_id: str, content: str) -> Suggestion:
    suggestion = Suggestion(dish_id=dish_id, user_id=user_id, content=content)
    db.add(suggestion)
    await db.commit()
    await db.refresh(suggestion)
    return suggestion
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/services/rating.py cookbook-server/app/services/suggestion.py
git commit -m "feat: add rating and suggestion services"
```

---

### Task 16: API — Main App Entry

**Files:**
- Create: `cookbook-server/app/main.py`

- [ ] **Step 1: Write main.py**

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.api.v1 import router as v1_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(title="Cookbook API", version="0.1.0", lifespan=lifespan)
app.include_router(v1_router, prefix="/api/v1")
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/main.py
git commit -m "feat: add FastAPI app entry point"
```

---

### Task 17: API — Auth Routes

**Files:**
- Create: `cookbook-server/app/api/v1/auth.py`

- [ ] **Step 1: Write auth.py**

```python
import httpx
from fastapi import APIRouter, Depends, HTTPException

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse
from app.schemas.user import WechatLoginIn, LoginOut, UserOut
from app.services.user import get_or_create_user, update_user

router = APIRouter(prefix="/auth", tags=["认证"])


@router.post("/wechat-login", response_model=ApiResponse[LoginOut])
async def wechat_login(body: WechatLoginIn, db=Depends(get_db)):
    if settings.WECHAT_APP_ID and settings.WECHAT_APP_SECRET:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.weixin.qq.com/sns/jscode2session",
                params={
                    "appid": settings.WECHAT_APP_ID,
                    "secret": settings.WECHAT_APP_SECRET,
                    "js_code": body.code,
                    "grant_type": "authorization_code",
                },
            )
            wx_data = resp.json()
            openid = wx_data.get("openid")
            if not openid:
                raise HTTPException(status_code=400, detail=f"微信登录失败: {wx_data.get('errmsg', '未知错误')}")
    else:
        openid = f"dev_{body.code}"

    user = await get_or_create_user(db, openid)
    token = create_access_token(user.id)
    return ApiResponse(data=LoginOut(access_token=token, user=UserOut.model_validate(user)))
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/api/v1/auth.py
git commit -m "feat: add WeChat login endpoint"
```

---

### Task 18: API — User Routes

**Files:**
- Create: `cookbook-server/app/api/v1/users.py`

- [ ] **Step 1: Write users.py**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse
from app.schemas.user import UserOut, UserUpdateIn
from app.services.user import get_user_by_id, update_user as svc_update_user

router = APIRouter(prefix="/users", tags=["用户"])


@router.get("/me", response_model=ApiResponse[UserOut])
async def get_me(current_user: User = Depends(get_current_user)):
    return ApiResponse(data=UserOut.model_validate(current_user))


@router.put("/me", response_model=ApiResponse[UserOut])
async def update_me(
    body: UserUpdateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user = await svc_update_user(db, current_user, body.nickname, body.avatar_url)
    return ApiResponse(data=UserOut.model_validate(user))


@router.get("/{user_id}", response_model=ApiResponse[UserOut])
async def get_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
):
    user = await get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    return ApiResponse(data=UserOut.model_validate(user))
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/api/v1/users.py
git commit -m "feat: add user endpoints (get/update self, get by id)"
```

---

### Task 19: API — Category and Dish Routes

**Files:**
- Create: `cookbook-server/app/api/v1/categories.py`
- Create: `cookbook-server/app/api/v1/dishes.py`

- [ ] **Step 1: Write categories.py**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.category import CategoryOut
from app.services.category import get_all_categories

router = APIRouter(prefix="/categories", tags=["分类"])


@router.get("", response_model=ApiResponse[list[CategoryOut]])
async def list_categories(db: AsyncSession = Depends(get_db)):
    categories = await get_all_categories(db)
    return ApiResponse(data=[CategoryOut.model_validate(c) for c in categories])
```

- [ ] **Step 2: Write dishes.py**

```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.dish import Dish
from app.schemas.common import ApiResponse, PaginatedData
from app.schemas.dish import DishCreateIn, DishUpdateIn, DishListOut, DishDetailOut
from app.services.dish import get_dishes, get_dish_detail, create_dish, update_dish, delete_dish

router = APIRouter(prefix="/dishes", tags=["菜品"])


@router.get("", response_model=ApiResponse[PaginatedData[DishListOut]])
async def list_dishes(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category_id: int | None = None,
    difficulty: int | None = Query(None, ge=1, le=3),
    keyword: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    dishes, total = await get_dishes(
        db, page=page, page_size=page_size, category_id=category_id, difficulty=difficulty, keyword=keyword
    )
    return ApiResponse(
        data=PaginatedData(
            items=[DishListOut.model_validate(d) for d in dishes],
            total=total,
            page=page,
            page_size=page_size,
        )
    )


@router.get("/{dish_id}", response_model=ApiResponse[DishDetailOut])
async def get_dish(dish_id: str, db: AsyncSession = Depends(get_db)):
    dish = await get_dish_detail(db, dish_id)
    if dish is None:
        raise HTTPException(status_code=404, detail="菜品不存在")
    return ApiResponse(data=DishDetailOut.model_validate(dish))


@router.post("", response_model=ApiResponse[DishDetailOut], status_code=201)
async def create_new_dish(
    body: DishCreateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    dish = await create_dish(db, current_user.id, body)
    return ApiResponse(data=DishDetailOut.model_validate(dish))


@router.put("/{dish_id}", response_model=ApiResponse[DishDetailOut])
async def edit_dish(
    dish_id: str,
    body: DishUpdateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    dish = await get_dish_detail(db, dish_id)
    if dish is None:
        raise HTTPException(status_code=404, detail="菜品不存在")
    if dish.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="只能编辑自己的菜品")
    dish = await update_dish(db, dish, body)
    return ApiResponse(data=DishDetailOut.model_validate(dish))


@router.delete("/{dish_id}", response_model=ApiResponse)
async def remove_dish(
    dish_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    dish = await get_dish_detail(db, dish_id)
    if dish is None:
        raise HTTPException(status_code=404, detail="菜品不存在")
    if dish.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="只能删除自己的菜品")
    await delete_dish(db, dish)
    return ApiResponse(message="删除成功")
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/api/v1/categories.py cookbook-server/app/api/v1/dishes.py
git commit -m "feat: add category list and dish CRUD endpoints"
```

---

### Task 20: API — Rating and Suggestion Routes

**Files:**
- Create: `cookbook-server/app/api/v1/ratings.py`
- Create: `cookbook-server/app/api/v1/suggestions.py`

- [ ] **Step 1: Write ratings.py**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse
from app.schemas.rating import RatingCreateIn, RatingUpdateIn
from app.services.rating import upsert_rating

router = APIRouter(prefix="/dishes/{dish_id}/ratings", tags=["评分"])


@router.post("", response_model=ApiResponse, status_code=201)
async def rate_dish(
    dish_id: str,
    body: RatingCreateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await upsert_rating(db, dish_id, current_user.id, body.stars)
    return ApiResponse(message="评分成功")


@router.put("", response_model=ApiResponse)
async def update_rating(
    dish_id: str,
    body: RatingUpdateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await upsert_rating(db, dish_id, current_user.id, body.stars)
    return ApiResponse(message="评分已更新")
```

- [ ] **Step 2: Write suggestions.py**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse
from app.schemas.suggestion import SuggestionCreateIn
from app.services.suggestion import create_suggestion

router = APIRouter(prefix="/dishes/{dish_id}/suggestions", tags=["建议"])


@router.post("", response_model=ApiResponse, status_code=201)
async def add_suggestion(
    dish_id: str,
    body: SuggestionCreateIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await create_suggestion(db, dish_id, current_user.id, body.content)
    return ApiResponse(message="建议已提交")
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/app/api/v1/ratings.py cookbook-server/app/api/v1/suggestions.py
git commit -m "feat: add rating and suggestion endpoints"
```

---

### Task 21: API — V1 Router Aggregation

**Files:**
- Modify: `cookbook-server/app/api/v1/__init__.py`

- [ ] **Step 1: Write v1 __init__.py**

```python
from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.dishes import router as dishes_router
from app.api.v1.categories import router as categories_router
from app.api.v1.ratings import router as ratings_router
from app.api.v1.suggestions import router as suggestions_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(users_router)
router.include_router(dishes_router)
router.include_router(categories_router)
router.include_router(ratings_router)
router.include_router(suggestions_router)
```

- [ ] **Step 2: Commit**

```bash
git add cookbook-server/app/api/v1/__init__.py
git commit -m "feat: aggregate v1 routers"
```

---

### Task 22: Test Setup

**Files:**
- Create: `cookbook-server/tests/conftest.py`

- [ ] **Step 1: Write conftest.py**

```python
import asyncio
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app.main import app
from app.models.base import Base
from app.core.deps import get_db
from app.core.security import create_access_token

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"

engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSession = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


@pytest.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def override_get_db():
    async with TestSession() as session:
        yield session


app.dependency_overrides[get_db] = override_get_db


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def db():
    async with TestSession() as session:
        yield session


@pytest_asyncio.fixture
async def auth_headers(db: AsyncSession):
    from app.models.user import User
    user = User(openid="test_openid", nickname="测试用户", role="user")
    db.add(user)
    await db.commit()
    await db.refresh(user)
    token = create_access_token(user.id)
    return {"Authorization": f"Bearer {token}", "user": user}
```

- [ ] **Step 2: Add aiosqlite to dev requirements**

```bash
# Already included in dev dependencies in pyproject.toml
```

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/tests/conftest.py
git commit -m "feat: add test fixtures with SQLite test database"
```

---

### Task 23: Tests — Auth and Categories

**Files:**
- Create: `cookbook-server/tests/test_auth.py`
- Create: `cookbook-server/tests/test_categories.py`

- [ ] **Step 1: Write test_auth.py**

```python
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_wechat_login_dev_mode(client: AsyncClient):
    resp = await client.post("/api/v1/auth/wechat-login", json={"code": "test123"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["code"] == 200
    assert "access_token" in data["data"]
    assert data["data"]["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_unauthorized_access(client: AsyncClient):
    resp = await client.post("/api/v1/dishes", json={"name": "test"})
    assert resp.status_code == 401
```

- [ ] **Step 2: Write test_categories.py**

```python
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


@pytest.mark.asyncio
async def test_list_categories(client: AsyncClient, db: AsyncSession):
    db.add(Category(name="川菜", sort_order=1))
    db.add(Category(name="粤菜", sort_order=2))
    await db.commit()

    resp = await client.get("/api/v1/categories")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["data"]) == 2
    assert data["data"][0]["name"] == "川菜"
```

- [ ] **Step 3: Run tests**

```bash
cd cookbook-server && python -m pytest tests/test_auth.py tests/test_categories.py -v
```

Expected: 3 tests PASS

- [ ] **Step 4: Commit**

```bash
git add cookbook-server/tests/test_auth.py cookbook-server/tests/test_categories.py
git commit -m "test: add auth and category endpoint tests"
```

---

### Task 24: Tests — Dish CRUD

**Files:**
- Create: `cookbook-server/tests/test_dishes.py`

- [ ] **Step 1: Write test_dishes.py**

```python
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


@pytest.mark.asyncio
async def test_create_and_get_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    payload = {
        "name": "红烧肉",
        "description": "经典家常菜",
        "category_id": 1,
        "cooking_time": 90,
        "difficulty": 2,
        "servings": 4,
        "tips": "小火慢炖",
        "ingredients": [
            {"name": "五花肉", "amount": 500, "unit": "克", "sort_order": 0},
            {"name": "酱油", "amount": 2, "unit": "勺", "sort_order": 1},
        ],
        "steps": [
            {"step_number": 1, "description": "五花肉切块焯水"},
            {"step_number": 2, "description": "加酱油小火慢炖60分钟"},
        ],
    }
    resp = await client.post(
        "/api/v1/dishes", json=payload, headers={"Authorization": auth_headers["Authorization"]}
    )
    assert resp.status_code == 201
    data = resp.json()["data"]
    assert data["name"] == "红烧肉"
    assert len(data["ingredients"]) == 2
    assert len(data["steps"]) == 2

    dish_id = data["id"]
    resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "红烧肉"


@pytest.mark.asyncio
async def test_update_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "旧菜名", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.put(
        f"/api/v1/dishes/{dish_id}",
        json={"name": "新菜名"},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "新菜名"


@pytest.mark.asyncio
async def test_delete_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "待删除", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.delete(
        f"/api/v1/dishes/{dish_id}",
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 200

    resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_cannot_edit_others_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    from app.models.user import User
    from app.core.security import create_access_token

    db.add(Category(name="川菜"))
    other_user = User(openid="other", nickname="别人")
    db.add(other_user)
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "我的菜", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    other_token = create_access_token(other_user.id)
    resp = await client.put(
        f"/api/v1/dishes/{dish_id}",
        json={"name": "篡改"},
        headers={"Authorization": f"Bearer {other_token}"},
    )
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_list_dishes_filtering(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    db.add(Category(name="粤菜"))
    await db.commit()

    for i in range(3):
        await client.post(
            "/api/v1/dishes",
            json={"name": f"辣菜{i}", "category_id": 1, "difficulty": 2},
            headers={"Authorization": auth_headers["Authorization"]},
        )
    await client.post(
        "/api/v1/dishes",
        json={"name": "清淡菜", "category_id": 2, "difficulty": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )

    resp = await client.get("/api/v1/dishes?category_id=1")
    assert resp.status_code == 200
    assert resp.json()["data"]["total"] == 3

    resp = await client.get("/api/v1/dishes?difficulty=1")
    assert resp.json()["data"]["total"] == 1

    resp = await client.get("/api/v1/dishes?keyword=辣菜")
    assert resp.json()["data"]["total"] == 3
```

- [ ] **Step 2: Run tests**

```bash
cd cookbook-server && python -m pytest tests/test_dishes.py -v
```

Expected: 5 tests PASS

- [ ] **Step 3: Commit**

```bash
git add cookbook-server/tests/test_dishes.py
git commit -m "test: add dish CRUD and filtering tests"
```

---

### Task 25: Tests — Ratings and Suggestions

**Files:**
- Create: `cookbook-server/tests/test_ratings.py`
- Create: `cookbook-server/tests/test_suggestions.py`

- [ ] **Step 1: Write test_ratings.py**

```python
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


@pytest.mark.asyncio
async def test_rate_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "测试菜品", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.post(
        f"/api/v1/dishes/{dish_id}/ratings",
        json={"stars": 5},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 201

    detail_resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert detail_resp.json()["data"]["avg_rating"] == 5.0


@pytest.mark.asyncio
async def test_update_rating(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "测试菜品2", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    await client.post(
        f"/api/v1/dishes/{dish_id}/ratings",
        json={"stars": 3},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    resp = await client.put(
        f"/api/v1/dishes/{dish_id}/ratings",
        json={"stars": 5},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 200

    detail_resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert detail_resp.json()["data"]["avg_rating"] == 5.0
```

- [ ] **Step 2: Write test_suggestions.py**

```python
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


@pytest.mark.asyncio
async def test_add_suggestion(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "测试菜品", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.post(
        f"/api/v1/dishes/{dish_id}/suggestions",
        json={"content": "建议少放盐"},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 201
    assert resp.json()["message"] == "建议已提交"
```

- [ ] **Step 3: Run tests**

```bash
cd cookbook-server && python -m pytest tests/test_ratings.py tests/test_suggestions.py -v
```

Expected: 3 tests PASS

- [ ] **Step 4: Commit**

```bash
git add cookbook-server/tests/test_ratings.py cookbook-server/tests/test_suggestions.py
git commit -m "test: add rating and suggestion tests"
```

---

### Task 26: Full Test Suite Verification

- [ ] **Step 1: Run full test suite**

```bash
cd cookbook-server && python -m pytest tests/ -v
```

Expected: all tests PASS (11 tests)

- [ ] **Step 2: Verify app starts**

```bash
cd cookbook-server && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
sleep 2
curl http://localhost:8000/api/v1/categories
kill %1
```

Expected: 200 response with empty array

- [ ] **Step 3: Commit any final changes**

```bash
git add -A
git commit -m "chore: final cleanup and verification"
```
