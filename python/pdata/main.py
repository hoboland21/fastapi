from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status,Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from configs.connection import database
from jose import JWTError, jwt
from passlib.context import CryptContext
from auth.util import get_current_active_user
from fastapi.middleware.cors import CORSMiddleware
from configs.appinfo  import Setting
from pydantic import BaseModel
from auth.model import *
from functools import lru_cache
from configs import appinfo 
from auth.constant import *
import time


#------------------------------
app = FastAPI()
#------------------------------
origins = [
    "http://localhost:8000",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#------------------------------
@lru_cache()
def app_setting():
    return appinfo.Setting()
#=============================
@app.get("/app/info", tags=["App"])
async def app_info(setting: appinfo.Setting = Depends(app_setting)) :
    return {
        "app_name"  : setting.app_name,
        "app_version"  : setting.app_version,
        "app_framework"  : setting.app_framework,
        "app_date"  : setting.app_date,
    }
#=============================
@app.middleware("http")
async def add_process_time_header(request: Request, call_next) :
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers['X-Process-Time'] = str(process_time)
    return response
#=============================
@app.on_event("startup")
async def startup() :
    await database.connect()
#=============================
@app.on_event("shutdown")
async def shutdown() :
    await database.disconnect()    
#=============================
from auth import api as authController
app.include_router(authController.router,tags=["Auth"])
from api import content as apiController
app.include_router(apiController.router,tags=['API'])

