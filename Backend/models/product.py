from datetime import datetime
from datetime import datetime
from sqlalchemy import BigInteger, String, Text, Boolean, DateTime, ForeignKey, Float, Integer, JSON, event
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    sku: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    supplier: Mapped[str] = mapped_column(String(100), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    cost: Mapped[float] = mapped_column(Float, nullable=True)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    min_stock: Mapped[int] = mapped_column(Integer, nullable=True)
    max_stock: Mapped[int] = mapped_column(Integer, nullable=True)
    weight: Mapped[float] = mapped_column(Float, nullable=True)
    dimensions: Mapped[str] = mapped_column(String(50), nullable=True)
    barcode: Mapped[str] = mapped_column(String(100), nullable=True)
    tags: Mapped[list] = mapped_column(JSON, nullable=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="In Stock")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    last_updated: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    # Relationships
    tenant = relationship("Tenant", back_populates="products")
    inventory_transactions = relationship("InventoryTransaction", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

    def calculate_status(self) -> str:
        """Calculate the product's stock status based on stock levels"""
        if self.stock <= 0:
            return "Out of Stock"
        elif self.min_stock and self.stock <= self.min_stock:
            return "Low Stock"
        else:
            return "In Stock"

    def before_update(self):
        """Update timestamps before any update"""
        self.updated_at = datetime.utcnow()
        self.last_updated = datetime.utcnow()

@event.listens_for(Product, 'before_update')
def receive_before_update(mapper, connection, target):
    target.before_update()
