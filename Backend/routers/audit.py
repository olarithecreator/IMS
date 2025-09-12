# routers/audit.py
from fastapi import APIRouter, Depends
from dependencies.database import DatabaseSession
from crud import audit
from schemas.audit import AuditLogCreate, AuditLogResponse

router = APIRouter(prefix="/audit", tags=["Audit Logs"])


@router.post("/", response_model=AuditLogResponse)
def create_audit(data: AuditLogCreate, db: DatabaseSession):
    return audit.create_audit_log(db, tenant_id=1, log=data)


@router.get("/", response_model=list[AuditLogResponse])
def get_logs(db: DatabaseSession):
    return audit.get_audit_logs(db, tenant_id=1)
