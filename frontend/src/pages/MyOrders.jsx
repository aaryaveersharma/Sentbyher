import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Circle } from 'lucide-react';
import { format } from 'date-fns';

const MyOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login form state for inline login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchOrders();

    // Subscribe to real-time updates for orders
    const channel = supabase
      .channel('public:orders')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_email=eq.${user.email}`,
        },
        (payload) => {
          setOrders((currentOrders) =>
            currentOrders.map((order) =>
              order.id === payload.new.id ? payload.new : order
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code !== '42P01') {
          console.error('Error fetching orders:', error);
        }
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Auth context will automatically update `user`, triggering fetchOrders
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const renderStatusTracker = (status) => {
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIdx = statuses.indexOf(status?.toLowerCase() || 'pending');

    return (
      <div className="mt-6 flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>

        {/* Active Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#22c55e] -z-10 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentIdx / (statuses.length - 1)) * 100}%` }}
        ></div>

        {statuses.map((s, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${isCompleted ? 'bg-[#22c55e] border-white shadow-sm' : 'bg-white border-gray-200'}`}>
                {isCompleted ? <Check size={20} className="text-white" strokeWidth={3} /> : <Circle size={10} className="text-gray-300" fill="currentColor" />}
              </div>
              <p className={`mt-2 text-xs font-bold tracking-wider ${isCompleted ? 'text-[#22c55e]' : 'text-gray-400'}`}>
                {s.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Delivered</span>;
      case 'shipped': return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm">Shipped</span>;
      case 'confirmed': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">Confirmed</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">Pending</span>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-sm w-full max-w-md">
            <h1 className="text-3xl font-serif mb-2 text-center">Track Orders</h1>
            <p className="text-gray-500 mb-6 text-center">Please login to view your orders.</p>
            {loginError && <p className="text-red-500 mb-4 text-sm text-center">{loginError}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit" disabled={isLoggingIn}
                className="w-full bg-black text-white py-3 rounded mt-4 hover:bg-gray-800 transition"
              >
                {isLoggingIn ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <p className="text-sm tracking-widest text-[#a65d57] mb-2 uppercase font-medium">Track your orders</p>
        <h1 className="text-4xl font-serif mb-10 text-gray-900">My Orders</h1>

        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 text-center rounded shadow-sm">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const orderItems = order.items || [];
              const itemsCount = orderItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

              return (
                <div key={order.id} className="bg-white p-6 rounded shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="text-lg font-serif">Order #{order.id.substring(0,8).toUpperCase()}</p>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.created_at), "d MMM yyyy, hh:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xl font-bold">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{itemsCount || 1} items</p>
                  </div>

                  {renderStatusTracker(order.status)}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
