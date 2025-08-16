import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..db import Base, get_db
from ..main import app

# Test database URL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost:5432/inventory_test_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def test_db():
    # Create the test database tables
    Base.metadata.create_all(bind=engine)
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()
        # Drop the test database tables
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client(test_db):
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()
