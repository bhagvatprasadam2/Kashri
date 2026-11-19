import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  Check, 
  Truck, 
  ShieldCheck, 
  Utensils, 
  Package, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  Flame,
  MessageCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ProductPage({ onOpenBulkOrder, onOpenPolicy }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug or legacy ID
  const product = PRODUCTS.find(
    (p) => p.seo?.slug === slug || p.id === slug || p.seo?.legacyId === slug
  ) || PRODUCTS[0];

  const seo = useMemo(() => product.seo || {}, [product]);
  const details = useMemo(() => seo.structuredDetails || {}, [seo]);
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  const [selectedPack, setSelectedPack] = useState('100gm');
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic SEO injection on mount & change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Meta Title
    const pageTitle = seo.metaTitle || `${product.name} | Kashri`;
    document.title = pageTitle;

    // Canonical Link
    const currentCanonical = `https://kashri.megascale.co.in${seo.url || `/products/${product.id}`}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink ? canonicalLink.getAttribute('href') : 'https://kashri.megascale.co.in/';
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentCanonical);
    }

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc && seo.metaDescription) {
      metaDesc.setAttribute('content', seo.metaDescription);
    }

    // Dynamic Product Schema.org JSON-LD
    let scriptTag = document.getElementById('product-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'product-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          '@id': `${currentCanonical}#product`,
          'name': seo.h1 || product.name,
          'image': `https://kashri.megascale.co.in/${seo.imageFilename || 'vadhvani-transparent.webp'}`,
          'description': seo.metaDescription || product.description,
          'sku': product.id,
          'brand': {
            '@type': 'Brand',
            'name': 'Bhagvat Prasadam Heritage'
          },
          'offers': {
            '@type': 'Offer',
            'url': product.productUrl,
            'priceCurrency': 'INR',
            'price': seo.price || '149',
            'availability': 'https://schema.org/InStock',
            'itemCondition': 'https://schema.org/NewCondition',
            'priceValidUntil': '2027-12-31',
            'seller': {
              '@type': 'Organization',
              'name': 'Bhagvat Prasadam Heritage'
            },
            'hasMerchantReturnPolicy': {
              '@type': 'MerchantReturnPolicy',
              'applicableCountry': 'IN',
              'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
              'merchantReturnDays': 7,
              'returnMethod': 'https://schema.org/ReturnByMail',
              'returnFees': 'https://schema.org/FreeReturn'
            },
            'shippingDetails': {
              '@type': 'OfferShippingDetails',
              'shippingRate': {
                '@type': 'MonetaryAmount',
                'value': '0',
                'currency': 'INR'
              },
              'shippingDestination': {
                '@type': 'DefinedRegion',
                'addressCountry': 'IN'
              },
              'deliveryTime': {
                '@type': 'ShippingDeliveryTime',
                'handlingTime': {
                  '@type': 'QuantitativeValue',
                  'minValue': 0,
                  'maxValue': 1,
                  'unitCode': 'DAY'
                },
                'transitTime': {
                  '@type': 'QuantitativeValue',
                  'minValue': 2,
                  'maxValue': 5,
                  'unitCode': 'DAY'
                }
              }
            }
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': product.rating ? String(product.rating) : '5.0',
            'bestRating': '5',
            'worstRating': '1',
            'ratingCount': product.reviewsCount ? String(product.reviewsCount) : '218',
            'reviewCount': product.reviewsCount ? String(product.reviewsCount) : '218'
          },
          'review': [
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Verified Patrons of Saurashtra'
              },
              'datePublished': '2026-10-20',
              'reviewBody': `Authentic Kathiyawadi taste! Handcrafted sun-cured ${product.name} that flash-fries in 20 seconds with crisp crunch and delightful buttermilk flavor.`,
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5',
                'worstRating': '1'
              }
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${currentCanonical}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://kashri.megascale.co.in/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Gujarati Kashri Collection',
              'item': 'https://kashri.megascale.co.in/#hero'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': product.name,
              'item': currentCanonical
            }
          ]
        }
      ]
    });

    return () => {
      if (canonicalLink && prevCanonical) {
        canonicalLink.setAttribute('href', prevCanonical);
      }
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      const existingScript = document.getElementById('product-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [product, seo]);

  const whatsappMessage = encodeURIComponent(
    `Hello Bhagvat Prasadam, I want to inquire about ordering ${product.name} (${selectedPack}) from your Kashri website: https://kashri.megascale.co.in${seo.url || ''}`
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar onOpenBulkOrder={onOpenBulkOrder} />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Breadcrumb Navigation & Back Link */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#e2ebe5]">
          <div className="flex items-center gap-2 text-xs text-[#55695f] flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 font-bold text-[#164e3d] hover:text-[#c27803] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Home</span>
            </button>
            <span className="text-[#c8ded4]">/</span>
            <button
              onClick={() => navigate('/?scrollTo=hero')}
              className="font-semibold hover:text-[#164e3d] transition-colors cursor-pointer"
            >
              Kashri Collection
            </button>
            <span className="text-[#c8ded4]">/</span>
            <span className="text-[#182620] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-[#c27803] bg-[#fdf6e9] px-2.5 py-0.5 rounded-full border border-[#f5dfb8]">
            {product.category || 'Traditional Kashri'}
          </span>
        </nav>

        {/* ============================================================== */}
        {/* TOP PRODUCT HERO SHOWCASE (2 Columns) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          
          {/* Left Column: High-Res Cutout Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md bg-[#f8faf8] border-2 border-[#e2ebe5] rounded-3xl p-6 sm:p-10 flex items-center justify-center shadow-xs">
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Order ${product.name} on Bhagvat Prasadam`}
                className="block w-full flex items-center justify-center group cursor-pointer"
              >
                <img
                  src={`/${seo.imageFilename || 'vadhvani-transparent.webp'}`}
                  alt={seo.altText || `${product.name} - Traditional Gujarati Delicacy`}
                  width="420"
                  height="420"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full max-h-[300px] sm:max-h-[360px] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
                />
              </a>

              {/* Verified Authentic Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs border border-[#c8ded4] px-2.5 py-1 rounded-full text-[10px] font-bold text-[#164e3d] flex items-center gap-1 shadow-2xs">
                <span>☀️</span>
                <span>100% Sun Dried</span>
              </div>
            </div>

            {/* Visual Thumbnails Bar */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 max-w-full">
                {product.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-xl border border-[#e2ebe5] bg-white p-1 overflow-hidden shrink-0"
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Ratings, Pricing, and Inquiries */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title & Gujarati Script Badge */}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-gujarati text-sm sm:text-base font-bold text-[#c27803] bg-[#fdf6e9] px-2.5 py-0.5 rounded-lg border border-[#f5dfb8]">
                  {product.gujaratiName}
                </span>
                <span className="text-xs font-semibold text-[#55695f] bg-[#eaf2ee] px-2.5 py-0.5 rounded-full border border-[#c8ded4]">
                  Kathiyawadi Heritage
                </span>
              </div>

              {/* Exact Canonical H1 Tag */}
              <h1 className="font-1 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#164e3d] leading-tight tracking-tight mt-2">
                {seo.h1 || product.name}
              </h1>

              <p className="font-2 text-sm sm:text-base text-[#c27803] font-semibold mt-1">
                {product.subheading || product.tagline}
              </p>
            </div>

            {/* Ratings & Key Metrics */}
            <div className="flex items-center gap-4 text-xs text-[#55695f] flex-wrap">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-[#fdf6e9] px-2 py-0.5 rounded-md border border-[#f5dfb8]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{product.rating || '5.0'}</span>
                <span className="text-[#55695f] font-normal">({product.reviewsCount || '218'} reviews)</span>
              </div>
              <span className="flex items-center gap-1 font-semibold text-[#164e3d]">
                <ShieldCheck className="w-4 h-4 text-[#c27803]" />
                Zero Preservatives
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#164e3d]">
                <Flame className="w-4 h-4 text-[#c27803]" />
                20-Second Flash Fry
              </span>
            </div>

            {/* Pricing Display */}
            <div className="p-4 rounded-2xl bg-[#f8faf8] border border-[#e2ebe5] flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#164e3d]">
                ₹{seo.price || '149'}
              </span>
              <span className="text-xs text-[#55695f] font-medium">
                Inclusive of all taxes • Fresh solar batch
              </span>
            </div>

            {/* Packaging Size Options */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#164e3d] mb-2">
                Select Packaging Size:
              </label>
              <div className="flex gap-2.5">
                {['100gm', '250gm', '500gm'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedPack(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedPack === sz
                        ? 'bg-[#164e3d] text-white border-[#164e3d] shadow-xs'
                        : 'bg-white text-[#182620] border-[#e2ebe5] hover:border-[#164e3d]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Promotional Offers Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fdf6e9] border border-[#c27803]/40 text-xs font-semibold text-[#164e3d]">
                <span className="text-[#c27803] font-bold">✓</span>
                <span>Free Shipping on Orders Above ₹999</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fdf6e9] border border-[#c27803]/40 text-xs font-semibold text-[#164e3d]">
                <span className="text-[#c27803] font-bold">✓</span>
                <span>First Order: Free Shipping Above ₹599</span>
              </div>
            </div>

            {/* Inquiry & Buy Action Buttons (Strictly Brand Showcase / Inquiry) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#164e3d] hover:bg-[#113e30] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#c27803]" />
                <span>Buy on Official Store</span>
              </a>

              <a
                href={`https://wa.me/918850011652?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Commercial Inquiries Note */}
            <p className="text-[11px] text-[#55695f]">
              Need bulk quantities for weddings, catering, or retail?{' '}
              <button
                onClick={onOpenBulkOrder}
                className="text-[#164e3d] font-bold underline cursor-pointer"
              >
                Request a bulk quote
              </button>
            </p>

          </div>

        </div>

        {/* ============================================================== */}
        {/* COMPREHENSIVE 6-SECTION PRODUCT DESCRIPTION (MANDATORY SEO CONTENT) */}
        {/* ============================================================== */}
        <section className="mb-14 pt-8 border-t border-[#e2ebe5]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c27803] bg-[#fdf6e9] px-3 py-1 rounded-full border border-[#f5dfb8]">
              Product Specifications &amp; Quality Guide
            </span>
            <h2 className="font-1 text-2xl sm:text-3xl font-extrabold text-[#164e3d] mt-2">
              Everything You Need to Know About {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#55695f] mt-1">
              Handcrafted in Saurashtra following traditional solar curing methods with zero chemical preservatives.
            </p>
          </div>

          {/* 6 Structured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Ingredients */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <Utensils className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  1. Ingredients
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.ingredients || 'Handpicked farm produce cured with cultured sour buttermilk, rock salt, and organic turmeric.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>100% Pure &amp; Preservative-Free</span>
              </div>
            </div>

            {/* 2. Taste and Flavour */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <Flame className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  2. Taste and Flavour
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.tasteAndFlavour || 'Appetizing spicy kick balanced with buttermilk tanginess and savory rock salt.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>Authentic Kathiyawadi Profile</span>
              </div>
            </div>

            {/* 3. Preparation Method */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <Clock className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  3. Preparation Method
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.preparationMethod || 'Flash-fry in hot oil for 15 to 20 seconds, or air-fry at 175°C for 3 minutes.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>Ready in 20 Seconds</span>
              </div>
            </div>

            {/* 4. Packaging Size */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <Package className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  4. Packaging Size
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.packagingSize || 'Available in 100g, 250g, and 500g heavy-duty airtight resealable pouches.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>Moisture Barrier Ziplock</span>
              </div>
            </div>

            {/* 5. Storage Instructions */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  5. Storage Instructions
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.storageInstructions || 'Store in an airtight jar in a cool, dry place away from direct moisture. Stays fresh for 12 months.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>12 Months Shelf Life</span>
              </div>
            </div>

            {/* 6. Delivery Information */}
            <div className="bg-[#f8faf8] border border-[#e2ebe5] rounded-2xl p-5 hover:border-[#164e3d] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf2ee] text-[#164e3d] flex items-center justify-center font-bold mb-3">
                  <Truck className="w-5 h-5 text-[#c27803]" />
                </div>
                <h3 className="font-1 text-lg font-bold text-[#164e3d] mb-2">
                  6. Delivery Information
                </h3>
                <p className="text-xs text-[#55695f] leading-relaxed">
                  {details.deliveryInformation || 'Express doorstep shipping across all 25,000+ Indian pincodes in 2 to 5 business days.'}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#e2ebe5]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#164e3d]">
                <Check className="w-3.5 h-3.5 text-[#c27803]" />
                <span>Pan-India Doorstep Delivery</span>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* PRODUCT SPECIFIC FAQS */}
        {/* ============================================================== */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="mb-14 pt-8 border-t border-[#e2ebe5]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#164e3d] mb-4">
              <HelpCircle className="w-4 h-4 text-[#c27803]" />
              <span>Frequently Asked Questions for {product.name}</span>
            </div>

            <div className="space-y-3">
              {product.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#e2ebe5] rounded-2xl overflow-hidden bg-white shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-[#182620] hover:text-[#164e3d] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#c27803] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#55695f] leading-relaxed border-t border-[#e2ebe5]/50 bg-[#f8faf8]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* EXPLORE OTHER TRADITIONAL DELICACIES */}
        {/* ============================================================== */}
        <section className="pt-8 border-t border-[#e2ebe5]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-1 text-xl sm:text-2xl font-bold text-[#164e3d]">
                Explore Other Gujarati Kashri Varieties
              </h3>
              <p className="text-xs text-[#55695f]">
                Traditional Kathiyawadi solar-cured sides for your family thali
              </p>
            </div>
            <Link
              to="/"
              className="text-xs font-bold text-[#c27803] hover:text-[#164e3d] transition-colors"
            >
              View Full Thali →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {otherProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.seo?.slug || item.id}`}
                className="bg-[#f8faf8] border border-[#e2ebe5] hover:border-[#164e3d] rounded-2xl p-3 flex flex-col justify-between group transition-all cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-square flex items-center justify-center p-2 mb-2 bg-white rounded-xl border border-[#e2ebe5]">
                    <img
                      src={`/${item.seo?.imageFilename || item.transparentImage || 'vadhvani-transparent.webp'}`}
                      alt={item.name}
                      loading="lazy"
                      className="max-h-[85px] w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-bold text-xs text-[#182620] group-hover:text-[#164e3d] transition-colors truncate">
                    {item.shortName || item.name}
                  </h4>
                  <span className="font-gujarati text-[10px] text-[#c27803] block truncate">
                    {item.gujaratiName}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-[#e2ebe5] flex items-center justify-between text-[11px] font-semibold text-[#164e3d]">
                  <span>₹{item.seo?.price || '149'}</span>
                  <span className="text-[#c27803] text-[10px]">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenPolicy={onOpenPolicy} onOpenBulkOrder={onOpenBulkOrder} />
    </div>
  );
}
