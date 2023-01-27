from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import hotels, flights, accounts, activities, trips




app = FastAPI()
app.include_router(authenticator.router)
app.include_router(hotels.router)
app.include_router(flights.router)
app.include_router(accounts.router)
app.include_router(activities.router)
app.include_router(trips.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://travel-makers.gitlab.io",
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
