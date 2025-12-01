import datetime
from typing import Dict, Optional
from ninja import Schema
from authentication.schemas import ViewAccountSchema


class NewInvoiceSchema(Schema):
    metadata: Optional[Dict]
    amount: float


class ViewInvoiceSchema(Schema):
    id: int
    metadata: Optional[Dict]
    from_address: Optional[str]
    tx_hash: Optional[str]
    merchant: ViewAccountSchema
    amount: float
    status: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class PaymentSchema(Schema):
    from_address: str
    tx_hash: str
    invoice_id: int


class StatsSchema(Schema):
    invoices: int
    revenue: float
    pending: int
    completed: int
