import React from 'react';
import { Sun, HeartHandshake, Leaf, Truck } from 'lucide-react';

export default function HighlightsStrip() {
  const highlights = [
    {
      icon: Sun,
      title: '100% Naturally Sun Dried',
      description: 'Slow dried under the Saurashtra sun without dehydrators or artificial heat',
      badge: 'Natural Sun Heat'
    },
    {
      icon: Leaf,
      title: 'Zero Preservatives',
      description: 'Cured simply with rock salt, cultured buttermilk, and turmeric',
      badge: 'Pure Ingredients'
    },
    {
      icon: HeartHandshake,
      title: "50 Year Family Recipe",
      description: 'The genuine Kathiyawadi flavor enjoyed across generations',
      badge: 'Heritage Taste'
    },
    {
      icon: Truck,
      title: 'Fresh Delivery Across India',
      description: 'Sealed airtight to reach your home completely dry and crisp',
      badge: 'All India Delivery'
    }
  ];

  return (
    <section id="why-kashri" className="py-8 bg-[#f8faf8] border-b border-[#e2ebe5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div 
                key={i} 
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#e2ebe5] shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#164e3d] text-[#c27803] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c27803] bg-[#fdf6e9] border border-[#f5dfb8] px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {h.badge}
                  </span>
                  <h3 className="font-bold text-[#182620] text-sm leading-snug">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#55695f] mt-1 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
