from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str
    pass


class TokenData(BaseModel):
    email: EmailStr
    pass


class UserSchema(BaseModel):
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
