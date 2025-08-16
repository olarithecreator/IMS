from datetime import datetime
from pydantic import BaseModel


class TenantBase(BaseModel):
    name: str
    plan: str = "free"


class TenantCreate(TenantBase):
    pass


class TenantResponse(TenantBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
