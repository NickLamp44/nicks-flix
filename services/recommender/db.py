"""
db.py — MongoDB connection singleton using pymongo.
Reads CONNECTION_URI and MONGO_DB_NAME from the .env file.
"""

import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.database import Database

load_dotenv()

_client: MongoClient | None = None


def get_db() -> Database:
    """Return a cached pymongo Database instance."""
    global _client
    if _client is None:
        uri = os.getenv("CONNECTION_URI")
        if not uri:
            raise RuntimeError("CONNECTION_URI environment variable is not set")
        _client = MongoClient(uri)
    db_name = os.getenv("MONGO_DB_NAME", "nicksflix")
    return _client[db_name]
