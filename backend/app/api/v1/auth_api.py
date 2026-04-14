from fastapi import APIRouter, HTTPException, status, Depends
from app.db.connexion import get_db
from app.db.schema import UserLoginSchema, UserSchema, Token, UserRegisterSchema
from app.dependencies.auth_dep import (
    authenticate_user,
    create_access_token,
    get_current_user,
    add_user,
)
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session
from datetime import timedelta
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(tags=["API Auth"])


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(get_db)],
) -> Token:

    authenticated_user = authenticate_user(
        user=UserLoginSchema(email=form_data.username, password=form_data.password),
        session=session,
    )

    if not authenticate_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": authenticated_user.email}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me")
async def read_users_me(
    current_user: Annotated[UserSchema, Depends(get_current_user)],
) -> UserSchema:
    return current_user


@router.post("/register")
async def register_user(
    user: UserRegisterSchema, session: Annotated[Session, Depends(get_db)]
):
    return await add_user(user_register=user, session=session)
