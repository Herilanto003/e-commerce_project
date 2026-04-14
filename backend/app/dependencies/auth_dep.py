from pwdlib import PasswordHash
from app.db.schema import UserLoginSchema, TokenData, UserRegisterSchema
from app.db.models import User
from app.db.connexion import get_db
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from datetime import timedelta, datetime, timezone
from app.core.config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from jwt.exceptions import InvalidTokenError

import jwt

password_hash = PasswordHash.recommended()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def invalid_credential_exception(message: str):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=message)


def authenticate_user(user: UserLoginSchema, session: Session):
    # get user by email
    db_user = session.query(User).filter(User.email == user.email).first()
    if db_user is None:
        return False

    # tester le mot de passe
    if not verify_password(user.password, db_user.password):
        return False

    # returner l'user
    return db_user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=180)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Annotated[Session, Depends(get_db)],
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except InvalidTokenError:
        raise credentials_exception

    user = session.query(User).filter(User.email == token_data.email).first()

    if user is None:
        raise credentials_exception

    return user


async def add_user(user_register: UserRegisterSchema, session: Session):
    db_user = (
        session.query(User)
        .filter(
            User.email == user_register.email or User.username == user_register.username
        )
        .first()
    )

    if db_user:
        invalid_credential_exception("Email or Username already taken !")
        pass

    new_user = User(
        email=user_register.email,
        username=user_register.username,
        password=get_password_hash(user_register.password),
        role="USER",
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user
