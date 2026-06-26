from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.models import *

from app.api.auth import (
    router as auth_router
)
from app.api.admin import (
    router as admin_router
)

from app.api.blogs import (
    router as blogs_router
)

from app.api.comments import (
    router as comments_router
)

from app.api.domain import(
    router as domain_router
)

from app.api.level import (
    router as level_router
)

from app.api.learning_plan import (
    router as learning_plan_router
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost:5173", "http://localhost:5174"],           
    allow_credentials=True,           
    allow_methods=["*"],             
    allow_headers=["*"],            
)

@app.get("/")
def home():
    return {
        "message": "Gultie Code Backend Running"
    }


routers = [admin_router, auth_router, blogs_router, comments_router, domain_router, level_router, learning_plan_router]

for router in routers:
    app.include_router(router)
