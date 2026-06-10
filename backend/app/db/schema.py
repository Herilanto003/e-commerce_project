from pydantic import BaseModel, EmailStr
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str
    pass


class TokenData(BaseModel):
    email: EmailStr
    pass


class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    pass


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
    pass


class UserRegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    pass


"""
*************************************
- PRODUCT SCHEMA                    -
*************************************
"""


class ProductSchema(BaseModel):
    name: str
    description: str
    stock_qty: int
    unit_price: float
    category_id: int
    pass


class ProductCreateSchema(ProductSchema):
    pass


class ProductUpdateSchema(ProductSchema):
    pass


class ProductReadSchema(ProductSchema):
    id: int
    image_link: Optional[str]
    pass


"""
*************************************
- CATEGORY SCHEMA                    -
*************************************
"""


class CategorySchema(BaseModel):
    name: str
    pass


class CategoryCreateSchema(CategorySchema):
    pass


class CategoryReadSchema(CategorySchema):
    id: int
    pass


class CategoryUpdateSchema(CategorySchema):
    pass


"""
*************************************
- PAYMENT SCHEMA                    -
*************************************
"""


class CheckoutItem(BaseModel):
    id: int
    name: str
    price: int
    quantity: int
    product_id: int
    pass


class CheckoutRequest(BaseModel):
    items: list[CheckoutItem]


"""
*************************************
- ORDER SCHEMA                    -
*************************************
"""


class OrderSchema(BaseModel):
    id: int
    status: str
    total_price: float
    username: str
    total_item: int
