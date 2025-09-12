from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class WarehouseBase(BaseModel):
    warehouse_name: str
    location: Optional[str] = None
    warehouse_img: Optional[str] = None
    warehouse_address: Optional[str] = None
    currency: Optional[str] = "NGN"


class WarehouseCreate(WarehouseBase):
    pass


class WarehouseResponse(WarehouseBase):
    warehouse_id: int
    tenant_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
