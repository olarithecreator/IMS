# Backend/models/order_item.py
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import BigInteger, Float, Integer, DateTime, ForeignKey, String
from models.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    order_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    order_type: Mapped[str] = mapped_column(String(50), nullable=False)  # purchase or sale
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="order_items")
