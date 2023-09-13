from fastapi import APIRouter, HTTPException, status
from sqlmodel import Session, delete, select

from database.index import obter_engine

engine = obter_engine()

