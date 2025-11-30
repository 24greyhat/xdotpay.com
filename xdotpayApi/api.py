from ninja import Router
from authentication.api import router as auth_router


router = Router()


router.add_router("/auth/", auth_router)
