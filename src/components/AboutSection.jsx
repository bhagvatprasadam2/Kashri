import React from 'react';
import { Sun, Sparkles, Users } from 'lucide-react';
import { TRUST_STATS } from '../data/products';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-14 sm:py-20 bg-white border-b border-[#e2ebe5]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <h2 className="font-1 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164e3d] tracking-tight leading-tight">
            Traditional Gujarati Kashri, Made the Authentic Way
          </h2>

          <p className="font-2 text-xl sm:text-2xl text-[#c27803] mt-2 font-medium">
            Handcrafted with 50 Years of Saurashtra Solar Curing Heritage
          </p>

          <p className="text-[#55695f] leading-relaxed text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            For generations across Saurashtra, summers meant curing fresh green chillies and vegetables under the warm sun. At Bhagvat Prasadam, we follow that same grandmother's recipe with fresh local produce, cultured buttermilk, turmeric, and rock salt. No machines, no chemical preservatives, just honest homemade taste for your family thali.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Card with Floating Trust Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#e2ebe5] bg-[#f8faf8] p-3">
                <a
                  href="https://www.bhagvatprasadam.com/products/bharela-marcha-ભરેલા-મરચા-stuffed-green-chilli-traditional-delicacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Bharela Marcha on Bhagvat Prasadam"
                  className="block w-full h-full cursor-pointer"
                >
                  <img
                    src="https://cdn.shopify.com/s/files/1/0673/6723/9829/files/bharela-marcha.jpg?v=1782468225"
                    alt="Traditional Kashri Making Heritage"
                    className="w-full h-[380px] sm:h-[440px] object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
                  />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Feature Pillars & Philosophy */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5] hover:border-[#164e3d] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  ☀️
                </div>
                <h4 className="font-bold text-[#182620] text-sm mb-1.5">
                  Naturally Sun Cured
                </h4>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  Patiently dried under open Gujarat sunshine to lock in natural flavor and crisp crunch without dehydrators.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5] hover:border-[#164e3d] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#fdf6e9] text-[#c27803] flex items-center justify-center font-bold mb-3">
                  🌿
                </div>
                <h4 className="font-bold text-[#182620] text-sm mb-1.5">
                  Pure and Simple
                </h4>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  Prepared simply with fresh vegetables, natural rock salt, turmeric, and cultured buttermilk. Zero preservatives.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5] hover:border-[#164e3d] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  👵
                </div>
                <h4 className="font-bold text-[#182620] text-sm mb-1.5">
                  50 Year Heritage
                </h4>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  The authentic Kathiyawadi recipe and spice blend passed down through three generations in Surendranagar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5] hover:border-[#164e3d] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#fdf6e9] text-[#c27803] flex items-center justify-center font-bold mb-3">
                  📦
                </div>
                <h4 className="font-bold text-[#182620] text-sm mb-1.5">
                  Sealed for Freshness
                </h4>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  Airtight food grade packaging keeps moisture out so every piece stays bone dry until you fry it.
                </p>
              </div>

            </div>

            {/* Quote Block */}
            <div className="p-5 rounded-2xl bg-[#eaf2ee] border-l-4 border-[#164e3d] text-[#164e3d] text-xs sm:text-sm italic leading-relaxed">
              "One small bite of crisp Marcha Kashri brings the simple warmth and nostalgia of a Gujarati home to your plate."
            </div>

          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-14 pt-10 border-t border-[#e2ebe5] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5]">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#164e3d] font-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#182620] mt-1">
                {stat.label}
              </p>
              <p className="text-[11px] text-[#55695f] mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
