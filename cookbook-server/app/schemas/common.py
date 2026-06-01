from typing import Generic, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    code: int = Field(200, description="状态码")
    message: str = Field("ok", description="提示信息")
    data: T | None = Field(None, description="响应数据")


class PaginatedData(BaseModel, Generic[T]):
    items: list[T] = Field(..., description="数据列表")
    total: int = Field(..., description="总条数")
    page: int = Field(..., description="当前页码")
    page_size: int = Field(..., description="每页数量")
