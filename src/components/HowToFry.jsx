import React, { useState } from 'react';
import { Flame, Wind, Sparkles } from 'lucide-react';

export default function HowToFry() {
  const [method, setMethod] = useState('stovetop'); // 'stovetop' or 'airfryer'

  return (
    <section id="how-to-prepare" className="py-14 sm:py-20 bg-white border-b border-[#e2ebe5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164e3d] font-1 tracking-tight">
            How to Fry Marcha Kashri
          </h2>
          <p className="text-[#55695f] text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Our sun dried delicacies have zero moisture and cook in seconds. Follow these quick steps for a golden, crunchy bite without burning.
          </p>

          {/* Cooking Method Toggle */}
          <div className="inline-flex p-1 bg-[#f8faf8] rounded-2xl border border-[#e2ebe5] mt-6">
            <button
              onClick={() => setMethod('stovetop')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                method === 'stovetop'
                  ? 'bg-[#164e3d] text-white'
                  : 'text-[#182620] hover:text-[#164e3d]'
              }`}
            >
              <Flame className="w-4 h-4 text-[#c27803]" />
              <span>Stovetop Flash Fry (20s)</span>
            </button>

            <button
              onClick={() => setMethod('airfryer')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                method === 'airfryer'
                  ? 'bg-[#164e3d] text-white'
                  : 'text-[#182620] hover:text-[#164e3d]'
              }`}
            >
              <Wind className="w-4 h-4 text-[#c27803]" />
              <span>Air Fryer Mode (3 mins)</span>
            </button>
          </div>
        </div>

        {/* Steps Display */}
        {method === 'stovetop' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden group hover:border-[#164e3d] transition-colors">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none group-hover:text-[#c8ded4] transition-colors">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold text-lg mb-4">
                🔥
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Heat Oil to Medium
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Add 2 to 3 tablespoons of groundnut or mustard oil in a small pan. Heat on medium flame. Never use smoking hot oil to prevent scorching delicate spices.
              </p>
              <div className="mt-4 pt-3 border-t border-[#e2ebe5] text-[11px] text-[#164e3d] font-semibold">
                💡 Tip: Drop a tiny test piece; it should rise to the top within 2 seconds.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden group hover:border-[#164e3d] transition-colors">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none group-hover:text-[#c8ded4] transition-colors">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#fdf6e9] text-[#c27803] flex items-center justify-center font-bold text-lg mb-4">
                ⏱️
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Flash Fry in 20 to 30 Seconds
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Slide the kashri pieces into the oil. Swirl gently with a slotted spoon. In 20 to 30 seconds, they will puff up and turn an appetizing golden hue.
              </p>
              <div className="mt-4 pt-3 border-t border-[#e2ebe5] text-[11px] text-[#c27803] font-semibold">
                ⚡ Time Saver: Remove immediately before color turns dark brown.
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden group hover:border-[#164e3d] transition-colors">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none group-hover:text-[#c8ded4] transition-colors">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold text-lg mb-4">
                🍛
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Drain and Relish Hot
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Transfer onto kitchen paper. The residual heat finishes the crisping. Serve hot alongside piping hot Khichdi, Kadhi, Dal Bhat, or as a crunchy tea snack.
              </p>
              <div className="mt-4 pt-3 border-t border-[#e2ebe5] text-[11px] text-[#164e3d] font-semibold">
                ✨ Pro Touch: Dust with a pinch of chaat masala if desired.
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Air Fryer Step 1 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold text-lg mb-4">
                🌬️
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Preheat to 175 Degrees
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Set your air fryer to 175 degrees Celsius or 350 degrees Fahrenheit for 2 minutes to preheat evenly.
              </p>
            </div>

            {/* Air Fryer Step 2 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#fdf6e9] text-[#c27803] flex items-center justify-center font-bold text-lg mb-4">
                🫒
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Light Oil Mist
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Lightly brush or spray half a teaspoon of cold pressed oil over the kashri pieces in a bowl before placing in basket.
              </p>
            </div>

            {/* Air Fryer Step 3 */}
            <div className="bg-[#f8faf8] rounded-3xl p-6 sm:p-8 border border-[#e2ebe5] relative overflow-hidden">
              <span className="text-6xl font-black text-[#eaf2ee] absolute top-4 right-4 pointer-events-none">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold text-lg mb-4">
                ✨
              </div>
              <h3 className="text-lg font-bold text-[#182620] mb-2">
                Air Fry for 3 Minutes
              </h3>
              <p className="text-xs sm:text-sm text-[#55695f] leading-relaxed">
                Air fry for 3 minutes, giving the basket a quick shake at 1.5 minutes. Enjoy an ultra light, 90 percent oil free crunch!
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
