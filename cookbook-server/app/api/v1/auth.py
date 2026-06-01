import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.schemas.common import ApiResponse
from app.schemas.user import WechatLoginIn, LoginOut, UserOut
from app.services.user import get_or_create_user

router = APIRouter(prefix="/auth", tags=["认证"])


@router.post("/wechat-login", response_model=ApiResponse[LoginOut], summary="微信登录")
async def wechat_login(body: WechatLoginIn, db: AsyncSession = Depends(get_db)):
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
