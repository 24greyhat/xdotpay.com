from django.db import models
from django.contrib.auth.models import AbstractUser, make_password
import uuid

from django.utils.crypto import secrets


class Account(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=320, blank=False, unique=True)

    # ethereum merchant address
    merchant_address = models.TextField(max_length=42, blank=False, null=False)

    username = models.CharField(max_length=25, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    class Meta:
        app_label = "authentication"
