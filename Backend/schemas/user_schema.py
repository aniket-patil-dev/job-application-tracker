from pydantic import BaseModel, EmailStr, Field
from pydantic import ConfigDict

class UserCreate(BaseModel):
    f_name: str = Field(..., min_length=1, max_length=50)
    l_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str  = Field(..., min_length=8)

class UserResponse(BaseModel):
    f_name: str
    l_name: str
    email: EmailStr

    model_config = ConfigDict(
        from_attributes = True
    )