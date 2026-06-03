from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.alerts import router as alerts_router

app = FastAPI(
    title="StormSing API",
    description="Backend API for official weather alerts and future severe weather risk prediction.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React frontend
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(alerts_router)

@app.get("/")
def root():
    return{
        "message": "StormSignal API is running."
    }