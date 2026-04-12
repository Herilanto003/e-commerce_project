from fastapi import FastAPI

app = FastAPI(title="E-Commerce API")


@app.get("/")
def check_health():
    return {"message": "API is Ok :) !"}
