from fastapi import APIRouter, UploadFile, File, Depends, status
from app.services.product_service import (
    create_product,
    read_all_product,
    read_one_product,
    update_product,
    delete_product,
    save_image,
)
from app.db.schema import ProductCreateSchema, ProductReadSchema, ProductUpdateSchema
from typing import Annotated
from app.db.connexion import get_db
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(tags=["Product Api V1"])


@router.post("/", response_model=ProductReadSchema)
async def create(
    product: ProductCreateSchema, session: Annotated[Session, Depends(get_db)]
):
    return await create_product(product=product, session=session)


@router.get("/", response_model=List[ProductReadSchema])
async def get_all(session: Annotated[Session, Depends(get_db)]):
    return read_all_product(session=session)


@router.get("/{id}", response_model=ProductReadSchema)
async def get_one(id: int, session: Annotated[Session, Depends(get_db)]):
    return read_one_product(id=id, session=session)


@router.put("/{id}", response_model=ProductReadSchema)
async def put(
    id: int, product: ProductUpdateSchema, session: Annotated[Session, Depends(get_db)]
):
    return update_product(id=id, product=product, session=session)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(id: int, session: Annotated[Session, Depends(get_db)]):
    return delete_product(id=id, session=session)


@router.patch("/{id}", response_model=ProductReadSchema)
async def image(
    id: int, session: Annotated[Session, Depends(get_db)], image: UploadFile = File(...)
):
    return await save_image(id=id, session=session, image=image)
