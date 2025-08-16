from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel


class AuditLogBase(BaseModel):
    operation: str
    table_name: str
    record_id: str
    old_value: Optional[Dict[str, Any]] = None
    new_value: Optional[Dict[str, Any]] = None
    metadata: Dict[str, Any] = {}


class AuditLogCreate(AuditLogBase):
    user_id: Optional[int] = None


class AuditLogResponse(AuditLogBase):
    id: int
    tenant_id: int
    user_id: Optional[int]
    timestamp: datetime

    class Config:
        orm_mode = True
