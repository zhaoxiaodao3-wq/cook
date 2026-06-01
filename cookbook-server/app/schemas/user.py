from datetime import datetime
from pydantic import BaseModel, Field


class WechatLoginIn(BaseModel):
    code: str = Field(..., description="微信小程序登录凭证（code）")


class UserUpdateIn(BaseModel):
    nickname: str | None = Field(None, description="昵称")
    avatar_url: str | None = Field(None, description="头像地址")


class UserOut(BaseModel):
    id: str
    nickname: str
    avatar_url: str | None
    role: str
    created_at: datetime

    model_config = {"from_attributes": True}


class UserStatsOut(BaseModel):
    dish_count: int = Field(0, description="上传的菜品数量")
    rated_count: int = Field(0, description="评分过的菜品数量")
    suggestion_count: int = Field(0, description="写过的建议数量")


class LoginOut(BaseModel):
    access_token: str = Field(..., description="JWT 访问令牌")
    token_type: str = Field("bearer", description="令牌类型")
    user: UserOut = Field(..., description="用户信息")
