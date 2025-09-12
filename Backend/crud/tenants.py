# crud/tenants.py
from datetime import datetime
from sqlalchemy.orm import Session
from dependencies.database import DatabaseSession
from models import Tenant
from schemas.tenant import TenantCreate


def create_tenant(db: DatabaseSession, tenant: TenantCreate) -> Tenant:
    now = datetime.utcnow()
    tenant_data = tenant.dict()
    tenant_data["created_at"] = now
    tenant_data["updated_at"] = now
    db_tenant = Tenant(**tenant_data)
    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)
    return db_tenant


def get_tenant(db: DatabaseSession, tenant_id: int) -> Tenant | None:
    return db.query(Tenant).filter_by(id=tenant_id).first()
