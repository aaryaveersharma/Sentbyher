import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Products</h2>
        <div className="flex justify-center space-x-6 text-sm font-medium">
          <button className="border-b-2 border-black pb-2">CANDLE COLLECTION</button>
          <button className="text-gray-500 hover:text-black pb-2 transition-colors duration-200">
            NEW COLLECTION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-gray-50 aspect-[4/5]">
              {product.discount && (
                <div className="absolute top-4 left-4 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded z-10">
                  -{product.discount}%
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </Link>

            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300 min-h-[56px]">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Add to Cart Button - Push to bottom */}
              <div className="mt-auto">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;