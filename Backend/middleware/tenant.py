from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from auth.jwt import get_current_user

from fastapi import Depends
from sqlalchemy.orm import Session
from db import get_db

class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip auth for public endpoints
        public_paths = ["/", "/docs", "/openapi.json", "/token", "/users/register", "/tenants/"]
        if request.url.path in public_paths:
            return await call_next(request)

        try:
            # Get the current user from JWT token
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            if not token:
                raise HTTPException(status_code=401, detail="Not authenticated")

            # Get database session
            db = next(get_db())
            try:
                user = get_current_user(token, db)
                # Add tenant_id to request state
                request.state.tenant_id = user.tenant_id
                response = await call_next(request)
                return response
            finally:
                db.close()

        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid authentication")
