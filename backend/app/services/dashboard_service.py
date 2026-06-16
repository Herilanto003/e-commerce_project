from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.models import Order, OrderItem, Product, User
from fastapi import status, HTTPException


# -------------------------------- ***
# Obtenir tous les totals
# -------------------------------- ***
def get_all_totals(session: Session):
    try:
        total_user = session.query(func.count(User.id)).scalar()
        total_product = session.query(func.count(Product.id)).scalar()
        total_order = session.query(func.count(Order.id)).scalar()
        total_order_cancel = (
            session.query(func.count(Order.id))
            .filter(Order.status == "cancel")
            .scalar()
        )
        total_order_pending = (
            session.query(func.count(Order.id))
            .filter(Order.status == "pending")
            .scalar()
        )
        total_order_paid = (
            session.query(func.count(Order.id)).filter(Order.status == "paid").scalar()
        )

        return dict(
            {
                "total_user": total_user,
                "total_product": total_product,
                "total_order": total_order,
                "total_order_cancel": total_order_cancel,
                "total_order_pending": total_order_pending,
                "total_order_paid": total_order_paid,
            }
        )

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
