import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  // Product Form State
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productAdding, setProductAdding] = useState(false);
  const [productMessage, setProductMessage] = useState({ type: '', text: '' });

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist yet, that's okay for initial setup
          console.log('Orders table does not exist yet');
          setOrders([]);
        } else {
          console.error("Error fetching orders:", error);
        }
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductAdding(true);
    setProductMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice),
            image: productImage
          }
        ]);

      if (error) throw error;

      setProductMessage({ type: 'success', text: 'Product added successfully!' });
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
    } catch (err) {
      console.error("Error adding product:", err);
      if (err.code === '42P01') {
         setProductMessage({ type: 'error', text: 'Products table does not exist in Supabase yet.' });
      } else {
         setProductMessage({ type: 'error', text: err.message });
      }
    } finally {
      setProductAdding(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update status: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Admin Panel</h1>
          <button onClick={handleLogout} className="text-sm underline text-gray-600 hover:text-black">
            Exit Admin
          </button>
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('products')}
          >
            Add Products
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            Manage Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded shadow-sm max-w-2xl">
            <h2 className="text-xl font-serif mb-4">Add New Product</h2>
            {productMessage.text && (
              <div className={`mb-4 p-3 rounded ${productMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {productMessage.text}
              </div>
            )}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text" required value={productName} onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-black h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number" step="0.01" required value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url" required value={productImage} onChange={(e) => setProductImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <button
                type="submit" disabled={productAdding}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {productAdding ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-serif mb-4">Manage Orders</h2>
            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{order.id.substring(0,8)}...</td>
                        <td className="py-3 px-4">{order.user_email || 'Guest'}</td>
                        <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">${parseFloat(order.total_amount).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status || 'pending'}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="text-sm border rounded p-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
