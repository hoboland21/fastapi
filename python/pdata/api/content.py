from configs.connection import database
from db.table import users
from fastapi import APIRouter, HTTPException,Depends
from auth import model
from auth import constant
from auth import util
import uuid,datetime
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from fastapi.security import OAuth2PasswordRequestForm
from main import app

router = APIRouter()

@router.get("/content")
async def read_content():
    pass