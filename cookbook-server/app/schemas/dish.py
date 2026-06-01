from datetime import datetime
from pydantic import BaseModel, Field

from app.schemas.user import UserOut
from app.schemas.category import CategoryOut


class IngredientIn(BaseModel):
    name: str = Field(..., description="食材名称")
    amount: float = Field(..., description="用量")
    unit: str = Field(..., description="单位（克、毫升、个等）")
    sort_order: int = Field(0, description="排序")


class IngredientOut(BaseModel):
    id: str
    name: str
    amount: float
    unit: str
    sort_order: int

    model_config = {"from_attributes": True}


class StepIn(BaseModel):
    step_number: int = Field(..., description="步骤序号")
    description: str = Field(..., description="步骤说明")
    image: str | None = Field(None, description="步骤配图")
    duration: int | None = Field(None, description="该步骤耗时（分钟）")


class StepOut(BaseModel):
    id: str
    step_number: int
    description: str
    image: str | None = None
    duration: int | None = None

    model_config = {"from_attributes": True}


class DishCreateIn(BaseModel):
    name: str = Field(..., max_length=128, description="菜品名称")
    cover: str | None = Field(None, description="封面图URL")
    description: str | None = Field(None, description="菜品简介")
    category_id: int = Field(..., description="所属分类ID")
    cooking_time: int | None = Field(None, description="烹饪时长（分钟）")
    difficulty: int | None = Field(None, ge=1, le=3, description="难度：1简单 2中等 3困难")
    servings: int | None = Field(None, description="份量")
    tips: str | None = Field(None, description="小贴士")
    nutrition: str | None = Field(None, description="营养信息")
    suitable_for: str | None = Field(None, description="适合人群")
    status: str = Field("published", description="状态：published 发布 / draft 草稿")
    ingredients: list[IngredientIn] = Field([], description="食材清单")
    steps: list[StepIn] = Field([], description="制作步骤")


class DishUpdateIn(BaseModel):
    name: str | None = Field(None, max_length=128, description="菜品名称")
    cover: str | None = Field(None, description="封面图URL")
    description: str | None = Field(None, description="菜品简介")
    category_id: int | None = Field(None, description="所属分类ID")
    cooking_time: int | None = Field(None, description="烹饪时长（分钟）")
    difficulty: int | None = Field(None, ge=1, le=3, description="难度：1简单 2中等 3困难")
    servings: int | None = Field(None, description="份量")
    tips: str | None = Field(None, description="小贴士")
    nutrition: str | None = Field(None, description="营养信息")
    suitable_for: str | None = Field(None, description="适合人群")
    status: str | None = Field(None, description="状态：published 发布 / draft 草稿")
    ingredients: list[IngredientIn] | None = Field(None, description="食材清单（不传则不更新）")
    steps: list[StepIn] | None = Field(None, description="制作步骤（不传则不更新）")


class DishListOut(BaseModel):
    id: str
    name: str
    cover: str | None
    category_id: int
    cooking_time: int | None
    difficulty: int | None
    avg_rating: float
    rating_count: int
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
    nutrition: str | None
    suitable_for: str | None
    status: str
    avg_rating: float
    rating_count: int
    author: UserOut
    ingredients: list[IngredientOut] = []
    steps: list[StepOut] = []
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
