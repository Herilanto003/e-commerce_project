from fastapi import FastAPI
from app.api.v1 import auth_api, product_api, category_api
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

ENDPOINT_V1 = "/api/v1"

app = FastAPI(title="E-Commerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(router=auth_api.router, prefix="/auth")
app.include_router(router=product_api.router, prefix=f"{ENDPOINT_V1}/product")
app.include_router(router=category_api.router, prefix=f"{ENDPOINT_V1}/category")


@app.get("/")
def check_health():
    return {"message": "API is Ok :) !"}
