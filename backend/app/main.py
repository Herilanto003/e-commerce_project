from fastapi import FastAPI
from app.api.v1 import auth_api
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="E-Commerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=auth_api.router, prefix="/auth")


@app.get("/")
def check_health():
    return {"message": "API is Ok :) !"}
