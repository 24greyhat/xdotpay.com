import datetime
from typing import Optional
from ninja import Schema
from pydantic import UUID4


class SignupSchema(Schema):
    email: str
    merchant_address: str
    username: str
    password: str


class LoginSchema(Schema):
    email: str
    password: str


class AccountSchema(Schema):
    id: UUID4
    email: str
    username: str
    merchant_address: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class ViewAccountSchema(Schema):
    id: UUID4
    merchant_address: str
    email: str
    username: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class UpdateAccountSchema(Schema):
    email: Optional[str] = None
    merchant_address: Optional[str]
    username: Optional[str] = None
    password: Optional[str] = None
