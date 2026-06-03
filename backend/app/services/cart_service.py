from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models import Cart, CartItem, Product
from app.db.schema import UserSchema
from typing import List


# -------------------------------- ***
# Obtenir tous les items d'un panier
# -------------------------------- ***
async def get_all_item(user: UserSchema, session: Session):
    # Obtenir le panier actif de l'utilisateur
    cart_db = (
        session.query(Cart)
        .filter(Cart.status == "active", Cart.user_id == user.id)
        .first()
    )

    if not cart_db:
        return []

    # Obtenir tous les lignes de commandes
    # all_items = session.query(CartItem).where(CartItem.cart_id == cart_db.id).all()
    all_items = (
        session.query(
            CartItem.id,
            CartItem.qty,
            CartItem.product_id,
            Product.name,
            Product.image_link,
            Product.unit_price,
        )
        .join(CartItem, CartItem.product_id == Product.id)
        .where(CartItem.cart_id == cart_db.id)
        .order_by(CartItem.id)
        .all()
    )
    if not all_items:
        return []

    return [
        {
            "id": id,
            "name": name,
            "price": unit_price,
            "imageUrl": image_link,
            "quantity": qty,
            "product_id": product_id,
        }
        for id, qty, product_id, name, image_link, unit_price in all_items
    ]


# -------------------------------- ***
# Ajout nouveau cart
# -------------------------------- ***
async def add_new_item(product_id: int, user: UserSchema, session: Session):
    # Vérifier si le produit existe
    product_db = session.query(Product).where(Product.id == product_id).first()
    if not product_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Produit n existe pas"
        )

    # Tester s'il y a déjà un cart actif pour l'utilisateur sinon on crée un nouveau cart actif
    active_cart = (
        session.query(Cart)
        .filter(Cart.user_id == user.id, Cart.status == "active")
        .first()
    )
    if not active_cart:
        try:
            active_cart = Cart(user_id=user.id, status="active")
            session.add(active_cart)
            session.flush()
            pass
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        pass

    # Vérifier si item existe déjà dans le panier
    item = (
        session.query(CartItem)
        .filter(CartItem.cart_id == active_cart.id, CartItem.product_id == product_id)
        .first()
    )

    try:
        if not item:
            item = CartItem(
                cart_id=active_cart.id,
                product_id=product_id,
                price=product_db.unit_price,
                qty=1,
            )
            session.add(item)
            pass

        session.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return {"message": "Produit ajouté dans le panier"}


# -------------------------------- ***
# Augmenter la quantité d'un item
# -------------------------------- ***
async def increase_item_quantity(product_id: int, user: UserSchema, session: Session):
    # Vérifier si le produit existe
    product_db = session.query(Product).where(Product.id == product_id).first()
    if not product_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Produit n existe pas"
        )

    active_cart = (
        session.query(Cart)
        .filter(Cart.user_id == user.id, Cart.status == "active")
        .first()
    )
    if not active_cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Commande non trouvé !"
        )

    # Vérifier si item existe déjà dans le panier
    item = (
        session.query(CartItem)
        .filter(CartItem.cart_id == active_cart.id, CartItem.product_id == product_id)
        .first()
    )
    if not item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Line de commande non trouvé",
        )

    try:
        if product_db.stock_qty <= item.qty:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{product_db.name}, stock insuffisant !",
            )

        item.qty = item.qty + 1
        session.add(item)

        session.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return {"message": "Produit ajouté dans le panier"}


# -------------------------------- ***
# Diminuer la quantité d'un item
# -------------------------------- ***
async def decrease_item_quantity(product_id: int, user: UserSchema, session: Session):
    # Vérifier si le produit existe
    product_db = session.query(Product).where(Product.id == product_id).first()
    if not product_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Produit n existe pas"
        )

    active_cart = (
        session.query(Cart)
        .filter(Cart.user_id == user.id, Cart.status == "active")
        .first()
    )
    if not active_cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Commande non trouvé !"
        )

    # Vérifier si item existe déjà dans le panier
    item = (
        session.query(CartItem)
        .filter(CartItem.cart_id == active_cart.id, CartItem.product_id == product_id)
        .first()
    )
    if not item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Line de commande non trouvé",
        )

    try:
        if item.qty > 1:
            item.qty -= 1
            session.add(item)
        else:
            session.delete(item)

        session.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return {"message": "Produit ajouté dans le panier"}


# -------------------------------- ***
# Vider le panier
# -------------------------------- ***
async def remove_all_item(user: UserSchema, session: Session):
    # Vérifier si le cart existe
    cart_db = (
        session.query(Cart)
        .filter(Cart.user_id == user.id, Cart.status == "active")
        .first()
    )

    if not cart_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Le panier n existe pas"
        )

    # Changer le status pour abandonner (canceled)
    try:
        cart_db.status = "canceled"
        session.add(cart_db)
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# -------------------------------- ***
# Supprimer un item d'un panier
# -------------------------------- ***
async def remove_one_item(item_id: int, session: Session):
    # Vérifier si l'item existe
    item_db = session.query(CartItem).where(CartItem.id == item_id).first()
    if not item_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La ligne de commande n existe pas",
        )

    # Supprimer l'item
    try:
        session.delete(item_db)
        session.commit()
        pass
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
