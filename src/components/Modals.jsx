import React, { useState } from 'react';
import { X, Check, Send, ShoppingBag } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

/* 1. Quick View Modal */
export function QuickViewModal({ product, isOpen, onClose }) {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.mainImage || product.image];

  const buyNowUrl = `https://wa.me/918850011652?text=Hello%20Bhagvat%20Prasadam!%20I%20want%20to%20buy%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.gujaratiName)}).%20Please%20share%20details.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain touch-none animate-fade-in">
      <div 
        onClick={onClose}
        className="absolute inset-0 touch-none"
      />
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain p-6 sm:p-8 shadow-2xl border border-[#e2ebe5] z-10">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f8faf8] hover:bg-[#eaf2ee] text-[#182620] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Gallery */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#f8faf8] border border-[#e2ebe5]">
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Buy ${product.name} on Bhagvat Prasadam`}
                className="block w-full h-full cursor-pointer"
              >
                <img
                  src={images[selectedImg] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                      selectedImg === idx ? 'border-[#164e3d] ring-1 ring-[#164e3d]' : 'border-[#e2ebe5] opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-[#164e3d] bg-[#eaf2ee] px-2.5 py-0.5 rounded-full border border-[#c8ded4]">
                  {product.category}
                </span>
                <span className="font-gujarati text-xs font-bold text-[#c27803]">
                  {product.gujaratiName}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#164e3d] font-1 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-[#c27803] font-medium font-2">
                {product.subheading}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#55695f] py-1 border-y border-[#e2ebe5]">
              <span className="font-bold text-[#182620]">Pack Size:</span>
              <span className="bg-[#eaf2ee] text-[#164e3d] font-bold px-2 py-0.5 rounded border border-[#c8ded4]">
                {product.weight}
              </span>
              <span className="ml-auto font-medium">100% Sun Dried</span>
            </div>

            <p className="text-xs text-[#55695f] leading-relaxed">
              {product.description}
            </p>

            {/* Ingredients preview */}
            <div className="pt-2 border-t border-[#e2ebe5]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#164e3d] mb-1.5">
                Key Ingredients:
              </p>
              <div className="flex flex-wrap gap-1">
                {product.ingredients.slice(0, 4).map((ing, i) => (
                  <span key={i} className="text-[10px] bg-[#f8faf8] border border-[#e2ebe5] text-[#182620] px-2 py-0.5 rounded">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* ONLY Buy Now Button */}
            <div className="pt-3">
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#164e3d] hover:bg-[#113e30] text-white py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* 2. Bulk Order / Catering Modal */
export function BulkOrderModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    purpose: 'Restaurant / Catering',
    quantity: '5kg to 10kg',
    notes: ''
  });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*Bulk Order Inquiry, Kashri*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Purpose:* ${encodeURIComponent(form.purpose)}%0A*Estimated Quantity:* ${encodeURIComponent(form.quantity)}%0A*Notes:* ${encodeURIComponent(form.notes || 'None')}`;
    window.open(`https://wa.me/918850011652?text=${msg}`, '_blank');
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain touch-none animate-fade-in">
      <div onClick={onClose} className="absolute inset-0 touch-none" />
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto overscroll-contain p-6 sm:p-8 shadow-2xl border border-[#e2ebe5] z-10">
        
        <button
          onClick={onClose}
          aria-label="Close bulk order modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f8faf8] hover:bg-[#eaf2ee] text-[#182620] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold">
                📦
              </div>
              <div>
                <h3 className="font-1 text-xl font-bold text-[#182620] leading-snug">
                  Bulk and Commercial Inquiries
                </h3>
                <p className="text-xs text-[#55695f]">
                  Direct inquiries for restaurants, weddings and international exports
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#182620] mb-1">Your Name / Business Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ramesh Patel / Swaminarayan Dining Hall"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2ebe5] text-xs focus:border-[#164e3d] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#182620] mb-1">Mobile / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2ebe5] text-xs focus:border-[#164e3d] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#182620] mb-1">Order Purpose</label>
                <select
                  value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e2ebe5] text-xs focus:border-[#164e3d] outline-none bg-white"
                >
                  <option>Restaurant / Catering</option>
                  <option>Wedding / Event Gift</option>
                  <option>International Diaspora Export</option>
                  <option>Retail Store Distribution</option>
                  <option>Family Year Round Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#182620] mb-1">Estimated Quantity</label>
                <select
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e2ebe5] text-xs focus:border-[#164e3d] outline-none bg-white"
                >
                  <option>2kg to 5kg</option>
                  <option>5kg to 10kg</option>
                  <option>10kg to 25kg</option>
                  <option>25kg to 50kg+</option>
                  <option>100kg+ Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#182620] mb-1">Specific Varieties Needed</label>
              <textarea
                rows="2"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. 5kg Vadhvani Marcha, 3kg Bhinda Kachri..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#e2ebe5] text-xs focus:border-[#164e3d] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#164e3d] hover:bg-[#113e30] text-white py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit and Open WhatsApp Inquiry</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#182620] text-lg">Inquiry Dispatched!</h4>
            <p className="text-xs text-[#55695f] max-w-xs mx-auto">
              Our bulk order team will respond promptly on WhatsApp.
            </p>
            <button
              onClick={onClose}
              className="bg-[#164e3d] text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* 3. Comprehensive Policy Modal */
export function PolicyModal({ type, isOpen, onClose }) {
  if (!isOpen || !type) return null;

  const contentMap = {
    return: {
      title: 'Return and Replacement Policy',
      effectiveDate: '01/01/2026',
      body: `
        <h3>Eligibility for Return or Replacement</h3>
        <p>At Bhagvat Prasadam, your satisfaction and food safety are our highest priorities. Because our Kashri products are perishable food items prepared naturally without chemical preservatives, please ensure the following:</p>
        <ul>
          <li>The package must be unopened and in its original sealed food grade packaging.</li>
          <li>You must initiate the inquiry within <strong>2 days</strong> from the date of confirmed delivery.</li>
        </ul>
        
        <h3>Damaged or Defective Items</h3>
        <p>If you receive a package that was damaged during transit, photograph the package and WhatsApp our customer support immediately at <strong>+91 88500 11652</strong> or email <strong>support@bhagvatprasadam.com</strong>. We will arrange a free replacement.</p>
      `
    },
    shipping: {
      title: 'Shipping Policy',
      effectiveDate: '01/01/2026',
      body: `
        <h3>All India Delivery</h3>
        <p>We deliver authentic Gujarati Kashri to over 25,000 pincodes across all Indian states and Union Territories via express courier partners.</p>
        
        <h3>Processing and Dispatch Time</h3>
        <p>Orders are packed and dispatched promptly from our Saurashtra facility. Standard delivery times are 2 to 4 days for Gujarat and Maharashtra and 4 to 6 days for other states.</p>
      `
    },
    terms: {
      title: 'Terms and Conditions',
      effectiveDate: '01/01/2026',
      body: `
        <h3>Overview</h3>
        <p>This website is operated by Bhagvat Prasadam. Throughout the site, the terms "we", "us" and "our" refer to Bhagvat Prasadam. We offer this website, including all information and services available to you conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.</p>
        
        <h3>Product Authenticity and Natural Variance</h3>
        <p>Our kashri varieties are 100% agricultural products dried using natural sun heat. Minor natural variations in color, spice intensity, or slice size reflect pure artisanal craftsmanship and seasonal crop yield.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      effectiveDate: '01/01/2026',
      body: `
        <h3>Commitment to Privacy</h3>
        <p>Bhagvat Prasadam is deeply committed to safeguarding the privacy and personal details of all our patrons. We never sell, rent, or trade your contact information, phone numbers, or delivery addresses to third party marketing brokers.</p>
        
        <h3>Information Collected</h3>
        <p>Information collected (such as name, phone number, address) is used strictly for fulfilling your order inquiry and providing delivery updates.</p>
      `
    }
  };

  const current = contentMap[type] || contentMap.return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain touch-none animate-fade-in">
      <div onClick={onClose} className="absolute inset-0 touch-none" />
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto overscroll-contain p-6 sm:p-8 shadow-2xl border border-[#e2ebe5] z-10">
        
        <button
          onClick={onClose}
          aria-label="Close policy modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f8faf8] hover:bg-[#eaf2ee] text-[#182620] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#e2ebe5] pb-4 mb-4">
          <h2 className="text-2xl font-bold text-[#164e3d] font-1">
            {current.title}
          </h2>
          <p className="text-xs text-[#55695f] mt-1">
            Effective Date: {current.effectiveDate}, Bhagvat Prasadam
          </p>
        </div>

        <div 
          className="prose prose-sm text-[#182620] leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: current.body }}
        />

        <div className="pt-6 border-t border-[#e2ebe5] mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#164e3d] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
