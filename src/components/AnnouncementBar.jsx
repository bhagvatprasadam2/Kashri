import React from 'react';
import { Sparkles, Truck, Sun } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function AnnouncementBar({ onOpenBulkOrder }) {
  return (
    <div className="bg-[#164e3d] text-white text-xs sm:text-sm font-medium py-2.5 px-4 border-b border-[#113e30]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">

          <p className="flex items-center gap-1.5 flex-wrap justify-center text-[#eaf2ee]">
            <Sun className="w-3.5 h-3.5 text-[#c27803] inline" />
            <span>Authentic Sun Dried Marcha Kashri and Kathiyawadi Delicacies | 100% Natural, Preservative Free</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="hidden md:flex items-center gap-1 text-[#eaf2ee]">
            <Truck className="w-3.5 h-3.5 text-[#c27803]" />
            Express Shipping Across India
          </span>

          <a
            href="https://wa.me/918850011652?text=Hello%20Bhagvat%20Prasadam!%20I%20am%20interested%20in%20buying%20Traditional%20Gujarati%20Kashri."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[#eaf2ee] hover:text-[#c27803] transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#c27803]" />
            +91 88500 11652
          </a>
        </div>
      </div>
    </div>
  );
}
