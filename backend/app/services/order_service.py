from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.models import Order, OrderItem, Product, User
from app.db.schema import OrderSchema
from typing import List


# -------------------------------- ***
# Obtenir toutes les commandes
# -------------------------------- ***
def read_all_orders(session: Session):
    result = (
        session.query(
            Order.id.label("id_order"),
            Order.status.label("status_order"),
            func.sum(OrderItem.qty * Product.unit_price).label("total_price_order"),
            User.username.label("username"),
            func.count(OrderItem.id).label("total_item_by_order"),
        )
        .join(User, User.id == Order.user_id)  # Order → User
        .join(OrderItem, OrderItem.order_id == Order.id)  # Order → OrderItem
        .join(Product, Product.id == OrderItem.product_id)
        .group_by(Order.id, Order.status, Order.total_price, User.username)
        .order_by(Order.id)
        .all()
    )

    if result is None:
        return []

    return [
        {
            "id": id_order,
            "status_order": status_order,
            "total_price_order": total_price_order,
            "username": username,
            "total_item": total_item_by_order,
        }
        for id_order, status_order, total_price_order, username, total_item_by_order in result
    ]


# -------------------------------- ***
# Obtenir toutes les lignes de commandes
# -------------------------------- ***
def read_order_items_by_order(order_id: int, session: Session):
    result = (
        session.query(
            OrderItem.id.label("id_order_item"),
            OrderItem.qty.label("quantity"),
            Product.id.label("id_product"),
            Product.name.label("product_name"),
            Product.image_link.label("image_link"),
            Product.unit_price.label("unit_price"),
        )
        .join(Order, Order.id == OrderItem.order_id)
        .join(Product, Product.id == OrderItem.product_id)
        .where(Order.id == order_id)
        .all()
    )

    return [
        {
            "id_order_item": id_order_item,
            "quantity": quantity,
            "id_product": id_product,
            "product_name": product_name,
            "image_link": image_link,
            "unit_price": unit_price,
        }
        for id_order_item, quantity, id_product, product_name, image_link, unit_price in result
    ]
