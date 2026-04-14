from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.connexion import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="USER")

    # Cascade: Si on supprime l'User, on supprime son Profile, ses Orders et son Cart
    profile = relationship(
        "Profile", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")
    cart = relationship(
        "Cart", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    firstname = Column(String)
    lastname = Column(String)
    phone = Column(String)
    address = Column(String)
    # ondelete="CASCADE" au niveau DB
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="profile")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String, nullable=False)

    # Si on supprime une catégorie, on peut soit supprimer les produits, soit mettre category_id à NULL
    # Ici, suppression des produits rattachés
    products = relationship(
        "Product", back_populates="category", cascade="all, delete-orphan"
    )


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String, nullable=False)
    description = Column(Text)
    stock_qty = Column(Integer)
    unit_price = Column(Float)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"))

    category = relationship("Category", back_populates="products")
    order_items = relationship(
        "OrderItem", back_populates="product", cascade="all, delete-orphan"
    )
    cart_items = relationship(
        "CartItem", back_populates="product", cascade="all, delete-orphan"
    )


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    status = Column(String)
    total_price = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="orders")
    items = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    qty = Column(Integer)
    price = Column(Float)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    total_price = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="cart")
    items = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    qty = Column(Integer)
    price = Column(Integer)
    cart_id = Column(Integer, ForeignKey("carts.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")
