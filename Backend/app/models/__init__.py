#!/usr/bin/python3
"""
initialize the models package
"""

from dotenv import load_dotenv
load_dotenv()


from os import getenv


storage_t = getenv("BCV_TYPE_STORAGE")

if storage_t == "db":
    from app.models.engine.db_storage import DBstorage
    storage = DBstorage()
    storage.reload()

