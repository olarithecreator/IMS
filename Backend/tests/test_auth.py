from ..models.tenant import Tenant
from ..models.user import User
from ..auth.jwt import get_password_hash
from datetime import datetime

def test_create_tenant(client, test_db):
    response = client.post(
        "/tenants/",
        json={"name": "Test Corp", "plan": "premium"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Corp"
    assert data["plan"] == "premium"

def test_create_user(client, test_db):
    # First create a tenant
    tenant = Tenant(
        name="Test Corp",
        plan="premium",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    test_db.add(tenant)
    test_db.commit()
    test_db.refresh(tenant)

    # Then create a user
    response = client.post(
        "/users/",
        json={
            "user_name": "testuser",
            "email": "test@example.com",
            "password": "testpass123",
            "tenant_id": tenant.id
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_name"] == "testuser"
    assert data["email"] == "test@example.com"

def test_login(client, test_db):
    # Create a test user
    tenant = Tenant(
        name="Test Corp",
        plan="premium",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    test_db.add(tenant)
    test_db.commit()
    test_db.refresh(tenant)

    user = User(
        tenant_id=tenant.id,
        user_name="testuser",
        email="test@example.com",
        hashed_password=get_password_hash("testpass123"),
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    test_db.add(user)
    test_db.commit()

    # Test login
    response = client.post(
        "/token",
        data={
            "username": "testuser",
            "password": "testpass123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
