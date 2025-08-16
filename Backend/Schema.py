# models.py
from __future__ import annotations
from datetime import datetime, date
from typing import List, Optional, Dict, Any

from pydantic import BaseModel


from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    Enum,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    String,
    Text,
    UniqueConstraint,
    JSON,
    func,
    Numeric,
)
from sqlalchemy.dialects.postgresql import JSONB, CITEXT
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.schema import MetaData


# ---------- Naming conventions (nice for Alembic) ----------
convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}
metadata = MetaData(naming_convention=convention)


class Base(DeclarativeBase):
    metadata = metadata


# ---------- Enums ----------
po_status = Enum(
    "draft",
    "approved",
    "partially_received",
    "received",
    "cancelled",
    name="po_status",
)

so_status = Enum(
    "draft",
    "confirmed",
    "fulfilled",
    "partially_fulfilled",
    "cancelled",
    "refunded",
    name="so_status",
)

purchase_method = Enum(
    "cash",
    "card",
    "transfer",
    "pos",
    "online",
    "other",
    name="purchase_method",
)


# =========================================================
# Core lookups
# =========================================================
class Tenant(Base):
    __tablename__ = "tenants"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    plan: Mapped[str] = mapped_column(String(50), nullable=False, default="free")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    # relationships
    roles: Mapped[List["Role"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")
    users: Mapped[List["User"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")
    warehouses: Mapped[List["Warehouse"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")
    suppliers: Mapped[List["Supplier"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")
    products: Mapped[List["Product"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")


class Role(Base):
    __tablename__ = "roles"
    __table_args__ = (UniqueConstraint("tenant_id", "role_name", name="uq_roles_tenant_role"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    role_name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    tenant: Mapped["Tenant"] = relationship(back_populates="roles")
    users: Mapped[List["UserRole"]] = relationship(back_populates="role", cascade="all, delete-orphan")


class Warehouse(Base):
    __tablename__ = "warehouses"
    __table_args__ = (UniqueConstraint("tenant_id", "warehouse_name", name="uq_warehouses_tenant_name"),)

    warehouse_id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    warehouse_name: Mapped[str] = mapped_column(String(150), nullable=False)
    location: Mapped[Optional[str]] = mapped_column(String(150))
    warehouse_img: Mapped[Optional[str]] = mapped_column(Text)
    warehouse_address: Mapped[Optional[str]] = mapped_column(Text)
    currency: Mapped[Optional[str]] = mapped_column(String(3), default="NGN")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    tenant: Mapped["Tenant"] = relationship(back_populates="warehouses")
    users: Mapped[List["User"]] = relationship(back_populates="warehouse")
    stock_levels: Mapped[List["StockLevel"]] = relationship(back_populates="warehouse")


class Supplier(Base):
    __tablename__ = "suppliers"
    __table_args__ = (UniqueConstraint("tenant_id", "name", name="uq_suppliers_tenant_name"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(30))
    email: Mapped[Optional[str]] = mapped_column(CITEXT)
    address: Mapped[Optional[str]] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    tenant: Mapped["Tenant"] = relationship(back_populates="suppliers")
    products: Mapped[List["Product"]] = relationship(back_populates="supplier")


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint("tenant_id", "email", name="uq_users_tenant_email"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)

    user_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(CITEXT, nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(30))

    hashed_password: Mapped[str] = mapped_column(Text, nullable=False)
    hashed_pin: Mapped[Optional[str]] = mapped_column(Text)

    # Optional default role via role_name
    role_name: Mapped[Optional[str]] = mapped_column(String(80))
    warehouse_id: Mapped[Optional[int]] = mapped_column(ForeignKey("warehouses.warehouse_id"))

    address: Mapped[Optional[str]] = mapped_column(Text)
    permissions: Mapped[Dict[str, Any]] = mapped_column(JSONB, default=list, nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    tenant: Mapped["Tenant"] = relationship(back_populates="users")
    warehouse: Mapped[Optional["Warehouse"]] = relationship(back_populates="users")

    # tie role_name to roles.role_name within tenant via composite join
    role: Mapped[Optional["Role"]] = relationship(
        "Role",
        primaryjoin="and_(User.tenant_id==Role.tenant_id, User.role_name==Role.role_name)",
        viewonly=True,
    )

    created_products: Mapped[List["Product"]] = relationship(
        "Product", foreign_keys="Product.created_by", back_populates="creator"
    )
    updated_products: Mapped[List["Product"]] = relationship(
        "Product", foreign_keys="Product.updated_by", back_populates="updater"
    )
    created_purchase_orders: Mapped[List["PurchaseOrder"]] = relationship(back_populates="creator")
    created_sales_orders: Mapped[List["SalesOrder"]] = relationship(back_populates="creator")
    audit_logs: Mapped[List["AuditLog"]] = relationship(back_populates="user")


class UserRole(Base):
    __tablename__ = "user_roles"
    __table_args__ = (
        UniqueConstraint("tenant_id", "user_id", "role_id", name="uq_user_roles_tenant_user_role"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)

    user: Mapped["User"] = relationship()
    role: Mapped["Role"] = relationship(back_populates="users")


# =========================================================
# Products
# =========================================================
class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        PrimaryKeyConstraint := None,  # placeholder for typing clarity
        # Composite PK and uniques:
        ForeignKeyConstraint(
            ["tenant_id"], ["tenants.id"], ondelete="CASCADE"
        ),
        UniqueConstraint("tenant_id", "barcode", name="uq_products_tenant_barcode"),
        CheckConstraint("cost_price >= 0 AND sell_price >= 0", name="ck_products_prices_non_negative"),
        # composite PK:
        {"postgresql_partition_by": None},
    )

    # Composite PK implemented using both columns as primary_key=True
    tenant_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    product_sku: Mapped[str] = mapped_column(String(64), primary_key=True)

    name: Mapped[str] = mapped_column(String(200), nullable=False)
    unit: Mapped[str] = mapped_column(String(30), nullable=False)
    cost_price: Mapped[float] = mapped_column(Numeric(18, 4), default=0, nullable=False)
    sell_price: Mapped[float] = mapped_column(Numeric(18, 4), default=0, nullable=False)
    product_img: Mapped[Optional[str]] = mapped_column(Text)
    category: Mapped[Optional[str]] = mapped_column(String(120))
    description: Mapped[Optional[str]] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    created_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    updated_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))

    metadata_: Mapped[Dict[str, Any]] = mapped_column("metadata", JSONB, default=dict, nullable=False)
    expiry_date: Mapped[Optional[date]] = mapped_column(Date)
    barcode: Mapped[Optional[str]] = mapped_column(String(64))
    supplier_id: Mapped[Optional[int]] = mapped_column(ForeignKey("suppliers.id"))
    colour: Mapped[Optional[str]] = mapped_column(String(50))
    size: Mapped[Optional[str]] = mapped_column(String(50))
    brand: Mapped[Optional[str]] = mapped_column(String(100))
    tags: Mapped[Optional[str]] = mapped_column(Text)

    tenant: Mapped["Tenant"] = relationship(back_populates="products")
    supplier: Mapped[Optional["Supplier"]] = relationship(back_populates="products")
    creator: Mapped[Optional["User"]] = relationship(foreign_keys=[created_by], back_populates="created_products")
    updater: Mapped[Optional["User"]] = relationship(foreign_keys=[updated_by], back_populates="updated_products")

    stock_levels: Mapped[List["StockLevel"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )

# =========================================================
# Inventory
# =========================================================
class StockLevel(Base):
    __tablename__ = "stock_levels"
    __table_args__ = (
        UniqueConstraint("tenant_id", "product_sku", "warehouse_id", name="uq_stock_tenant_product_warehouse"),
        ForeignKeyConstraint(
            ["tenant_id", "product_sku"],
            ["products.tenant_id", "products.product_sku"],
            ondelete="CASCADE",
        ),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    product_sku: Mapped[str] = mapped_column(String(64), nullable=False)
    warehouse_id: Mapped[int] = mapped_column(ForeignKey("warehouses.warehouse_id", ondelete="CASCADE"), nullable=False)

    on_hand: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    committed: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    incoming: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    damaged: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    product: Mapped["Product"] = relationship(back_populates="stock_levels")
    warehouse: Mapped["Warehouse"] = relationship(back_populates="stock_levels")
    tenant: Mapped["Tenant"] = relationship()


# =========================================================
# Purchases
# =========================================================
class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    order_date: Mapped[date] = mapped_column(Date, nullable=False, server_default=func.current_date())
    status: Mapped[str] = mapped_column(po_status, nullable=False, default="draft")

    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    tenant: Mapped["Tenant"] = relationship()
    creator: Mapped["User"] = relationship(back_populates="created_purchase_orders")
    items: Mapped[List["PurchaseOrderItem"]] = relationship(back_populates="purchase_order", cascade="all, delete-orphan")


class PurchaseOrderItem(Base):
    __tablename__ = "purchase_order_items"
    __table_args__ = (
        ForeignKeyConstraint(
            ["tenant_id", "product_sku"],
            ["products.tenant_id", "products.product_sku"],
            ondelete="RESTRICT",
        ),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)

    purchase_order_id: Mapped[int] = mapped_column(
        ForeignKey("purchase_orders.id", ondelete="CASCADE"), nullable=False
    )
    product_sku: Mapped[str] = mapped_column(String(64), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_cost: Mapped[float] = mapped_column(Numeric(18, 4), nullable=False)

    purchase_order: Mapped["PurchaseOrder"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship()


# =========================================================
# Sales
# =========================================================
class SalesOrder(Base):
    __tablename__ = "sales_orders"

    sales_order_id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)

    order_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    status: Mapped[str] = mapped_column(so_status, nullable=False, default="draft")

    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    purchase_method: Mapped[Optional[str]] = mapped_column(purchase_method)
    sub_total: Mapped[float] = mapped_column(Numeric(18, 4), nullable=False, default=0)
    discount_promo_desc: Mapped[Optional[str]] = mapped_column(Text)
    receipt: Mapped[Dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    tenant: Mapped["Tenant"] = relationship()
    creator: Mapped["User"] = relationship(back_populates="created_sales_orders")
    items: Mapped[List["SalesOrderItem"]] = relationship(back_populates="sales_order", cascade="all, delete-orphan")


class SalesOrderItem(Base):
    __tablename__ = "sales_order_items"
    __table_args__ = (
        ForeignKeyConstraint(
            ["tenant_id", "product_sku"],
            ["products.tenant_id", "products.product_sku"],
            ondelete="RESTRICT",
        ),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)

    sales_order_id: Mapped[int] = mapped_column(ForeignKey("sales_orders.sales_order_id", ondelete="CASCADE"), nullable=False)
    product_sku: Mapped[str] = mapped_column(String(64), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(18, 4), nullable=False)

    sales_order: Mapped["SalesOrder"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship()


# =========================================================
# Auditing
# =========================================================
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))

    operation: Mapped[str] = mapped_column(String(30), nullable=False)
    table_name: Mapped[str] = mapped_column(String(100), nullable=False)
    record_id: Mapped[str] = mapped_column(String(120), nullable=False)

    old_value: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB)
    new_value: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB)
    metadata_: Mapped[Dict[str, Any]] = mapped_column("metadata", JSONB, default=dict, nullable=False)

    user: Mapped[Optional["User"]] = relationship()
