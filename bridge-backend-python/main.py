import os
from contextlib import asynccontextmanager
from typing import Optional, List
from dotenv import load_dotenv

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy import text

# Load environment variables
load_dotenv()

# Get database URL and convert to async driver if using mysql://
db_url = os.getenv("DATABASE_URL")
if not db_url:
    raise ValueError("DATABASE_URL must be set in .env")

if db_url.startswith("mysql://"):
    db_url = db_url.replace("mysql://", "mysql+aiomysql://", 1)

# Initialize SQLAlchemy async engine
engine = create_async_engine(db_url, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Company(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        alias_generator=to_camel
    )

    id: int
    tax_id: Optional[str] = None
    type: Optional[int] = None
    company_name_th: Optional[str] = None
    company_name: Optional[str] = None
    company_status: Optional[int] = None
    register_date: Optional[str] = None
    typeof_service: Optional[str] = None
    subtypeof_service: Optional[str] = None
    additional_info: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    is_tech: Optional[int] = None
    is_verified: Optional[int] = None
    phone_number: Optional[str] = None
    website: Optional[str] = None
    objective: Optional[str] = None

@app.get("/api/companies", response_model=List[Company])
async def list_companies(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=1000)
):
    offset = (page - 1) * limit
    try:
        async with AsyncSessionLocal() as session:
            # Execute async query
            result = await session.execute(
                text("SELECT * FROM companies LIMIT :limit OFFSET :offset"),
                {"limit": limit, "offset": offset}
            )
            # Fetch all rows mapped as dictionaries
            rows = result.mappings().all()
            
            # Pydantic will seamlessly parse these dicts since populate_by_name=True
            return [dict(row) for row in rows]
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Database Error")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8080"))
    print(f"Python (FastAPI) Backend running on http://localhost:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
