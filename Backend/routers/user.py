from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.deps import get_db
from schemas.user_schema import UserCreate, UserResponse
from services import user_service

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(
        data=data,
        db=db
    )

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = user_service.get_user(
        db=db,
        user_id=user_id
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user