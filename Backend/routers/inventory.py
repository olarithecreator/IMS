# routers/inventory.py
from fastapi import APIRouter, Depends, HTTPException
from dependencies.database import DatabaseSession
from crud import inventory as inv_crud
from schemas.inventory import StockLevelCreate, StockLevelUpdate, StockLevelResponse

router = APIRouter(prefix="/inventory", tags=["Inventory"])


@router.post("/", response_model=StockLevelResponse)
def create_stock(data: StockLevelCreate, db: DatabaseSession):
    # Replace 1 with current tenant_id from auth/session
    return inv_crud.create_stock_level(db, tenant_id=1, data=data)


@router.get("/product/{sku}", response_model=list[StockLevelResponse])
def get_stock_by_sku(sku: str, db: DatabaseSession):
    return inv_crud.get_stock_by_product(db, tenant_id=1, product_sku=sku)
