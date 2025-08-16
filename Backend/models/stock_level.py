from sqlalchemy import BigInteger, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from models.base import Base


class StockLevel(Base):
    __tablename__ = "stock_levels"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
