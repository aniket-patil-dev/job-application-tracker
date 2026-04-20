from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from db.deps import get_db
from schemas.application_schema import ApplicationCreate, ApplicationUpdate, ApplicationResponse
from services import application_service
from services.auth_service import get_current_user
from models.users import Users

router = APIRouter(prefix="/applications", tags=["applications"])

@router.post("/", response_model=ApplicationResponse)
def create(data: ApplicationCreate, db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    return application_service.create_application(user_id=current_user.user_id, data=data, db=db)

@router.get("/", response_model=list[ApplicationResponse])
def get_all(db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    return application_service.get_all_applications(db=db, user_id=current_user.user_id)

@router.patch("/{app_id}", response_model=ApplicationResponse)
def update(app_id: int, data: ApplicationUpdate, db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    app = application_service.get_application(app_id=app_id, db=db)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return application_service.update_application(app_id=app_id, data=data, db=db)

@router.delete("/{app_id}")
def delete(app_id: int, db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    app = application_service.get_application(app_id=app_id, db=db)

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    application_service.delete_application(app_id=app_id, db=db)
    return {"detail": "Deleted successfully"}