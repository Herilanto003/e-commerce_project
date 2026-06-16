from fastapi import APIRouter, Depends
from app.db.connexion import get_db
from app.db.schema import UserSchema
from typing import Annotated
from sqlalchemy.orm import Session
from app.services.dashboard_service import get_all_totals

router = APIRouter(tags=["Dashboard Api v1"])


@router.get("/")
async def get_totals(
    session: Annotated[Session, Depends(get_db)],
    current_user: Annotated[UserSchema, Depends(get_db)],
):
    return get_all_totals(session=session)
