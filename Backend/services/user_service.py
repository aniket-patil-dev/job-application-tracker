from sqlalchemy.orm import Session
from schemas.user_schema import UserCreate
from models.users import Users
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(data: UserCreate, db: Session):
    new_user = Users(
        f_name=data.f_name,
        l_name=data.l_name,
        email=data.email,
        password=pwd_context.hash(data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def get_user(user_id: int, db: Session):
    return db.query(Users).filter(
        Users.user_id == user_id
    ).first()

def get_user_by_email(email: str, db: Session):
    return db.query(Users).filter(Users.email == email).first()