from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.db.connexion import get_db
from app.db.schema import UserSchema
from app.dependencies.auth_dep import get_current_user
from app.services.cart_service import (
    add_new_item,
    get_all_item,
    increase_item_quantity,
    decrease_item_quantity,
    remove_all_item,
    remove_one_item,
)
from typing import Annotated

router = APIRouter(tags=["Cart API v1"])


@router.get("/")
async def get_all(
    current_user: Annotated[UserSchema, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_db)],
):
    return await get_all_item(user=current_user, session=session)


@router.post("/items/new")
async def add_new(
    product_id: int,
    current_user: Annotated[UserSchema, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_db)],
):
    return await add_new_item(product_id=product_id, user=current_user, session=session)


@router.put("/items/increase")
async def increase_quantity(
    product_id: int,
    current_user: Annotated[UserSchema, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_db)],
):
    return await increase_item_quantity(
        product_id=product_id, user=current_user, session=session
    )


@router.put("/items/decrease")
async def decrease_quantity(
    product_id: int,
    current_user: Annotated[UserSchema, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_db)],
):
    return await decrease_item_quantity(
        product_id=product_id, user=current_user, session=session
    )


@router.delete("/items/remove-all")
async def remove_all(
    current_user: Annotated[UserSchema, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_db)],
):
    return await remove_all_item(user=current_user, session=session)


@router.delete("/items/remove-one/{item_id}")
async def remove_one(item_id: int, session: Annotated[Session, Depends(get_db)]):
    return await remove_one_item(item_id=item_id, session=session)
