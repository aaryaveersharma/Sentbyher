import React from 'react';

const BrandIntroduction = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Brand Introduction – Sent By Her
          </h2>
          <p className="mt-4 text-xl text-gray-500 italic">
            Light up every moment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:p-16">
            <div className="prose prose-lg mx-auto text-gray-500">
              <p className="mb-6 leading-relaxed">
                <strong className="text-gray-900 font-semibold">Sent By Her</strong> is a luxury gifting brand built on emotion, understanding, and intention. Founded by three young creators, we believe that every feeling deserves to be expressed in the right way—without overthinking or waiting for the perfect words.
              </p>

              <p className="mb-8 leading-relaxed">
                What makes us different is our instinct to understand what you need, even when you don't say it. Every product is thoughtfully curated to reflect emotions, preferences, and moments that matter. Because sometimes, you don't need a shoulder—you just need something that truly understands you. And that's exactly what we send.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-gray-100 pt-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Mission</h3>
                  <p className="leading-relaxed">
                    To help people express their emotions effortlessly through thoughtful, premium gifts that feel personal and truly understood.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Vision</h3>
                  <p className="leading-relaxed">
                    To become a go-to luxury brand that connects deeply with emotions and turns everyday moments into something meaningful and memorable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIntroduction;