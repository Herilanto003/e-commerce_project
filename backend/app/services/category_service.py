from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models import Category
from app.db.schema import CategoryCreateSchema, CategoryReadSchema, CategoryUpdateSchema
from typing import List


# -------------------------------- ***
# Checker si l'ID n'existe pas
# -------------------------------- ***
def check_category(id: int, session: Session):
    exist_category = session.query(Category).where(Category.id == id).first()

    if exist_category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Catégorie non trouvé :( !"
        )

    return exist_category


# -------------------------------- ***
#  Création catégorie
# -------------------------------- ***
def create_category(
    new_category: CategoryCreateSchema, session: Session
) -> CategoryReadSchema:
    category_db = Category(name=new_category.name)

    session.add(category_db)
    session.commit()
    session.refresh(category_db)

    return category_db


# -------------------------------- ***
# Obtenir toutes les catégories
# -------------------------------- ***
def read_all_categories(session: Session) -> List[CategoryReadSchema]:
    all_categories = session.query(Category).all()

    return all_categories


# -------------------------------- ***
# Obtenir un seul catégorie
# -------------------------------- ***
def read_one_category(id: int, session: Session) -> CategoryReadSchema:
    category = check_category(id=id, session=session)
    return category


# -------------------------------- ***
# Modifier une catégorie
# -------------------------------- ***
def update_category(
    id: int, category: CategoryUpdateSchema, session: Session
) -> CategoryReadSchema:
    exist_category = check_category(id=id, session=session)

    for key, value in dict(category).items():
        setattr(exist_category, key, value)
        pass

    session.add(exist_category)
    session.commit()
    session.refresh(exist_category)

    return exist_category


# -------------------------------- ***
# supprimer une catégorie
# -------------------------------- ***
def delete_category(id: int, session: Session):
    exist_category = check_category(id=id, session=session)

    session.delete(exist_category)
    session.commit()

    return {
        "success": True,
        "message": f"Categorie avec ID : {id} est supprimé avec succès !",
    }
