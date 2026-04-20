from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.deps import get_db
from models.users import Users
from schemas.user_schema import UserCreate, UserResponse
from services import user_service
from services.auth_service import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(
        data=data,
        db=db
    )

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    user = user_service.get_user(
        db=db,
        user_id=user_id
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return user