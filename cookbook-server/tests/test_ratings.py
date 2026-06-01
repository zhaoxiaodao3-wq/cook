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
