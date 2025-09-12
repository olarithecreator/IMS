# db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool


from models import Base  # Import your DeclarativeBase from models
from contextlib import contextmanager

# ✅ Load environment variables
from dotenv import load_dotenv
import os
from pathlib import Path

# Get the directory containing db.py
current_dir = Path(__file__).resolve().parent

# Load environment variables from .env file in the Backend directory
env_path = current_dir / '.env'
load_dotenv(dotenv_path=env_path)

# ✅ Your actual PostgreSQL connection string here
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

# ✅ Create engine (NullPool = good for dev, switch to default for prod)
engine = create_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    poolclass=NullPool,  # remove or adjust for production
)

# ✅ Create a session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    future=True
)


# ✅ Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Create tables (optional – use cautiously in production)
def init_db():
    Base.metadata.create_all(bind=engine)


# ✅ Optional for scripts or CLI tools
@contextmanager
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
