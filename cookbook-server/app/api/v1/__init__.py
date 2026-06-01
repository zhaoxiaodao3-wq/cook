from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.dishes import router as dishes_router
from app.api.v1.categories import router as categories_router
from app.api.v1.ratings import router as ratings_router
from app.api.v1.suggestions import router as suggestions_router
from app.api.v1.upload import router as upload_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(users_router)
router.include_router(dishes_router)
router.include_router(categories_router)
router.include_router(ratings_router)
router.include_router(suggestions_router)
router.include_router(upload_router)
