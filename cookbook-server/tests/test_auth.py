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
