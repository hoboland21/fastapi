from configs.connection import database
from db.table import users
from fastapi import APIRouter, HTTPException,Depends
from auth import model
from auth import constant
from auth import util
from datetime import timedelta
import uuid,datetime
from fastapi import Request, HTTPException,status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.security import OAuth2PasswordRequestForm
from main import app

router = APIRouter()

# =========================
@router.post("/auth/register",response_model=model.UserList)
async def register(user: model.UserCreate):
    userDB = await util.get_user(user.username)
    if userDB:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    gid = str(uuid.uuid1())
    gdate = str(datetime.datetime.now())
    query = users.insert().values(
        id = gid,
        username = user.username,
        password = util.get_password_hash(user.password),
        last_name = user.last_name,
        first_name = user.first_name,
        email = user.email,
        created_at = gdate,
        modified_at = gdate,
        status = '1'
    )
    await database.execute(query)
    results = {
        **user.dict(),
        "id":gid,
        "created_at":gdate,
        "modified_at":gdate,
        "status":"1"
    }
    return results
#=======================================
@router.get("/users/me", response_model=model.UserList)
async def read_user_me(currentUser: model.UserList = Depends(util.get_current_active_user)) :
    return currentUser

#=======================================
@router.get("/users") 
async def find_all_user(currentUser: model.UserList = Depends(util.get_current_active_user)):
    query = "select * from users"
    return await database.fetch_all(query=query, values={})
#=======================================
@router.post("/webtoken", response_model=model.Token)
async def login_webtoken(usr: model.UserLogin):
    return await util.login_token(usr.username, usr.password)
#=======================================
@router.post("/token", response_model=model.Token)
async def login_swagger(form_data: OAuth2PasswordRequestForm = Depends()):
    return await util.login_token(form_data.username, form_data.password)
#

