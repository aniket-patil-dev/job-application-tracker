from datetime import datetime, timezone
from sqlalchemy import Column, Integer, ForeignKey, String, Enum, Text, DateTime
from db import Base


class Application(Base):
    __tablename__ = 'applications'

    application_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    company_name = Column(String(255), nullable=False)
    title = Column(String(100), nullable=False)
    url = Column(String(255), nullable=True)
    status =  Column(Enum('applied', 'interview', 'offered', 'hired', 'rejected'), default='applied')
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))