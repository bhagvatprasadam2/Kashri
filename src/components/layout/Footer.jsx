import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import logoImg from '../../assets/logo.webp';

export default function Footer({ onOpenPolicy, onOpenBulkOrder }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    policies: false,
    contact: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/?scrollTo=${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-[#164e3d] text-white border-t border-[#113e30]">
      
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4 pb-2 md:pb-0 border-b border-[#113e30] md:border-none">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Bhagvat Prasadam Heritage Marcha Kachri Logo"
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                className="w-14 h-14 object-contain drop-shadow-sm"
              />
              <div>
                <span className="font-1 text-2xl font-extrabold text-white">
                  KASHRI
                </span>
                <span className="font-gujarati text-sm font-bold text-[#c27803] ml-1.5 bg-[#113e30] px-1.5 py-0.5 rounded border border-[#c27803]/40">
                  કાચરી
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#eaf2ee] font-semibold">
                  Bhagvat Prasadam Heritage
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#eaf2ee] leading-relaxed">
              Buy authentic Gujarati Kashri online from Bhagvat Prasadam Heritage. Discover handcrafted traditional Marcha Kashri, Gujarati sun dried food, and authentic Gujarati food products delivered fresh across India.
            </p>
          </div>

          {/* Quick Links (Dropdown on Small Screen, Column on Desktop) */}
          <div className="lg:col-span-3 space-y-3 pb-2 md:pb-0 border-b border-[#113e30] md:border-none">
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              aria-expanded={Boolean(openSections.quickLinks)}
              className="w-full flex items-center justify-between text-left py-1 md:py-0 cursor-pointer group"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#c27803]">
                Quick Links
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#c27803] transition-transform duration-200 md:hidden ${
                  openSections.quickLinks ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={`${openSections.quickLinks ? 'block pt-1 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2 text-xs sm:text-sm text-[#eaf2ee]">
                <li>
                  <button onClick={() => scrollTo('hero')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Our Products (All 7 Varieties)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('why-kashri')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Why Sun Dried Kashri?
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('how-to-prepare')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    How to Fry and Air Fry
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('about')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Our Heritage and Story
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('blog-section')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Blogs and Recipes
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('faq-section')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button onClick={onOpenBulkOrder} className="hover:text-white transition-colors cursor-pointer font-semibold text-[#c27803] text-left">
                    Bulk and Catering Orders ↗
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Policies (Dropdown on Small Screen, Column on Desktop) */}
          <div className="lg:col-span-2 space-y-3 pb-2 md:pb-0 border-b border-[#113e30] md:border-none">
            <button
              type="button"
              onClick={() => toggleSection('policies')}
              aria-expanded={Boolean(openSections.policies)}
              className="w-full flex items-center justify-between text-left py-1 md:py-0 cursor-pointer group"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#c27803]">
                Policies
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#c27803] transition-transform duration-200 md:hidden ${
                  openSections.policies ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={`${openSections.policies ? 'block pt-1 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2 text-xs sm:text-sm text-[#eaf2ee]">
                <li>
                  <button onClick={() => onOpenPolicy('terms')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenPolicy('shipping')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenPolicy('return')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Return Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenPolicy('privacy')} className="hover:text-[#c27803] transition-colors cursor-pointer text-left">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details (Dropdown on Small Screen, Column on Desktop) */}
          <div className="lg:col-span-3 space-y-3 pb-2 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('contact')}
              aria-expanded={Boolean(openSections.contact)}
              className="w-full flex items-center justify-between text-left py-1 md:py-0 cursor-pointer group"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#c27803]">
                Contact Info
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#c27803] transition-transform duration-200 md:hidden ${
                  openSections.contact ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={`${openSections.contact ? 'block pt-1 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <div className="space-y-2.5 text-xs text-[#eaf2ee]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c27803] flex-shrink-0 mt-0.5" />
                  <span>Bhagvat Prasadam, Saurashtra & Surat, Gujarat 394107, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c27803] flex-shrink-0" />
                  <a href="tel:+918850011652" className="hover:text-[#c27803] font-semibold">
                    +91 88500 11652
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c27803] flex-shrink-0" />
                  <a href="mailto:support@bhagvatprasadam.com" className="hover:text-[#c27803] font-semibold">
                    support@bhagvatprasadam.com
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-[11px] text-[#eaf2ee]/80">
                    Business Hours: Monday to Saturday (9:00 AM to 7:00 PM IST)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Mobile App Promotion Bar (Matching Exact Footer Background) */}
      <div className="w-full border-t border-[#113e30] bg-[#164e3d] py-1.5 sm:py-2 px-3 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2.5 text-center">
            {/* Desktop Typography */}
            <span className="hidden sm:inline text-xs font-semibold text-[#eaf2ee]">
              Install <strong className="font-bold text-white">Bhagvat Prasadam</strong> App &amp; Get{' '}
              <span className="font-bold text-[#FFE899] underline decoration-[#FFE899]/60 underline-offset-2">
                2% Extra Discount
              </span>{' '}
              on App!
            </span>
            <span className="hidden sm:inline text-xs font-medium text-[#eaf2ee]/80">
              Available on:
            </span>

            {/* Mobile Typography (Compact so both buttons fit on 1 single line on 360px screens) */}
            <span className="sm:hidden text-[11px] font-semibold text-[#eaf2ee]">
              Install App &amp; Get <span className="font-bold text-[#FFE899]">2% Off:</span>
            </span>

            {/* Play Store & App Store Pill Badges */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
              <a
                href="https://play.google.com/store/apps/details?id=in.sellonapp.bhagvatprasadam&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Google Play Store (opens in new tab)"
                className="bg-black hover:bg-neutral-800 text-white rounded-full inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.296 2.296 0 0 1 3 20.575V3.425c0-.623.226-1.196.609-1.611z" fill="#00E676" />
                  <path d="M17.207 8.586L5.05 1.57A2.28 2.28 0 0 0 3.61 1.814l10.184 10.185 3.413-3.413z" fill="#FFD600" />
                  <path d="M3.61 22.186c.427.351.983.473 1.44.244l12.157-7.016-3.414-3.414L3.61 22.186z" fill="#FF3D00" />
                  <path d="M21.577 11.127l-4.37-2.541-3.414 3.414 3.414 3.414 4.37-2.541a1.004 1.004 0 0 0 0-1.746z" fill="#00B0FF" />
                </svg>
                <span>Play Store</span>
              </a>

              <a
                href="https://apps.apple.com/in/app/bhagvat-prasadam/id6751397354"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Apple App Store (opens in new tab)"
                className="bg-black hover:bg-neutral-800 text-white rounded-full inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.7-11.72-13.97-6.3-9.5-11.11-20.4-14.42-32.69-3.32-12.28-4.97-23.77-4.97-34.46 0-15.01 3.8-27.42 11.41-37.22 7.61-9.79 17.06-14.78 28.36-14.97 4.58 0 9.8 1.15 15.66 3.44 5.86 2.3 9.79 3.52 11.79 3.67 1.63 0 5.73-1.32 12.31-3.95 6.58-2.63 12.1-3.79 16.57-3.48 12.28.98 22.19 5.48 29.74 13.51-10.76 6.52-16.03 15.54-15.82 27.05.22 8.91 3.59 16.41 10.11 22.5 6.53 6.09 14.13 9.78 22.82 11.09-2.07 6.3-4.57 12.72-7.51 19.27zM119.22 33.15c0-7.39 2.66-14.34 7.99-20.86 5.33-6.52 11.96-10.65 19.89-12.29.22 1.3.33 2.45.33 3.44 0 7.39-2.82 14.4-8.47 21.03-5.65 6.63-12.39 10.6-20.21 11.89-.11-1.08-.16-2.16-.16-3.21z" />
                </svg>
                <span>App Store</span>
              </a>
            </div>
        </div>
      </div>

      {/* Bottom copyright & attribution */}
      <div className="w-full border-t border-[#113e30] bg-[#164e3d] py-2.5 sm:py-3 px-4 sm:px-6 text-xs text-[#eaf2ee]/80 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            © {currentYear} <strong>Marcha Kashri and Gujarati Delicacies</strong> by <strong>Bhagvat Prasadam Heritage</strong>, All Rights Reserved.
          </p>
          <p className="text-[#eaf2ee]/70">
            Powered by <strong className="text-white">Megascale</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
