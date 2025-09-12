# crud/audit.py
from sqlalchemy.orm import Session
from dependencies.database import DatabaseSession
from models import AuditLog
from schemas.audit import AuditLogCreate
from typing import List


def create_audit_log(db: DatabaseSession, tenant_id: int, log: AuditLogCreate):
    entry = AuditLog(**log.dict(), tenant_id=tenant_id)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_audit_logs(db: DatabaseSession, tenant_id: int, limit: int = 50) -> List[AuditLog]:
    return db.query(AuditLog)\
             .filter_by(tenant_id=tenant_id)\
             .order_by(AuditLog.timestamp.desc())\
             .limit(limit).all()
