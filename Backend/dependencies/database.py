from typing import Annotated, TypeVar, Generic
from fastapi import Depends
from sqlalchemy.orm import Session
from db import get_db

# Define a TypeVar for Session
DBSession = TypeVar("DBSession", bound=Session)

# Create a reusable dependency
def get_db_session():
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()

# Create type aliases for typed dependencies
DatabaseSession = Annotated[Session, Depends(get_db_session)]
