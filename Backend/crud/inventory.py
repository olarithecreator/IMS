# crud/inventory.py
from sqlalchemy.orm import Session
from dependencies.database import DatabaseSession
from models import StockLevel
from schemas.inventory import StockLevelCreate, StockLevelUpdate
from typing import List


def get_stock_by_product(db: DatabaseSession, tenant_id: int, product_sku: str) -> List[StockLevel]:
    return db.query(StockLevel).filter_by(tenant_id=tenant_id, product_sku=product_sku).all()


def get_stock_for_warehouse(db: DatabaseSession, tenant_id: int, warehouse_id: int) -> List[StockLevel]:
    return db.query(StockLevel).filter_by(tenant_id=tenant_id, warehouse_id=warehouse_id).all()


def create_stock_level(db: DatabaseSession, tenant_id: int, data: StockLevelCreate):
    stock = StockLevel(**data.dict(), tenant_id=tenant_id)
    db.add(stock)
    db.commit()
    db.refresh(stock)
    return stock


def update_stock_level(db: DatabaseSession, stock_id: int, updates: StockLevelUpdate):
    stock = db.query(StockLevel).filter_by(id=stock_id).first()
    if stock:
        for key, value in updates.dict().items():
            setattr(stock, key, value)
        db.commit()
        db.refresh(stock)
    return stock
