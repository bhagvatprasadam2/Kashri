/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Read products.js directly
const productsFilePath = path.resolve(rootDir, 'src/data/products.js');
const productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');

// Simple parser for PRODUCTS and BLOGS from products.js
const extractArray = (varName) => {
  const match = productsFileContent.match(new RegExp(`export const ${varName} = (\\[[\\s\\S]*?\\]);\\s*(?:export const|$)`));
  if (!match) throw new Error(`Could not find ${varName} in products.js`);
  return JSON.parse(match[1]);
};

const PRODUCTS = extractArray('PRODUCTS');
const BLOGS = extractArray('BLOGS');

const BASE_URL = 'https://kashri.megascale.co.in';

const distIndexPath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(distIndexPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');

function replaceOrInsertMeta(html, tagRegex, newTag) {
  if (tagRegex.test(html)) {
    return html.replace(tagRegex, newTag);
  }
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

function generatePageHtml({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaJson,
  bodyContent
}) {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // Meta name="title"
  html = replaceOrInsertMeta(
    html,
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${title}" />`
  );

  // Meta name="description"
  html = replaceOrInsertMeta(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`
  );

  // Canonical Link
  html = replaceOrInsertMeta(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Open Graph
  html = replaceOrInsertMeta(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${ogImage}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`);

  // Twitter
  html = replaceOrInsertMeta(html, /<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:title" content="${title}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${description}" />`);
  html = replaceOrInsertMeta(html, /<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:image" content="${ogImage}" />`);

  // Schema.org JSON-LD
  if (schemaJson) {
    const jsonStr = JSON.stringify(schemaJson, null, 2);
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${jsonStr}\n</script>`
    );
  }

  // Pre-render content inside <div id="root">
  if (bodyContent) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">\n${bodyContent}\n    </div>`
    );
  }

  return html;
}

console.log('🚀 Starting Static Pre-Rendering...');

// 1. Pre-render 7 Product Pages
for (const p of PRODUCTS) {
  const seo = p.seo || {};
  const details = seo.structuredDetails || {};
  const canonicalUrl = `${BASE_URL}${seo.url || `/products/${p.id}`}`;
  const imageUrl = `${BASE_URL}/${seo.imageFilename || 'vadhvani-marcha-kashri.webp'}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: seo.h1 || p.name,
        image: imageUrl,
        description: seo.metaDescription || p.description,
        sku: `BP-${p.id.toUpperCase()}`,
        brand: {
          '@type': 'Brand',
          name: 'Bhagvat Prasadam Heritage'
        },
        offers: {
          '@type': 'Offer',
          url: p.productUrl,
          priceCurrency: 'INR',
          price: String(seo.price || p.price || '149'),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          seller: {
            '@type': 'Organization',
            name: 'Bhagvat Prasadam Heritage'
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn'
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'INR'
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IN'
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 5,
                unitCode: 'DAY'
              }
            }
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gujarati Kashri Collection',
            item: `${BASE_URL}/#hero`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: p.name,
            item: canonicalUrl
          }
        ]
      }
    ]
  };

  const bodyContent = `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/#hero">Kashri Collection</a> &gt; <span>${p.name}</span>
        </nav>
      </header>
      <main>
        <article>
          <h1>${seo.h1 || p.name}</h1>
          <p><strong>Gujarati:</strong> ${p.gujaratiName || ''}</p>
          <p><strong>Category:</strong> ${p.category || 'Traditional Kashri'}</p>
          <p><strong>Price:</strong> ₹${seo.price || p.price || '149'}</p>
          <p>${seo.metaDescription || p.description}</p>
          <figure>
            <img src="${imageUrl}" alt="${seo.altText || p.name}" />
            <figcaption>${p.name} - Authentic Gujarati Sun-Dried Delicacy</figcaption>
          </figure>
          <section>
            <h2>Product Specifications &amp; Quality Guide</h2>
            <div>
              <h3>1. Ingredients</h3>
              <p>${details.ingredients || ''}</p>
            </div>
            <div>
              <h3>2. Taste and Flavour</h3>
              <p>${details.tasteAndFlavour || ''}</p>
            </div>
            <div>
              <h3>3. Preparation Method</h3>
              <p>${details.preparationMethod || ''}</p>
            </div>
            <div>
              <h3>4. Packaging Size</h3>
              <p>${details.packagingSize || ''}</p>
            </div>
            <div>
              <h3>5. Storage Instructions</h3>
              <p>${details.storageInstructions || ''}</p>
            </div>
            <div>
              <h3>6. Delivery Information</h3>
              <p>${details.deliveryInformation || ''}</p>
            </div>
          </section>
          <div>
            <a href="${p.productUrl}" target="_blank" rel="noopener noreferrer">Buy ${p.name} on Official Store</a>
          </div>
        </article>
      </main>
  `;

  const pageHtml = generatePageHtml({
    title: seo.metaTitle || `${p.name} | Kashri`,
    description: seo.metaDescription || p.description,
    canonicalUrl,
    ogImage: imageUrl,
    ogType: 'product',
    schemaJson: productSchema,
    bodyContent
  });

  const outDir = path.resolve(distDir, 'products', seo.slug || p.id);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.resolve(outDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`  ✓ Pre-rendered product: /products/${seo.slug || p.id}`);
}

// 2. Pre-render 4 Blog Pages
for (const b of BLOGS) {
  const canonicalUrl = `${BASE_URL}/blog/${b.id}`;
  const imageUrl = b.image;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: b.title,
    description: b.excerpt,
    image: imageUrl,
    datePublished: '2026-10-01',
    author: {
      '@type': 'Organization',
      name: b.author || 'Bhagvat Prasadam Heritage',
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bhagvat Prasadam Heritage',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.webp`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  const bodyContent = `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <span>Blog</span> &gt; <span>${b.title}</span>
        </nav>
      </header>
      <main>
        <article>
          <h1>${b.title}</h1>
          <p><em>Published in Marcha Kashri Heritage</em></p>
          <p><strong>Published Date:</strong> ${b.date}</p>
          <p><strong>Author:</strong> ${b.author || 'Bhagvat Prasadam Heritage'}</p>
          <figure>
            <img src="${imageUrl}" alt="${b.title}" />
          </figure>
          <p>${b.excerpt}</p>
          <div>
            ${b.content}
          </div>
        </article>
      </main>
  `;

  const pageHtml = generatePageHtml({
    title: `${b.title} | Bhagvat Prasadam Heritage`,
    description: b.excerpt,
    canonicalUrl,
    ogImage: imageUrl,
    ogType: 'article',
    schemaJson: blogSchema,
    bodyContent
  });

  const outDir = path.resolve(distDir, 'blog', b.id);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.resolve(outDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`  ✓ Pre-rendered blog: /blog/${b.id}`);
}

console.log('✨ All 11 important pages statically pre-rendered successfully in dist/!');
