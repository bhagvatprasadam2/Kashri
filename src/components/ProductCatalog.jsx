import React, { useState } from 'react';
import { Star, Eye, Flame, Sparkles, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function ProductCatalog({ products, onSelectProduct, onQuickView }) {
  const [activeCategory, setActiveCategory] = useState("All Varieties");

  const filteredProducts = activeCategory === "All Varieties"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="product-section" className="py-14 sm:py-20 bg-[#f8faf8] border-b border-[#e2ebe5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#eaf2ee] text-[#164e3d] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#c8ded4]">
            <Sparkles className="w-3.5 h-3.5 text-[#c27803]" />
            <span>Complete Traditional Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164e3d] font-1 tracking-tight">
            Our Authentic Marcha Kashri and Sun Dried Collection
          </h2>
          <p className="text-[#55695f] text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Explore 7 handcrafted Kathiyawadi sun dried varieties from fiery buttermilk cured Vadhvani Marcha to crispy Okra, Bitter Gourd, and wild Kothimba.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#164e3d] text-white'
                    : 'bg-white text-[#182620] hover:bg-[#eaf2ee] border border-[#e2ebe5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const buyNowUrl = `https://wa.me/918850011652?text=Hello%20Bhagvat%20Prasadam!%20I%20want%20to%20buy%20${encodeURIComponent(p.name)}%20(${encodeURIComponent(p.gujaratiName)}).%20Please%20share%20details.`;

            return (
              <div
                key={p.id}
                className="group bg-white rounded-3xl border border-[#e2ebe5] hover:border-[#164e3d] transition-colors flex flex-col justify-between overflow-hidden shadow-xs"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square overflow-hidden bg-[#f8faf8] p-1.5 border-b border-[#e2ebe5]">
                    <a
                      href={p.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Buy ${p.name} on Bhagvat Prasadam`}
                      className="block w-full h-full cursor-pointer"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                    
                    {/* Gujarati Name Pill */}
                    <div className="absolute top-5 left-5 bg-white px-2.5 py-1 rounded-lg text-xs font-bold font-gujarati text-[#c27803] border border-[#e2ebe5]">
                      {p.gujaratiName}
                    </div>

                    {/* Weight Pill */}
                    <div className="absolute top-5 right-5 bg-white text-[#164e3d] text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#e2ebe5]">
                      {p.weight}
                    </div>

                    {/* Quick View Floating Button on Hover */}
                    <button
                      onClick={() => onQuickView(p)}
                      aria-label={`Quick view ${p.name}`}
                      className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-white text-[#164e3d] border border-[#e2ebe5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#eaf2ee] cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    
                    {/* Rating & Spice */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[#c27803]">
                        <Star className="w-3.5 h-3.5 fill-[#c27803] text-[#c27803]" />
                        <span className="font-bold text-[#182620]">{p.rating}</span>
                        <span className="text-[#55695f]">({p.reviewsCount})</span>
                      </div>

                      <div className="flex items-center gap-0.5">
                        <span className="text-[10px] text-[#55695f] font-medium mr-1">Spice:</span>
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <Flame
                            key={lvl}
                            className={`w-3 h-3 ${
                              lvl <= p.spiceLevel ? 'text-[#c27803] fill-[#c27803]' : 'text-[#e2ebe5]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-1 text-lg font-bold text-[#182620] group-hover:text-[#164e3d] transition-colors leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#55695f] mt-0.5 line-clamp-1">
                        {p.tagline}
                      </p>
                    </div>

                    {/* Pairing Tip */}
                    <div className="text-[11px] bg-[#eaf2ee] text-[#164e3d] px-2.5 py-1 rounded-lg border border-[#c8ded4] flex items-center gap-1">
                      <span>🍛</span>
                      <span className="truncate">Pairs with: <strong>{p.bestPairings[0]}</strong></span>
                    </div>

                  </div>
                </div>

                {/* Bottom Action Row: Only Buy Now Button */}
                <div className="p-5 pt-0 border-t border-[#e2ebe5] mt-2">
                  <div className="pt-3">
                    <a
                      href={p.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#164e3d] hover:bg-[#113e30] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-xs hover:shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Buy Now</span>
                    </a>
                  </div>

                  {/* Inspect Details Link */}
                  <button
                    onClick={() => {
                      onSelectProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-center text-[11px] text-[#164e3d] hover:underline font-semibold mt-2.5 cursor-pointer"
                  >
                    View Details in Interactive Hero ↗
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
