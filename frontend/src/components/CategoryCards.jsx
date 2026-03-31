import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    subtitle: 'Premium Fragrance',
    title: 'Scented Candles',
    image: 'https://images.unsplash.com/photo-1602874801006-95ad9f5fe4ce?w=500',
  },
  {
    id: 2,
    subtitle: 'Comfort at Peak',
    title: 'Aromatherapy',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500',
  },
  {
    id: 3,
    subtitle: 'Luxury & Elegance',
    title: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1615738302067-c1e5a8c1f138?w=500',
  },
];

const CategoryCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className="flex flex-col items-center p-8 text-center">
              <p className="text-sm text-gray-500 mb-2 font-medium">{category.subtitle}</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 group-hover:text-gray-700 transition-colors duration-300">
                {category.title}
              </h3>
              <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <button className="flex items-center space-x-2 text-sm font-medium hover:gap-3 transition-all duration-300 group">
                <span>Read More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;