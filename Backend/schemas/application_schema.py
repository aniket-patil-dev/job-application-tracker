from enum import Enum
from pydantic import BaseModel, Field, HttpUrl, ConfigDict
from sqlalchemy import TEXT


class ApplicationStatus(str, Enum):
    applied = "applied"
    interview = "interview"
    offered = "offered"
    hired = "hired"
    rejected = "rejected"

class ApplicationCreate(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=255)
    title: str = Field(..., min_length=1, max_length=100)
    url: HttpUrl | None = None
    status: ApplicationStatus = ApplicationStatus.applied
    notes: TEXT | None = None


class ApplicationUpdate(BaseModel):
    url: str | None = None
    status: ApplicationStatus | None = None
    notes: TEXT | None = None

class ApplicationResponse(BaseModel):
    application_id: int
    user_id: int
    company_name: str
    title: str
    url: HttpUrl | None = None
    status: ApplicationStatus
    notes: TEXT | None = None

    model_config = ConfigDict(
        from_attributes=True
    )