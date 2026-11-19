/**
 * Dynamic SEO and Social Meta Tag Manager
 * Updates document title, canonical link, Open Graph and Twitter card tags
 */

export const DEFAULT_SEO = {
  title: 'Buy Gujarati Marcha Kashri Online | Traditional Gujarati Delicacies – Kashri',
  description: 'Shop authentic Gujarati Marcha Kashri and traditional sun-dried delicacies online. Discover quality Gujarati specialties from Kashri and order online.',
  canonicalUrl: 'https://kashri.megascale.co.in/',
  ogImage: 'https://kashri.megascale.co.in/vadhvani-marcha-kashri.webp',
  ogType: 'website'
};

function setOrUpdateMeta(selector, attribute, value) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.startsWith('meta[name=')) {
      const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
      if (name) el.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      const prop = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
      if (prop) el.setAttribute('property', prop);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
}

export function updatePageMetadata({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  canonicalUrl = DEFAULT_SEO.canonicalUrl,
  ogImage = DEFAULT_SEO.ogImage,
  ogType = 'website'
}) {
  // Title
  document.title = title;
  setOrUpdateMeta('meta[name="title"]', 'content', title);

  // Description
  setOrUpdateMeta('meta[name="description"]', 'content', description);

  // Canonical
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Open Graph
  setOrUpdateMeta('meta[property="og:title"]', 'content', title);
  setOrUpdateMeta('meta[property="og:description"]', 'content', description);
  setOrUpdateMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setOrUpdateMeta('meta[property="og:image"]', 'content', ogImage);
  setOrUpdateMeta('meta[property="og:type"]', 'content', ogType);
  setOrUpdateMeta('meta[property="og:site_name"]', 'content', 'Bhagvat Prasadam Heritage');

  // Twitter Card
  setOrUpdateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setOrUpdateMeta('meta[name="twitter:title"]', 'content', title);
  setOrUpdateMeta('meta[name="twitter:description"]', 'content', description);
  setOrUpdateMeta('meta[name="twitter:image"]', 'content', ogImage);
}
