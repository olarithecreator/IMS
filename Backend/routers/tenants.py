# routers/tenants.py
from fastapi import APIRouter, Depends, HTTPException
from dependencies.database import DatabaseSession
from schemas.tenant import TenantCreate, TenantResponse
from crud import tenants as tenant_crud

router = APIRouter(prefix="/tenants", tags=["Tenants"])


@router.post("/", response_model=TenantResponse)
def create_tenant(tenant: TenantCreate, db: DatabaseSession):
    return tenant_crud.create_tenant(db, tenant)


@router.get("/{tenant_id}", response_model=TenantResponse)
def get_tenant(tenant_id: int, db: DatabaseSession):
    tenant = tenant_crud.get_tenant(db, tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant
