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
