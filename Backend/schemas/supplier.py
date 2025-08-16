from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class SupplierBase(BaseModel):
    name: str
    phone_number: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None


class SupplierCreate(SupplierBase):
    pass


class SupplierResponse(SupplierBase):
    id: int
    tenant_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
