from enum import Enum
from pydantic import BaseModel, Field, HttpUrl, ConfigDict, field_serializer
from datetime import datetime


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
    notes: str | None = None


class ApplicationUpdate(BaseModel):
    url: HttpUrl | None = None
    status: ApplicationStatus | None = None
    notes: str | None = None

class ApplicationResponse(BaseModel):
    application_id: int
    user_id: int
    company_name: str
    title: str
    url: HttpUrl | None = None
    status: ApplicationStatus
    notes: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

    @field_serializer('url')
    def serialize_url(self, url: HttpUrl | None) -> str | None:
        return str(url) if url else None