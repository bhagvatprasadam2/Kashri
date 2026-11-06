import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Phone, Mail, MapPin, ShieldCheck, ChevronDown } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/logo.png';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4 pb-2 md:pb-0 border-b border-[#113e30] md:border-none">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Bhagvat Prasadam Heritage Marcha Kachri Logo"
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
              Authentic Kathiyawadi Marcha Kashri and sun dried delicacies from Saurashtra. Handcrafted with cultured buttermilk, turmeric, and pure rock salt without artificial preservatives.
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



        {/* Bottom copyright & attribution */}
        <div className="mt-8 pt-6 border-t border-[#113e30] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#eaf2ee]/80">
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
