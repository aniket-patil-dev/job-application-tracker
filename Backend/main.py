from fastapi import FastAPI
from routers.user import router as user_router
from routers.auth_router import router as auth_router
from routers.application_router import router as application_router  # see point 2

app = FastAPI(title="Job Application Tracker")

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(application_router)