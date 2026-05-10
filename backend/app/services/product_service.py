from fastapi import HTTPException, status, UploadFile, File
from app.db.schema import ProductCreateSchema, ProductReadSchema, ProductUpdateSchema
from app.db.models import Product, Category
from sqlalchemy.orm import Session
from typing import List

import os
import uuid

MAX_FILE_SIZE = 5 * 1024 * 1024
ALLOWED_TYPES = ["image/jpeg", "image/png"]


# -------------------------------- ***
# Checker si l'ID produit n'existe pas
# -------------------------------- ***
def check_product(id: int, session: Session):
    exist_product = session.query(Product).where(Product.id == id).first()

    if exist_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Produit non trouvé :( !"
        )

    return exist_product


# -------------------------------- ***
# Checker si l'ID category n'existe pas
# -------------------------------- ***
def check_category(id: int, session: Session):
    exist_category = session.query(Category).where(Category.id == id).first()

    if exist_category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Catégorie non trouvée :( !"
        )


# -------------------------------- ***
# Création produit
# -------------------------------- ***
async def create_product(
    product: ProductCreateSchema, session: Session
) -> ProductReadSchema:
    # if product.image_link == "":
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Veuillez ajouter un image !",
    #     )

    # # Vérification du type MIME
    # if image.content_type.lower() not in ALLOWED_TYPES:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Le fichier doit être une image (JPG/PNG)",
    #     )

    # # Vérification de la taille
    # content = await image.read()
    # if len(content) > MAX_FILE_SIZE:
    #     raise HTTPException(
    #         status_code=status.HTTP_413_CONTENT_TOO_LARGE,
    #         detail="Le fichier est trop volimineux (max 5MB)",
    #     )

    # # Génération d'un nom unique
    # file_extension = os.path.splitext(image.filename)[1]
    # unique_name = f"{uuid.uuid4()}{file_extension}"
    # save_path = f"app/static/uploads/{unique_name}"

    # # Sauvegarde
    # with open(save_path, "wb") as f:
    #     f.write(content)

    check_category(product.category_id, session=session)

    new_product = Product(
        name=product.name,
        description=product.description,
        stock_qty=product.stock_qty,
        unit_price=product.unit_price,
        category_id=product.category_id,
    )

    session.add(new_product)
    session.commit()
    session.refresh(new_product)

    return new_product

    # return {"url": f"static/uploads/{unique_name}"}


# async def create_image_product(id: int, image: UploadFile=File(...)):


# -------------------------------- ***
# Lecture pour toutes les produits
# -------------------------------- ***
def read_all_product(session: Session) -> List[ProductReadSchema]:
    all_products = session.query(Product).all()

    return all_products


# -------------------------------- ***
# Lecture une seule produit
# -------------------------------- ***
def read_one_product(id: int, session: Session) -> ProductReadSchema:
    product_db = check_product(id=id, session=session)

    return product_db


# -------------------------------- ***
# Modification d'un produit
# -------------------------------- ***
def update_product(
    id: int, product: ProductUpdateSchema, session: Session
) -> ProductReadSchema:
    product_db = check_product(id=id, session=session)

    check_category(product.category_id, session=session)

    for key, value in dict(product).items():
        setattr(product_db, key, value)
        pass

    session.add(product_db)
    session.commit()
    session.refresh(product_db)

    return product_db


# -------------------------------- ***
# Suppression d'un produit
# -------------------------------- ***
def delete_product(id: int, session: Session):
    product_db = check_product(id=id, session=session)

    session.delete(product_db)
    session.commit()


# -------------------------------- ***
# Sauvegarder image d'un produit
# -------------------------------- ***
async def save_image(
    id: int, session: Session, image: UploadFile = File(...)
) -> ProductReadSchema:

    product_db = check_product(id=id, session=session)

    if image is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Veuillez ajouter un image !",
        )

    # Vérification du type MIME
    if image.content_type.lower() not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le fichier doit être une image (JPG/PNG)",
        )

    # Vérification de la taille
    content = await image.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
            detail="Le fichier est trop volimineux (max 5MB)",
        )

    # Suppression ancienne image
    if product_db.image_link:
        old_path = f"app/{product_db.image_link}"
        if os.path.exists(old_path):
            os.remove(old_path)

    # Génération d'un nom unique
    file_extension = os.path.splitext(image.filename)[1]
    unique_name = f"{uuid.uuid4()}{file_extension}"
    save_path = f"app/static/uploads/{unique_name}"

    # Sauvegarde
    with open(save_path, "wb") as f:
        f.write(content)

    # Sauvegarder le lien dans db
    product_db.image_link = f"static/uploads/{unique_name}"
    session.add(product_db)
    session.commit()
    session.refresh(product_db)

    return product_db
