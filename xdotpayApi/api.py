from ninja import Router
from authentication.api import router as auth_router
from api_v1.api import router as api_v1_router


router = Router()


router.add_router("/auth/", auth_router)
router.add_router("/v1/", api_v1_router)
