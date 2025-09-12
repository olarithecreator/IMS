from datetime import datetime, date
from typing import List
from pydantic import BaseModel



class PurchaseOrderItemBase(BaseModel):
    product_sku: str
    quantity: int
    unit_cost: float


class PurchaseOrderItemCreate(PurchaseOrderItemBase):
    pass


class PurchaseOrderItemResponse(PurchaseOrderItemBase):
    id: int
    tenant_id: int

    class Config:
        orm_mode = True


class PurchaseOrderBase(BaseModel):
    order_date: date
    status: str = "draft"
    created_by: int


class PurchaseOrderCreate(PurchaseOrderBase):
    items: List[PurchaseOrderItemCreate]


class PurchaseOrderResponse(PurchaseOrderBase):
    id: int
    tenant_id: int
    created_at: datetime
    updated_at: datetime
    items: List[PurchaseOrderItemResponse]

    class Config:
        orm_mode = True
