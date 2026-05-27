from fastapi import APIRouter, HTTPException, status, Depends, Response
from app.db.connexion import get_db
from app.db.schema import UserLoginSchema, UserSchema, Token, UserRegisterSchema
from app.dependencies.auth_dep import (
    authenticate_user,
    create_access_token,
    get_current_user,
    add_user,
    get_admin_role,
)
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session
from datetime import timedelta
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(tags=["API Auth"])


@router.post("/token")
async def login_for_access_token(
    form_data: UserLoginSchema,
    session: Annotated[Session, Depends(get_db)],
    response: Response,
):

    authenticated_user = authenticate_user(
        user=form_data,
        session=session,
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": authenticated_user.email}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",  # Optionnel : ajouter le préfixe Bearer si ton frontend l'attend
        httponly=True,  # Empêche le JS d'accéder au cookie (protection XSS)
        max_age=60 * 60 * 24 * 7,  # 7 jours
        expires=60 * 60 * 24 * 7,
        samesite="lax",  # Protection contre les attaques CSRF
        secure=False,  # Nécessite HTTPS (à mettre à False uniquement en local sans SSL)
    )

    # return Token(access_token=access_token, token_type="bearer")
    return {
        "username": authenticated_user.username,
        "email": authenticated_user.email,
        "role": authenticated_user.role,
    }


@router.get("/users/me")
async def read_users_me(
    current_user: Annotated[UserSchema, Depends(get_current_user)],
) -> UserSchema:
    return current_user


# Admin route API
@router.get("/users/admin/me")
async def admin(admin_user: Annotated[UserSchema, Depends(get_admin_role)]):
    return admin_user


@router.post("/register")
async def register_user(
    user: UserRegisterSchema, session: Annotated[Session, Depends(get_db)]
):
    return await add_user(user_register=user, session=session)


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout"}
