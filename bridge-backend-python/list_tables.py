import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

async def main():
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")
    if db_url.startswith("mysql://"):
        db_url = db_url.replace("mysql://", "mysql+aiomysql://", 1)

    engine = create_async_engine(db_url)
    
    async with engine.connect() as conn:
        result = await conn.execute(text("SHOW TABLES"))
        tables = result.fetchall()
        print("Available tables:")
        for table in tables:
            print(f"- {table[0]}")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
