from fastapi import APIRouter, Depends
from app.db.connexion import get_db
from typing import Annotated, List
from sqlalchemy.orm import Session
from app.db.schema import CategoryCreateSchema, CategoryReadSchema, CategoryUpdateSchema
from app.services.category_service import (
    create_category,
    read_all_categories,
    read_one_category,
    update_category,
    delete_category,
)

router = APIRouter(tags=["Category Api V1"])


@router.get("/", response_model=List[CategoryReadSchema])
async def get_all(session: Annotated[Session, Depends(get_db)]):
    return read_all_categories(session=session)


@router.get("/{id}", response_model=CategoryReadSchema)
async def get_one(id: int, session: Annotated[Session, Depends(get_db)]):
    return read_one_category(id=id, session=session)


@router.post("/", response_model=CategoryReadSchema)
async def post(
    category: CategoryCreateSchema, session: Annotated[Session, Depends(get_db)]
):
    return create_category(new_category=category, session=session)


@router.put("/{id}", response_model=CategoryReadSchema)
async def put(
    id: int,
    category: CategoryUpdateSchema,
    session: Annotated[Session, Depends(get_db)],
):
    return update_category(id=id, category=category, session=session)


@router.delete("/{id}")
async def delete(id: int, session: Annotated[Session, Depends(get_db)]):
    return delete_category(id=id, session=session)
