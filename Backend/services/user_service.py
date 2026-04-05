from sqlalchemy.orm import Session
from typing_extensions import deprecated
from schemas.user_schema import UserCreate, UserResponse
from models.users import Users
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db:Session, data: UserCreate):
    new_user = UserCreate(
        f_name=data.f_name,
        l_name=data.l_name,
        email=data.email,
        password=data.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def get_user(db:Session, user_id: int):
    return db.query(Users).filter(
        Users.user_id == user_id
    ).first()