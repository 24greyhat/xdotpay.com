from typing import List
from django.db.models import Sum
from ninja import Router
from ninja.errors import HttpError
from api_v1.models import Invoice, PaymentStatus
from api_v1.schemas import NewInvoiceSchema, PaymentSchema, StatsSchema, ViewInvoiceSchema
from authentication.models import Account
from helpers.api import Auth
from decouple import config as env_config
from web3 import Web3


router = Router()


w3 = Web3(Web3.HTTPProvider(env_config("ETH_RPC", cast=str)))


ROUTE_ADDRESS = "0x273c4e1584A001E2D849Aca43975244422F48224"


@router.post("/new/invoice", tags=["PAYMENT GATEWAY"], auth=Auth(), response=ViewInvoiceSchema)
def newInvoice(request, data: NewInvoiceSchema):
    '''
    # New Invoice

    > This endpoint will create a new invoice.


    - **Note**: The **merchant** field is the merchant's username.

    '''

    try:
        data = data.dict()

        data['merchant'] = request.auth

        data['status'] = PaymentStatus.PENDING

        invoice = Invoice(**data)

        invoice.save()

        return invoice

    except Exception:
        raise HttpError(
            400,
            "Failed to create new invoice, please follow the given api schema for each endpoint."
        )


# example -> /view/invoice?id=10
@router.get("/view/invoice", tags=["PAYMENT GATEWAY"], response=ViewInvoiceSchema)
def viewInvoice(request, id: int):
    '''
    # View Invoice

    > This endpoint will return the invoice with the given id.

    '''

    invoice = Invoice.objects.get(id=id)

    return invoice


@router.get("/view/invoices", tags=["PAYMENT GATEWAY"], auth=Auth(), response=List[ViewInvoiceSchema])
def viewInvoices(request, skip: int = 0, limit: int = 100):
    '''
    # View Invoices

    > This endpoint will return all invoices belonging to this merchant.

    '''

    invoices = Invoice.objects.all().filter(
        merchant=request.auth).order_by("-created_at")

    return invoices[skip:limit]


@router.get("/view/stats", tags=["PAYMENT GATEWAY"], auth=Auth(), response=StatsSchema)
def viewStats(request):
    '''
    # View Stats

    > This endpoint will return all the stats necessary for the dashboard (invoices, revenue, completed, pending)

    '''

    invoices = Invoice.objects.all().filter(
        merchant=request.auth, status=PaymentStatus.CONFIRMED)

    sum_result = Invoice.objects.all().filter(
        merchant=request.auth, status=PaymentStatus.CONFIRMED).aggregate(total_amount=Sum('amount'))

    sum_result = sum_result['total_amount']

    if sum_result == None:
        sum_result = 0

    revenue = (float(sum_result) - (float(sum_result)*0.1))

    total = Invoice.objects.all().filter(merchant=request.auth).count()

    pending = Invoice.objects.all().filter(
        merchant=request.auth, status=PaymentStatus.PENDING).count()

    completed = Invoice.objects.all().filter(
        merchant=request.auth, status=PaymentStatus.CONFIRMED).count()

    return {"invoices": total, "revenue": revenue, "pending": pending, "completed": completed}


@ router.post("/pay/invoice", tags=["PAYMENT GATEWAY"], response=ViewInvoiceSchema)
def payInvoice(request, data: PaymentSchema):
    '''
    # Pay Invoice

    > This endpoint will update the invoice.

    '''

    try:
        data = data.dict()

        invoice = Invoice.objects.get(id=data['invoice_id'])
        invoice.from_address = data['from_address']
        invoice.tx_hash = data['tx_hash']
        invoice.status = PaymentStatus.PROCESSING

        invoice.save()

        return invoice

    except Exception:
        raise HttpError(
            400,
            "Failed to create new invoice, please follow the given api schema for each endpoint."
        )


@router.get("/verify", tags=["PAYMENT GATEWAY"])
def verify_payment(request, invoice_id: int, tx_hash: str):

    payment = Invoice.objects.get(id=invoice_id)

    receipt = w3.eth.get_transaction_receipt(tx_hash)

    if receipt["status"] != 1:
        payment.status = PaymentStatus.FAILED
        payment.save()
        return {"success": False, "message": "Transaction failed"}

    # Check router emitted PaymentProcessed event
    for log in receipt["logs"]:
        if log["address"].lower() == ROUTER_ADDRESS.lower():
            payment.status = PaymentStatus.CONFIRMED
            payment.tx_hash = tx_hash
            payment.save()
            return {"success": True, "message": "Payment confirmed"}

    return {"success": False, "message": "Router event not found"}
