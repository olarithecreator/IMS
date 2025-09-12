from datetime import datetime
from pydantic import BaseModel



class StockLevelBase(BaseModel):
    product_sku: str
    warehouse_id: int
    on_hand: int = 0
    committed: int = 0
    incoming: int = 0
    damaged: int = 0


class StockLevelCreate(StockLevelBase):
    pass


class StockLevelResponse(StockLevelBase):
    id: int
    tenant_id: int
    updated_at: datetime

    class Config:
        orm_mode = True
