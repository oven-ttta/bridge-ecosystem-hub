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

@app.get("/")
async def root():
    return {"message": "Welcome to Bridge Ecosystem Hub API"}

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

@app.get("/api/tables")
async def list_tables():
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SHOW TABLES"))
            tables = [row[0] for row in result.fetchall()]
            return {"tables": tables}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@app.get("/api/data/{table_name}")
async def get_table_data(table_name: str):
    try:
        async with AsyncSessionLocal() as session:
            # Note: Using f-string for table name. In production, validate table_name against a whitelist.
            # To be safe, we check if the table exists first.
            table_check = await session.execute(text("SHOW TABLES"))
            allowed_tables = [row[0] for row in table_check.fetchall()]
            
            if table_name not in allowed_tables:
                raise HTTPException(status_code=404, detail=f"Table '{table_name}' not found")

            result = await session.execute(text(f"SELECT * FROM `{table_name}`"))
            rows = result.mappings().all()
            return [dict(row) for row in rows]
    except HTTPException as he:
        raise he
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@app.get("/api/companies", response_model=List[Company])
async def list_companies():
    try:
        async with AsyncSessionLocal() as session:
            # Execute async query to fetch all records
            result = await session.execute(
                text("SELECT * FROM companies")
            )
            # Fetch all rows mapped as dictionaries
            rows = result.mappings().all()
            
            # Pydantic will seamlessly parse these dicts since populate_by_name=True
            return [dict(row) for row in rows]
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8080"))
    print(f"Python (FastAPI) Backend running on http://localhost:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)