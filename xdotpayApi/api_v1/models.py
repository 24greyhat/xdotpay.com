from django.db import models

from authentication.models import Account


class PaymentStatus(models.TextChoices):
    PENDING = "pending"
    PROCESSING = "processing"
    CONFIRMED = "confirmed"
    FAILED = "failed"


class Invoice(models.Model):

    # metadata -> product name, qty etc...
    metadata = models.JSONField(default=lambda: {}, blank=True, null=True)
    from_address = models.TextField(default="", blank=True, null=True)
    tx_hash = models.TextField(max_length=100, null=True, blank=True)
    merchant = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    status = models.TextField(max_length=200, choices=PaymentStatus.choices)
    amount = models.DecimalField(max_digits=11, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
