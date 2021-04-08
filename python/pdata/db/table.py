from sqlalchemy import String, Column, Table, MetaData

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id"          ,String, primary_key=True),
    Column("username"    ,String),
    Column("password"    ,String),
    Column("first_name"  ,String),
    Column("last_name"   ,String),
    Column("status"      ,String),
    Column("email"       ,String),
    Column("created_at"   ,String),
    Column("modified_at" ,String)
    
)