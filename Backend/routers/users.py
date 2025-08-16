from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from dependencies.database import DatabaseSession
from models.user import User
from schemas.user import UserCreate, UserResponse
from auth.jwt import get_password_hash, get_current_user_from_token

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/register", response_model=UserResponse)
def create_user(user: UserCreate, db: DatabaseSession):
    # Check if username exists
    db_user = db.query(User).filter(User.user_name == user.user_name).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    now = datetime.utcnow()
    db_user = User(
        user_name=user.user_name,
        email=user.email,
        hashed_password=hashed_password,
        tenant_id=user.tenant_id,
        is_active=True,
        created_at=now,
        updated_at=now
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user_from_token)):
    return current_user

@router.get("/", response_model=List[UserResponse])
def read_users(
    db: DatabaseSession,
    current_user: User = Depends(get_current_user_from_token),
    skip: int = 0,
    limit: int = 100
):
    users = db.query(User).filter(
        User.tenant_id == current_user.tenant_id
    ).offset(skip).limit(limit).all()
    return users
