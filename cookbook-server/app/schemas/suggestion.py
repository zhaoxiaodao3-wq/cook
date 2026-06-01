from datetime import datetime
from pydantic import BaseModel, Field

from app.schemas.user import UserOut


class SuggestionCreateIn(BaseModel):
    content: str = Field(..., description="建议内容")


class SuggestionUpdateIn(BaseModel):
    content: str = Field(..., description="建议内容")


class SuggestionOut(BaseModel):
    id: str
    dish_id: str
    user: UserOut
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class UserSuggestionOut(BaseModel):
    id: str
    dish_id: str
    dish_name: str
    dish_cover: str | None
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}
