import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Heart, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';
import { supabase } from '../lib/supabase';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', parseInt(id, 10))
          .single();

        if (error) {
          console.error("Error fetching product:", error);
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      // Calculate new rating
      const newReviewsCount = (product.reviews || 0) + 1;
      const currentTotalRating = (product.rating || 0) * (product.reviews || 0);
      const newRating = Math.round((currentTotalRating + reviewRating) / newReviewsCount);

      const { error } = await supabase
        .from('products')
        .update({ rating: newRating, reviews: newReviewsCount })
        .eq('id', parseInt(id, 10));

      if (error) throw error;

      setProduct({ ...product, rating: newRating, reviews: newReviewsCount });
      setReviewText('');
      setReviewRating(5);
      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback.',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      // Simulate success if no table
      if (error.code === '42P01') {
        const newReviewsCount = (product.reviews || 0) + 1;
        const currentTotalRating = (product.rating || 0) * (product.reviews || 0);
        const newRating = Math.round((currentTotalRating + reviewRating) / newReviewsCount);
        setProduct({ ...product, rating: newRating, reviews: newReviewsCount });
        setReviewText('');
        toast({ title: 'Review submitted (Simulated)' });
      } else {
        toast({ title: 'Failed to submit review', description: error.message, variant: 'destructive' });
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    navigate('/checkout', { state: { directPurchase: { product, quantity } } });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-[4/5]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category || 'Luxury Candle'}</p>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < (product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-3">({product.reviews || 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-serif">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="bg-green-400 text-black text-sm font-bold px-3 py-1 rounded">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-bold mb-3">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span><span className="text-gray-700">Premium quality</span></li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span><span className="text-gray-700">Long lasting scent</span></li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="font-bold mb-3 block">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleBuyNow}
                  disabled={product.inStock === false}
                  className="flex-1 bg-black text-white py-4 px-6 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Buy Now</span>
                </button>
                <button className="border border-gray-300 p-4 rounded hover:border-black transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <Link
                to="/cart"
                className="block w-full text-center border-2 border-black text-black py-4 px-6 rounded hover:bg-black hover:text-white transition-all font-medium"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Write a Review Section */}
        <div className="mt-16 bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-serif mb-6">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                className="w-full border border-gray-300 rounded p-3 focus:ring-black focus:border-black"
                rows="4"
                placeholder="Tell us what you think about this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmittingReview}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;