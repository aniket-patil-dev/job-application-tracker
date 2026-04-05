from sqlalchemy.orm import Session
from schemas.application_schema import ApplicationCreate, ApplicationUpdate
from models.applications import Application

def create_application(db: Session, data: ApplicationCreate):
    new_application = ApplicationCreate(
        company_name=data.company_name,
        title=data.title,
        url=data.url,
        status=data.status,
        notes=data.notes
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


def update_application(db: Session, data: ApplicationUpdate):
    pass

def get_all_applications(db: Session, user_id: int):
    return db.query(Application).filter(
        Application.user_id == user_id
    ).all()