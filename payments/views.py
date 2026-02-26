import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

client = razorpay.Client(auth=(
    settings.RAZORPAY_KEY_ID,
    settings.RAZORPAY_KEY_SECRET
))


@api_view(["POST"])
def create_order(request):
    try:
        amount = int(request.data.get("amount")) * 100  # Convert rupees → paise

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response(order)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def verify_payment(request):
    params_dict = {
        "razorpay_order_id": request.data.get("razorpay_order_id"),
        "razorpay_payment_id": request.data.get("razorpay_payment_id"),
        "razorpay_signature": request.data.get("razorpay_signature"),
    }

    try:
        client.utility.verify_payment_signature(params_dict)
        return Response({"status": "Payment Successful"})
    except:
        return Response(
            {"status": "Payment Failed"},
            status=status.HTTP_400_BAD_REQUEST
        )