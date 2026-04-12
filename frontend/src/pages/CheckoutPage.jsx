import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Tag } from 'lucide-react';
import { loadRazorpayScript } from '../utils/loadRazorpay';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user && user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .single();

      if (error || !data) {
        setCouponError('Invalid or expired coupon code.');
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(data);
        setCouponError('');
      }
    } catch (err) {
      console.error(err);
      setCouponError('Error verifying coupon.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const getDiscountedTotal = () => {
    const total = getCartTotal();
    if (appliedCoupon && appliedCoupon.discount_percentage) {
      return total - (total * (appliedCoupon.discount_percentage / 100));
    }
    return total;
  };

  const handlePaymentSuccess = async (userEmail, totalAmount) => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          user_email: userEmail,
          total_amount: totalAmount,
          status: 'pending'
        }]);

      if (error) {
        throw error;
      }

      clearCart();
      navigate('/order-success');
    } catch (err) {
      console.error("Order creation failed:", err);
      if (err.code === '42P01') {
         clearCart();
         navigate('/order-success');
      } else {
         toast({ title: 'Order Failed', description: err.message, variant: 'destructive' });
      }
    }
  };

  const handleSubmit = async (e) => {
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
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 px-6 rounded hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t border-gray-300 pt-6 mb-6">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag size={16} /> Have a coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code here"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                {appliedCoupon && (
                  <div className="mt-2 text-sm text-green-600 flex justify-between items-center bg-green-50 px-3 py-2 rounded">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied!</span>
                    <button type="button" onClick={() => setAppliedCoupon(null)} className="text-gray-500 hover:text-black">Remove</button>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount_percentage}%)</span>
                    <span>-₹{(getCartTotal() * (appliedCoupon.discount_percentage / 100)).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold">₹{getDiscountedTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;