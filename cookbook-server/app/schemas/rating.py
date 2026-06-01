from datetime import datetime
from pydantic import BaseModel, Field

from app.schemas.user import UserOut


class RatingCreateIn(BaseModel):
    stars: int = Field(..., ge=1, le=5, description="星级：1-5")


class RatingUpdateIn(BaseModel):
    stars: int = Field(..., ge=1, le=5, description="星级：1-5")


class RatingOut(BaseModel):
    id: str
    dish_id: str
    user: UserOut
    stars: int
    created_at: datetime

    model_config = {"from_attributes": True}


class UserRatingOut(BaseModel):
    id: str
    dish_id: str
    dish_name: str
    dish_cover: str | None
    stars: int
    created_at: datetime

    model_config = {"from_attributes": True}
