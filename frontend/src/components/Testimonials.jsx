import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "It doesn't feel like a showroom candle. It feels like something chosen with care, and that made me love it even more.",
      author: "Priya M."
    },
    {
      id: 2,
      rating: 5,
      text: "The colours, the texture, the softness of the scent — everything feels calm and beautifully human.",
      author: "Sarah L."
    }
  ];

  return (
    <div className="py-16 bg-[#F5F2EB]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">
          A softer kind of luxury
        </h2>

        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 shadow-sm text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#C8AA82] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-lg md:text-xl font-serif leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <p className="text-gray-800 font-serif">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
