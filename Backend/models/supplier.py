from datetime import datetime
from sqlalchemy import BigInteger, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from models.base import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    contact_name: Mapped[str] = mapped_column(String(100), nullable=True)
    email: Mapped[str] = mapped_column(String(120), nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    address: Mapped[str] = mapped_column(String(200), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
