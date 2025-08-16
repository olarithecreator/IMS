# Backend/models/inventory_transaction.py
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import BigInteger, String, Integer, DateTime, ForeignKey
from models.base import Base


class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    transaction_type: Mapped[str] = mapped_column(String(50), nullable=False)  # in, out, adjustment
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    reference_id: Mapped[str] = mapped_column(String(100), nullable=True)  # For purchase order, sales order, etc.
    reference_type: Mapped[str] = mapped_column(String(50), nullable=True)  # purchase, sale, adjustment
    notes: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="inventory_transactions")
