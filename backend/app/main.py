from fastapi import FastAPI
from app.api.v1 import (
    auth_api,
    product_api,
    category_api,
    payment_api,
    cart_api,
    order_api,
    dashboard_api,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

ENDPOINT_V1 = "/api/v1"

app = FastAPI(title="E-Commerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(router=auth_api.router, prefix="/auth")
app.include_router(router=product_api.router, prefix=f"{ENDPOINT_V1}/product")
app.include_router(router=category_api.router, prefix=f"{ENDPOINT_V1}/category")
app.include_router(router=payment_api.router, prefix=f"{ENDPOINT_V1}/payment")
app.include_router(router=cart_api.router, prefix=f"{ENDPOINT_V1}/cart")
app.include_router(router=order_api.router, prefix=f"{ENDPOINT_V1}/orders")
app.include_router(router=dashboard_api.router, prefix=f"{ENDPOINT_V1}/dashboard")


@app.get("/")
def check_health():
    return {"message": "API is Ok :) !"}
