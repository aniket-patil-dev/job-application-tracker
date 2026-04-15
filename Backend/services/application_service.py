from sqlalchemy.orm import Session
from schemas.application_schema import ApplicationCreate, ApplicationUpdate
from models.applications import Application

def create_application(user_id:int, data: ApplicationCreate, db: Session):
    new_application = Application(
        user_id=user_id,
        company_name=data.company_name,
        title=data.title,
        url=str(data.url) if data.url else None,
        status=data.status,
        notes=data.notes
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


def update_application(app_id: int, data: ApplicationUpdate, db: Session):
    application = db.query(Application).filter(Application.application_id == app_id).first()

    if not application:
        return None

    if data.url is not None:
        application.url = str(data.url)

    if data.status is not None:
        application.status = data.status

    if data.notes is not None:
        application.notes = data.notes

    db.commit()
    db.refresh(application)
    return  application


def get_all_applications(db: Session, user_id: int):
    return db.query(Application).filter(
        Application.user_id == user_id
    ).all()


def delete_application(app_id: int, db: Session):
    application = db.query(Application).filter(Application.application_id == app_id).first()

    if not application:
        return None

    db.delete(application)
    db.commit()
    return True