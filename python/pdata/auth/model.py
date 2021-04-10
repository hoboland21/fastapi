from pydantic import BaseModel, Field
from typing import Optional

class UserList(BaseModel):
    id              : str
    username        : str
    password        : str
    first_name      : str
    last_name       : str
    email           : str
    status          : str
    created_at       : str
    modified_at     : str

class UserCreate(BaseModel) :
    username        : str = Field(..., example="quasar")
    password        : str = Field(..., example="qwe123")
    first_name      : str = Field(..., example="Jonathon")
    last_name       : str = Field(..., example="Clark")
    email           : str = Field(..., example="jc@vgoran.com")


class Token(BaseModel):
    access_token: str
    token_type  : str
    expired_in  : str
    user_info   : UserList

class TokenData(BaseModel):
    username: str = None

class UserUpdate(BaseModel) :
    id              : str = Field(..., example="Enter your ID")
    first_name      : str = Field(..., example="Thomas")
    last_name       : str = Field(..., example="Edison")
    email           : str = Field(..., example="te@gmail.com")
    status          : str = Field(..., example="1")

class UserDelete(BaseModel) :
    id              : str = Field(..., example="Enter your ID")

class UserLogin(BaseModel) :
    username        : str 
    password        : str 

