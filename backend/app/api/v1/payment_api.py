from fastapi import APIRouter, HTTPException, status, Request, Depends
from app.db.schema import CheckoutRequest, CheckoutItem, UserSchema
from app.core.config import STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, FRONTEND_URL
from sqlalchemy.orm import Session
from app.db.connexion import get_db
from app.db.models import Product, Order, OrderItem, Cart, CartItem
from typing import Annotated
from app.dependencies.auth_dep import get_current_user
import stripe

router = APIRouter(tags=["PAYMENT API v1"])


@router.post("/create-checkout-session")
async def create_checkout_session(
    data: CheckoutRequest,
    session: Annotated[Session, Depends(get_db)],
    user: Annotated[UserSchema, Depends(get_current_user)],
):
    items: list[CheckoutItem] = []

    # calculer la total
    total = sum(item.price * item.quantity for item in data.items)

    # Création de la commande dans la BDD
    order_db = Order(status="pending", total_price=total, user_id=user.id)
    session.add(order_db)
    session.flush()

    try:

        for checkoutItemData in data.items:
            # Pour chaque item , il faut vérifier l'état du stock
            product = (
                session.query(Product)
                .where(Product.id == checkoutItemData.product_id)
                .first()
            )
            if product is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"{checkoutItemData.name} n'éxiste pas !",
                )

            if product.stock_qty < checkoutItemData.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"{checkoutItemData.name}, stock insuffisant !",
                )

            checkoutItemData.name = product.name
            items.append(checkoutItemData)
            order_item = OrderItem(
                qty=checkoutItemData.quantity,
                price=checkoutItemData.price,
                order_id=order_db.id,
                product_id=checkoutItemData.product_id,
            )

            session.add(order_item)

            pass

        # Changer le status du cart en converted
        for checkoutItemData in data.items:
            # Vérifier si l'item existe
            cart_item = (
                session.query(CartItem)
                .where(CartItem.id == checkoutItemData.id)
                .first()
            )
            if not cart_item:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="La ligne de commande n existe pas",
                )

            cart = (
                session.query(Cart)
                .filter(Cart.id == cart_item.cart_id, Cart.status == "active")
                .first()
            )
            if not cart_item:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="La ligne de commande n existe pas",
                )

            cart.status = "converted"

            session.add(cart)
            break

        line_items = [
            {
                "price_data": {
                    "currency": "eur",
                    "product_data": {"name": item.name},
                    "unit_amount": item.price,
                },
                "quantity": item.quantity,
            }
            for item in items
        ]

        session_stripe = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=FRONTEND_URL
            + "/payment/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=FRONTEND_URL
            + "/payment/cancel?session_id={CHECKOUT_SESSION_ID}&order_id="
            + str(order_db.id),
            api_key=STRIPE_SECRET_KEY,
            metadata={"order_id": order_db.id},
        )

        session.commit()
        session.refresh(order_db)

        return {"url": session_stripe.url}

    except stripe.StripeError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(
    request: Request, session: Annotated[Session, Depends(get_db)]
):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload, sig_header=sig_header, secret=STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payload"
        )

    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Signature"
        )

    if event["type"] == "checkout.session.completed":
        session_event = event["data"]["object"]

        print(f"Payment reçu pour la session : {session_event["metadata"]}")
        # changement de status en paid (Payé)
        order_id = int(session_event["metadata"]["order_id"])
        order_db = session.query(Order).where(Order.id == order_id).first()
        order_db.status = "paid"

        session.add(order_db)

        # Sortie des stocks
        order_items = (
            session.query(OrderItem).where(OrderItem.order_id == order_id).all()
        )
        for order_item in order_items:
            product = (
                session.query(Product)
                .where(Product.id == order_item.product_id)
                .first()
            )
            product.stock_qty = product.stock_qty - order_item.qty
            session.add(product)
            print(product)
            pass

        # Commiter tous les changements
        session.commit()

    elif event["type"] == "payment_intent.payment_failed":
        print(f"Paiement échoué !")
        pass

    else:
        print("Unhandled event type {}".format(event.type))

    return {"status": "ok"}


@router.post("/cancel-order/{order_id}")
async def cancel_order(order_id: int, session: Annotated[Session, Depends(get_db)]):
    order_db = session.query(Order).where(Order.id == order_id).first()
    if order_db is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Commande non trouvé !"
        )

    order_db.status = "cancel"

    session.add(order_db)
    session.commit()
    return {"message": "Commande annulé"}
