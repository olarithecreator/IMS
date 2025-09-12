from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import List
from datetime import datetime

from dependencies.database import DatabaseSession
from models.product import Product
from schemas.product import ProductCreate, ProductUpdate, ProductResponse
from auth.jwt import get_current_user_from_token
from models.user import User

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token)
):
    # Convert tags from string to list if needed
    if isinstance(product.tags, str):
        product.tags = [tag.strip() for tag in product.tags.split(",")]

    # Check if SKU exists
    if db.query(Product).filter(
        Product.sku == product.sku,
        Product.tenant_id == current_user.tenant_id,
        Product.is_active == True
    ).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SKU already exists"
        )

    # Create product
    db_product = Product(
        **product.model_dump(),
        tenant_id=current_user.tenant_id,
        last_updated=datetime.utcnow()
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    # Calculate initial status
    db_product.status = db_product.calculate_status()
    db.commit()
    db.refresh(db_product)

    # Return the response model
    return ProductResponse.model_validate(db_product)

@router.get("/", response_model=List[ProductResponse])
async def list_products(
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token),
    skip: int = 0,
    limit: int = 100
):
    products = db.query(Product).filter(
        Product.tenant_id == current_user.tenant_id,
        Product.is_active == True
    ).offset(skip).limit(limit).all()
    return [ProductResponse.model_validate(product) for product in products]

@router.get("/{id}", response_model=ProductResponse)
async def get_product(
    id: int,
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token)
):
    product = db.query(Product).filter(
        Product.id == id,
        Product.tenant_id == current_user.tenant_id,
        Product.is_active == True
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    return ProductResponse.model_validate(product)

@router.put("/{id}", response_model=ProductResponse)
async def update_product(
    id: int,
    product_update: ProductUpdate,
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token)
):
    db_product = db.query(Product).filter(
        Product.id == id,
        Product.tenant_id == current_user.tenant_id,
        Product.is_active == True
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Convert tags from string to list if needed
    if isinstance(product_update.tags, str):
        product_update.tags = [tag.strip() for tag in product_update.tags.split(",")]

    # Check if SKU exists and is different from current product
    if product_update.sku and product_update.sku != db_product.sku:
        if db.query(Product).filter(
            Product.sku == product_update.sku,
            Product.tenant_id == current_user.tenant_id,
            Product.is_active == True
        ).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="SKU already exists"
            )

    # Update product fields
    update_data = product_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)

    db_product.last_updated = datetime.utcnow()
    db_product.status = db_product.calculate_status()

    db.commit()
    db.refresh(db_product)
    return ProductResponse.model_validate(db_product)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    id: int,
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token)
):
    db_product = db.query(Product).filter(
        Product.id == id,
        Product.tenant_id == current_user.tenant_id,
        Product.is_active == True
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Soft delete
    db_product.is_active = False
    db_product.last_updated = datetime.utcnow()
    
    db.commit()
    return None
