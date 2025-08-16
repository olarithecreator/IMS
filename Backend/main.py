from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routers import tenants, products, inventory, audit, users, auth
from middleware.tenant import TenantMiddleware
from db import init_db

app = FastAPI(
    title="Inventory Management API",
    description="Multi-tenant inventory system backend",
    version="1.0.0",
    validate_all=True,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tenant isolation middleware
app.add_middleware(TenantMiddleware)

# Register all routers
app.include_router(auth)  # Authentication routes
app.include_router(users)  # User management routes
app.include_router(tenants)
app.include_router(products)
app.include_router(inventory)
app.include_router(audit)

# Initialize database tables
init_db()

@app.get("/")
def root():
    return {
        "message": "Welcome to the Inventory Management System API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }
