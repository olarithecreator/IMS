from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from pydantic.config import ConfigDict

class ProductBase(BaseModel):
    name: str
    sku: str
    description: Optional[str] = None
    category: str
    supplier: str
    price: float
    cost: Optional[float] = None
    stock: int
    min_stock: Optional[int] = None
    max_stock: Optional[int] = None
    weight: Optional[float] = None
    dimensions: Optional[str] = None
    barcode: Optional[str] = None
    tags: Optional[List[str]] = []
    is_active: bool = True

    model_config = ConfigDict(from_attributes=True)

class ProductCreate(ProductBase):
    model_config = ConfigDict(from_attributes=True)

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    supplier: Optional[str] = None
    price: Optional[float] = None
    cost: Optional[float] = None
    stock: Optional[int] = None
    min_stock: Optional[int] = None
    max_stock: Optional[int] = None
    weight: Optional[float] = None
    dimensions: Optional[str] = None
    barcode: Optional[str] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None

    model_config = ConfigDict(from_attributes=True)

class ProductResponse(ProductBase):
    id: int
    tenant_id: int
    status: str = "In Stock"  # Can be "In Stock", "Low Stock", or "Out of Stock"
    last_updated: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "tenant_id": 1,
                "name": "iPhone 13 Pro",
                "sku": "IP13-256GB",
                "description": "Latest iPhone model",
                "category": "Electronics",
                "supplier": "Apple Inc",
                "price": 999.99,
                "cost": 750.00,
                "stock": 50,
                "min_stock": 10,
                "max_stock": 100,
                "weight": 0.174,
                "dimensions": "14.7 x 7.1 x 0.8",
                "barcode": "123456789",
                "tags": ["smartphone", "apple", "5G"],
                "status": "In Stock",
                "is_active": True,
                "last_updated": "2025-08-16T10:00:00",
                "created_at": "2025-08-16T10:00:00",
                "updated_at": "2025-08-16T10:00:00"
            }
        }
    )
