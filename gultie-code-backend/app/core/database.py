from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import urllib.parse
import os
from dotenv import load_dotenv

load_dotenv()

db_password_raw = os.environ.get("DB_PASSWORD")
safe_password = urllib.parse.quote_plus(db_password_raw)

DATABASE_URL = (
    f"postgresql+psycopg2://postgres:"
    f"{safe_password}"
    "@localhost:5432/gultie_code_db"
)

engine = create_engine(
    DATABASE_URL,
    echo=True    # only use in dev environment
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

class Base(DeclarativeBase):
    pass