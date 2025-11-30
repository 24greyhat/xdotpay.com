from datetime import datetime
from django.db import IntegrityError
from ninja import File, Form, Router, UploadedFile
from helpers.api import Auth
from .schemas import LoginSchema, SignupSchema, AccountSchema, ViewAccountSchema, UpdateAccountSchema
from rest_framework.authentication import TokenAuthentication, authenticate
from rest_framework.authtoken.models import Token
from ninja.errors import HttpError
from dateutil import parser as dateParser


router = Router()


@router.post("/signup", tags=["Authentication"], response=AccountSchema)
def signup(request, data: SignupSchema):
    '''
    # Signup Endpoint

    > This endpoint registers new users

    '''

    try:

        data = data.dict()

        password = data.pop("password")

        instance = Account(**data)

        instance.set_password(password)

        instance.save()

        return instance

    except IntegrityError as e:
        if "email" in e.__str__():
            raise HttpError(
                400, 'This email is already associated with an account!')
        raise HttpError(400, 'This username taken!')

    except Exception:
        raise HttpError(400, "An error occurred, please try again!")


@router.post("/login", tags=["Authentication"])
def login(request, data: LoginSchema):
    '''
    # Login Endpoint

    > This endpoint authenticates users

    '''

    user = authenticate(username=data.email, password=data.password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        return {"token": token.key}

    else:
        raise HttpError(400, "invalid credentials!")


@router.get("/logout", tags=["Authentication"], auth=Auth())
def logout(request):
    '''
    # Logout Endpoint

    > This endpoint deletes the user's access token

    '''

    acc = request.auth

    try:
        token = Token.objects.get(user=acc)
        token.delete()

        return {"detail": "Successfully logged out and token invalidated."}

    except Token.DoesNotExist:
        return {"detail": "Successfully logged out and token invalidated."}


@router.get("/deleteAccount", tags=["Authentication"], auth=Auth())
def deleteAccount(request):
    '''
    # DeleteAccount Endpoint

    > This endpoint deletes the user's account

    '''
    try:

        request.auth.delete()

        return {"detail": "Account deleted successfully!"}

    except Exception:
        raise HttpError(400, "Failed to delete account, please try again!")


@router.get("/account", tags=["Authentication"], response=ViewAccountSchema, auth=Auth())
def getAccount(request):
    '''
    # Account Endpoint

    > This endpoint will return the account object associated with the given token
    '''

    if not request.auth:
        raise HttpError(403, "You are not authenticated!")

    else:
        return request.auth


@router.post("/updateAccount", tags=["Authentication"], response=ViewAccountSchema, auth=Auth())
def updateAccount(request, data: Form[UpdateAccountSchema]):
    '''
    # UpdateAccount Endpoint

    > This endpoint updates account details

    '''

    try:

        instance = request.auth

        data = data.dict()

        updated_fields = []

        if data.get("password"):
            password = data.pop("password")

            instance.set_password(password)

            updated_fields.append("password")

        if data.get("email"):
            instance.email = data.pop('email')

            updated_fields.append("email")

            instance.is_email_valid = False  # set to false cuz the new email is not yet verfied

            updated_fields.append("is_email_valid")

        if data.get("first_name"):
            instance.first_name = data.pop("first_name")
            updated_fields.append("first_name")

        if data.get("last_name"):
            instance.last_name = data.pop("last_name")
            updated_fields.append("last_name")

        if data.get("username"):
            instance.username = data.pop("username")
            updated_fields.append("username")

        instance.save(update_fields=updated_fields)

        return instance

    except IntegrityError as e:
        print(e.__str__())
        if "email" in e.__str__():
            raise HttpError(
                400, 'This email is already associated with an account!')
        raise HttpError(400, 'This username taken!')
