from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel



class SalesOrderItemBase(BaseModel):
    product_sku: str
    quantity: int
    unit_price: float


class SalesOrderItemCreate(SalesOrderItemBase):
    pass


class SalesOrderItemResponse(SalesOrderItemBase):
    id: int
    tenant_id: int

    class Config:
        orm_mode = True


class SalesOrderBase(BaseModel):
    status: str = "draft"
    purchase_method: Optional[str] = None
    sub_total: float = 0.0
    discount_promo_desc: Optional[str] = None
    receipt: Dict[str, Any] = {}
    created_by: int


class SalesOrderCreate(SalesOrderBase):
    items: List[SalesOrderItemCreate]


class SalesOrderResponse(SalesOrderBase):
    sales_order_id: int
    tenant_id: int
    order_date: datetime
    created_at: datetime
    updated_at: datetime
    items: List[SalesOrderItemResponse]

    class Config:
        orm_mode = True
