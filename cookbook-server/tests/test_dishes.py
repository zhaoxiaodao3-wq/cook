import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


@pytest.mark.asyncio
async def test_create_and_get_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    payload = {
        "name": "红烧肉",
        "description": "经典家常菜",
        "category_id": 1,
        "cooking_time": 90,
        "difficulty": 2,
        "servings": 4,
        "tips": "小火慢炖",
        "ingredients": [
            {"name": "五花肉", "amount": 500, "unit": "克", "sort_order": 0},
            {"name": "酱油", "amount": 2, "unit": "勺", "sort_order": 1},
        ],
        "steps": [
            {"step_number": 1, "description": "五花肉切块焯水"},
            {"step_number": 2, "description": "加酱油小火慢炖60分钟"},
        ],
    }
    resp = await client.post(
        "/api/v1/dishes", json=payload, headers={"Authorization": auth_headers["Authorization"]}
    )
    assert resp.status_code == 201
    data = resp.json()["data"]
    assert data["name"] == "红烧肉"
    assert len(data["ingredients"]) == 2
    assert len(data["steps"]) == 2

    dish_id = data["id"]
    resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "红烧肉"


@pytest.mark.asyncio
async def test_update_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "旧菜名", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.put(
        f"/api/v1/dishes/{dish_id}",
        json={"name": "新菜名"},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "新菜名"


@pytest.mark.asyncio
async def test_delete_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "待删除", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    resp = await client.delete(
        f"/api/v1/dishes/{dish_id}",
        headers={"Authorization": auth_headers["Authorization"]},
    )
    assert resp.status_code == 200

    resp = await client.get(f"/api/v1/dishes/{dish_id}")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_cannot_edit_others_dish(client: AsyncClient, db: AsyncSession, auth_headers):
    from app.models.user import User
    from app.core.security import create_access_token

    db.add(Category(name="川菜"))
    other_user = User(openid="other", nickname="别人")
    db.add(other_user)
    await db.commit()

    create_resp = await client.post(
        "/api/v1/dishes",
        json={"name": "我的菜", "category_id": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )
    dish_id = create_resp.json()["data"]["id"]

    other_token = create_access_token(other_user.id)
    resp = await client.put(
        f"/api/v1/dishes/{dish_id}",
        json={"name": "篡改"},
        headers={"Authorization": f"Bearer {other_token}"},
    )
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_list_dishes_filtering(client: AsyncClient, db: AsyncSession, auth_headers):
    db.add(Category(name="川菜"))
    db.add(Category(name="粤菜"))
    await db.commit()

    for i in range(3):
        await client.post(
            "/api/v1/dishes",
            json={"name": f"辣菜{i}", "category_id": 1, "difficulty": 2},
            headers={"Authorization": auth_headers["Authorization"]},
        )
    await client.post(
        "/api/v1/dishes",
        json={"name": "清淡菜", "category_id": 2, "difficulty": 1},
        headers={"Authorization": auth_headers["Authorization"]},
    )

    resp = await client.get("/api/v1/dishes?category_id=1")
    assert resp.status_code == 200
    assert resp.json()["data"]["total"] == 3

    resp = await client.get("/api/v1/dishes?difficulty=1")
    assert resp.json()["data"]["total"] == 1

    resp = await client.get("/api/v1/dishes?keyword=辣菜")
    assert resp.json()["data"]["total"] == 3
