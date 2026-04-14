import re

with open('frontend/src/pages/CheckoutPage.jsx', 'r') as f:
    content = f.read()

handleSubmit_old = """  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userEmail = user?.email || formData.email || 'Guest';
    const amountToPay = getDiscountedTotal();

    try {
      const isRazorpayLoaded = await loadRazorpayScript();

      if (!isRazorpayLoaded) {
        toast({ title: 'Payment Failed', description: 'Razorpay SDK failed to load. Are you online?', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const orderResponse = await fetch(`${backendUrl}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountToPay }),
      });

      const orderData = await orderResponse.json();

      if (orderData.error) {
        // Fallback if razorpay is not properly configured on backend, just process the order directly
        console.error("Razorpay backend error:", orderData.error);
        await handlePaymentSuccess(userEmail, amountToPay);
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Sent By Her",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment on backend if needed, but for now just process success
          await handlePaymentSuccess(userEmail, amountToPay);
        },
        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          email: userEmail,
          contact: formData.phone || '',
        },
        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error("Payment setup failed:", err);
      toast({ title: 'Payment Failed', description: 'Could not initialize payment.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };"""

handleSubmit_new = """  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userEmail = user?.email || formData.email || 'Guest';
    const amountToPay = getDiscountedTotal();

    try {
      const isRazorpayLoaded = await loadRazorpayScript();

      if (!isRazorpayLoaded) {
        toast({ title: 'Payment Failed', description: 'Razorpay SDK failed to load. Are you online?', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const orderResponse = await fetch(`${backendUrl}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountToPay }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || orderData.error) {
        console.error("Razorpay backend error:", orderData.error || orderData);
        toast({ title: 'Payment Failed', description: orderData.error || 'Failed to create order. Please try again.', variant: 'destructive' });
        setLoading(false);
        return;
      }

      // The key is returned from the backend to ensure it's always available and correct
      const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID || orderData.key_id;

      if (!razorpayKeyId) {
        console.error("Razorpay key is missing.");
        toast({ title: 'Payment Error', description: 'Payment gateway configuration is missing.', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Sent By Her",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          // Process success
          await handlePaymentSuccess(userEmail, amountToPay);
        },
        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          email: userEmail,
          contact: formData.phone || '',
        },
        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on('payment.failed', function (response){
         console.error("Payment failed event:", response.error);
         toast({ title: 'Payment Failed', description: response.error.description || 'Payment was unsuccessful.', variant: 'destructive' });
      });

      paymentObject.open();

    } catch (err) {
      console.error("Payment setup failed:", err);
      toast({ title: 'Payment Failed', description: err.message || 'Could not initialise payment.', variant: 'destructive' });
    } finally {
      // Don't set loading to false here, otherwise it removes the loading state while the Razorpay modal is open.
      // Let the modal handle the UX flow.
      // setLoading(false);
    }
  };"""

content = content.replace(handleSubmit_old, handleSubmit_new)

with open('frontend/src/pages/CheckoutPage.jsx', 'w') as f:
    f.write(content)
