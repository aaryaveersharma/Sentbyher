import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-24 h-24" />
          </div>

          <h1 className="text-3xl font-serif mb-4 text-gray-900">Order Placed Successfully!</h1>

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've received your order and are getting it ready.
            You can track your order status in the My Orders section.
          </p>

          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors font-medium"
          >
            Keep Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
