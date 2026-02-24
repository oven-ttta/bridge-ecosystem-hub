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
    
    sql = """
    CREATE TABLE IF NOT EXISTS companies (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        taxId VARCHAR(255),
        type TINYINT,
        companyNameTh VARCHAR(255),
        companyName VARCHAR(255),
        company_status TINYINT,
        register_date VARCHAR(20),
        typeofService VARCHAR(255),
        subtypeofService VARCHAR(255),
        additionalInfo TEXT,
        location VARCHAR(255),
        city VARCHAR(255),
        is_tech TINYINT(1) DEFAULT 0,
        is_verified TINYINT(1) DEFAULT 0,
        phoneNumber VARCHAR(50),
        website VARCHAR(255),
        objective TEXT
    );
    """
    
    async with engine.begin() as conn:
        await conn.execute(text(sql))
        print("สร้างตาราง companies สำเร็จ!")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
