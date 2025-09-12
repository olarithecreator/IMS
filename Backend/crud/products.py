# crud/products.py
from datetime import datetime
from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.product import Product
from ..schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, tenant_id: int, product: ProductCreate) -> Product:
    now = datetime.utcnow()
    db_product = Product(
        **product.model_dump(),
        tenant_id=tenant_id,
        created_at=now,
        updated_at=now
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product_by_sku(db: Session, tenant_id: int, sku: str) -> Optional[Product]:
    return db.query(Product).filter_by(tenant_id=tenant_id, sku=sku).first()


def get_all_products(
    db: Session, 
    tenant_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> List[Product]:
    return (
        db.query(Product)
        .filter_by(tenant_id=tenant_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def update_product(
    db: Session, 
    tenant_id: int, 
    sku: str, 
    product: ProductUpdate
) -> Optional[Product]:
    db_product = get_product_by_sku(db, tenant_id, sku)
    if not db_product:
        return None

    update_data = product.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db_product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, tenant_id: int, sku: str) -> bool:
    db_product = get_product_by_sku(db, tenant_id, sku)
    if not db_product:
        return False

    db.delete(db_product)
    db.commit()
    return True
