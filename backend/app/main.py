from fastapi import FastAPI
from app.api.v1 import auth_api

app = FastAPI(title="E-Commerce API")

app.include_router(router=auth_api.router, prefix="/auth")


@app.get("/")
def check_health():
    return {"message": "API is Ok :) !"}
