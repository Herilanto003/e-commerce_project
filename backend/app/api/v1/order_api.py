from fastapi import APIRouter, Depends
from app.db.connexion import get_db
from typing import Annotated, List
from sqlalchemy.orm import Session
from app.services.order_service import read_all_orders, read_order_items_by_order
from app.db.schema import UserSchema
from app.dependencies.auth_dep import get_admin_role

router = APIRouter(tags=["Orders Api v1"])


@router.get("/")
async def get_all_orders(
    session: Annotated[Session, Depends(get_db)],
    current_user: Annotated[UserSchema, Depends(get_admin_role)],
):
    return read_all_orders(session=session)


@router.get("/items/{order_id}")
async def get_items(
    order_id: int,
    session: Annotated[Session, Depends(get_db)],
    current_user: Annotated[UserSchema, Depends(get_admin_role)],
):
    return read_order_items_by_order(order_id=order_id, session=session)
