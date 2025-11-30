import datetime
from typing import Optional
from ninja import Schema
from pydantic import UUID4


class SignupSchema(Schema):
    email: str
    merchant_address: str
    username: str
    first_name: str
    last_name: str
    password: str


class LoginSchema(Schema):
    email: str
    password: str


class AccountSchema(Schema):
    id: UUID4
    email: str
    username: str
    merchant_address: str
    first_name: str
    last_name: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class ViewAccountSchema(Schema):
    id: UUID4
    merchant_address: str
    email: str
    username: str
    first_name: str
    last_name: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class UpdateAccountSchema(Schema):
    email: Optional[str] = None
    merchant_address: Optional[str]
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    password: Optional[str] = None
