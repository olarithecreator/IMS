# seed_data.py
"""
Script to seed the PostgreSQL database with sample data for tenants, users, and products.
"""
from datetime import datetime
from Backend.db import init_db, get_session
from Backend.models.tenant import Tenant
from Backend.models.user import User
from Backend.models.product import Product
from Backend.models.supplier import Supplier


def seed():
    init_db()  # Ensure tables are created
    with get_session() as db:
        # --- Tenants ---
        tenant1 = Tenant(
            name="Acme Corp",
            plan="premium",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        tenant2 = Tenant(
            name="Beta Inc",
            plan="free",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add_all([tenant1, tenant2])
        db.commit()
        db.refresh(tenant1)
        db.refresh(tenant2)

        # --- Users ---
        user1 = User(
            tenant_id=tenant1.id,
            user_name="alice",
            email="alice@acme.com",
            hashed_password="hashedpassword1",
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        user2 = User(
            tenant_id=tenant2.id,
            user_name="bob",
            email="bob@beta.com",
            hashed_password="hashedpassword2",
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add_all([user1, user2])
        db.commit()

        # --- Suppliers ---
        supplier1 = Supplier(
            tenant_id=tenant1.id,
            name="Acme Supplies",
            contact_name="John Doe",
            email="john@acmesupplies.com",
            phone="555-0100",
            address="123 Supply St",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        supplier2 = Supplier(
            tenant_id=tenant2.id,
            name="Beta Vendors",
            contact_name="Jane Smith",
            email="jane@betavendors.com",
            phone="555-0200",
            address="456 Vendor Ave",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add_all([supplier1, supplier2])
        db.commit()

        # --- Products ---
        product1 = Product(
            tenant_id=tenant1.id,
            name="Widget",
            sku="WGT-001",
            category="Gadgets",
            unit="pcs",
            description="A useful widget",
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        product2 = Product(
            tenant_id=tenant2.id,
            name="Gizmo",
            sku="GZM-002",
            category="Tools",
            unit="pcs",
            description="A handy gizmo",
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add_all([product1, product2])
        db.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
