import re

with open('backend/server.py', 'r') as f:
    content = f.read()

create_order_old = """@api_router.post("/create-order")
async def create_razorpay_order(order_req: OrderCreateRequest):
    razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID')
    razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET')

    if not razorpay_key_id or not razorpay_key_secret:
        return {"error": "Razorpay credentials not configured"}

    try:
        razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret))

        # Razorpay expects amount in paise
        order_amount = int(order_req.amount * 100)

        order_data = {
            "amount": order_amount,
            "currency": order_req.currency,
            "payment_capture": 1
        }

        order = razorpay_client.order.create(data=order_data)
        return order
    except Exception as e:
        return {"error": str(e)}"""

create_order_new = """@api_router.post("/create-order")
async def create_razorpay_order(order_req: OrderCreateRequest):
    razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID')
    razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET')

    if not razorpay_key_id or not razorpay_key_secret:
        return {"error": "Razorpay credentials not configured"}

    try:
        razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret))

        # Razorpay expects amount in paise
        order_amount = int(order_req.amount * 100)

        # Ensure amount is valid (minimum 100 paise = 1 INR)
        if order_amount < 100:
             return {"error": "Amount must be at least 1 INR"}

        order_data = {
            "amount": order_amount,
            "currency": order_req.currency,
            "payment_capture": 1
        }

        order = razorpay_client.order.create(data=order_data)
        # Inject key_id so frontend doesn't need it as an env var if missing
        order["key_id"] = razorpay_key_id
        return order
    except Exception as e:
        return {"error": str(e)}"""

content = content.replace(create_order_old, create_order_new)

with open('backend/server.py', 'w') as f:
    f.write(content)
