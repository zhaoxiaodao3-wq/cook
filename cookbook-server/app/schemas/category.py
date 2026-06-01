from datetime import datetime
from pydantic import BaseModel, Field


class CategoryOut(BaseModel):
    id: int = Field(..., description="分类ID")
    name: str = Field(..., description="分类名称")
    icon: str | None = Field(None, description="图标标识")
    sort_order: int = Field(..., description="排序")
    created_at: datetime = Field(..., description="创建时间")

    model_config = {"from_attributes": True}
