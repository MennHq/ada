/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OpenGraphMeta {
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  imageAlt?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface ValidationRuleResult {
  id: string;
  name: string;
  category: 'critical' | 'recommended' | 'optional';
  status: 'passed' | 'warning' | 'failed';
  currentValue?: string;
  expected: string;
  message: string;
  suggestion?: string;
}

export interface SeoAuditReport {
  score: number; // 0 - 100
  passedCount: number;
  totalRules: number;
  allPassed: boolean;
  rules: ValidationRuleResult[];
  shareCards: {
    hasSummaryLargeImage: boolean;
    hasFullHttpsImage: boolean;
    hasOptimalDimensions: boolean;
    readyForTwitter: boolean;
    readyForFacebook: boolean;
    readyForLinkedIn: boolean;
    readyForDiscord: boolean;
    readyForSlack: boolean;
  };
}

/**
 * Validates OpenGraph and Twitter share metadata according to social platform standards.
 */
export function auditOpenGraphMeta(meta: OpenGraphMeta): SeoAuditReport {
  const rules: ValidationRuleResult[] = [];

  // Rule 1: og:title
  const title = (meta.title || '').trim();
  if (!title) {
    rules.push({
      id: 'og-title-missing',
      name: 'OpenGraph Title (og:title)',
      category: 'critical',
      status: 'failed',
      expected: 'Descriptive title between 30 and 60 characters',
      message: 'Missing og:title. Social platforms will default to page filename or URL.',
      suggestion: 'Provide a concise, branded title like "Aetheria Stratospheric Observatory — Earth & Solar Science".',
    });
  } else if (title.length < 20) {
    rules.push({
      id: 'og-title-length-short',
      name: 'OpenGraph Title (og:title)',
      category: 'recommended',
      status: 'warning',
      currentValue: `${title.length} characters ("${title}")`,
      expected: 'Between 30 and 60 characters for best snippet display',
      message: 'og:title is slightly short; consider adding context or brand suffix.',
      suggestion: 'Expand to 30-60 characters with key topic keywords.',
    });
  } else if (title.length > 70) {
    rules.push({
      id: 'og-title-length-long',
      name: 'OpenGraph Title (og:title)',
      category: 'recommended',
      status: 'warning',
      currentValue: `${title.length} characters`,
      expected: 'Under 60-70 characters to prevent ellipsis truncation',
      message: 'og:title exceeds 70 characters and will likely be truncated.',
      suggestion: 'Keep title under 60 characters.',
    });
  } else {
    rules.push({
      id: 'og-title-valid',
      name: 'OpenGraph Title (og:title)',
      category: 'critical',
      status: 'passed',
      currentValue: `"${title}" (${title.length} chars)`,
      expected: '30-60 characters',
      message: 'Optimal title length and branding.',
    });
  }

  // Rule 2: og:description
  const desc = (meta.description || '').trim();
  if (!desc) {
    rules.push({
      id: 'og-desc-missing',
      name: 'OpenGraph Description (og:description)',
      category: 'critical',
      status: 'failed',
      expected: 'Engaging summary between 120 and 160 characters',
      message: 'Missing og:description. Platforms will scrape arbitrary page text.',
      suggestion: 'Summarize the core value proposition in 1-2 compelling sentences with a call to action.',
    });
  } else if (desc.length < 50) {
    rules.push({
      id: 'og-desc-short',
      name: 'OpenGraph Description (og:description)',
      category: 'recommended',
      status: 'warning',
      currentValue: `${desc.length} characters`,
      expected: 'Between 120 and 160 characters',
      message: 'Description is too brief to provide context.',
      suggestion: 'Expand to 120-160 characters for richer social snippets.',
    });
  } else if (desc.length > 200) {
    rules.push({
      id: 'og-desc-long',
      name: 'OpenGraph Description (og:description)',
      category: 'recommended',
      status: 'warning',
      currentValue: `${desc.length} characters`,
      expected: 'Under 160 characters',
      message: 'Description will be truncated with an ellipsis on Twitter and Facebook.',
      suggestion: 'Trim to under 160 characters.',
    });
  } else {
    rules.push({
      id: 'og-desc-valid',
      name: 'OpenGraph Description (og:description)',
      category: 'critical',
      status: 'passed',
      currentValue: `${desc.length} characters`,
      expected: '120-160 characters',
      message: 'Ideal description length for rich cards and search snippets.',
    });
  }

  // Rule 3: og:image presence & Full HTTPS URL
  const img = (meta.image || '').trim();
  const isHttps = /^https:\/\//i.test(img);
  const isRelative = /^\//.test(img) && !/^\/\//.test(img);

  if (!img) {
    rules.push({
      id: 'og-image-missing',
      name: 'OpenGraph Image (og:image)',
      category: 'critical',
      status: 'failed',
      expected: 'Full https:// image URL (e.g. https://domain.com/og-image.png)',
      message: 'Missing og:image. Links shared to X/Twitter, Slack, LinkedIn will appear without a graphic.',
      suggestion: 'Generate a preview graphic showing the project at 1200x630 resolution with a full https:// address.',
    });
  } else if (isRelative || !isHttps) {
    rules.push({
      id: 'og-image-not-https',
      name: 'Full HTTPS Image URL',
      category: 'critical',
      status: 'failed',
      currentValue: img,
      expected: 'Absolute HTTPS URL starting with https://',
      message: 'Relative or HTTP image paths fail on social platform scrapers (Discord, X, Facebook, LinkedIn require full HTTPS).',
      suggestion: 'Prepend your public domain with https:// prefix (e.g. https://your-app.com/og-image.png).',
    });
  } else {
    rules.push({
      id: 'og-image-https-valid',
      name: 'Full HTTPS Image URL',
      category: 'critical',
      status: 'passed',
      currentValue: img,
      expected: 'Starts with https://',
      message: 'Fully qualified HTTPS image address supplied.',
    });
  }

  // Rule 4: Dimensions 1200x630
  const width = meta.imageWidth || 0;
  const height = meta.imageHeight || 0;
  if (!img) {
    // Already reported above
  } else if (width === 1200 && height === 630) {
    rules.push({
      id: 'og-image-dimensions-exact',
      name: 'Image Aspect & Dimensions (1200×630)',
      category: 'critical',
      status: 'passed',
      currentValue: '1200 × 630 px (1.905:1 standard ratio)',
      expected: '1200 × 630 pixels',
      message: 'Exact standard resolution for crisp, edge-to-edge preview banners.',
    });
  } else if (width > 0 && height > 0) {
    const ratio = width / height;
    const isNear16by9 = Math.abs(ratio - 1.905) < 0.15;
    if (isNear16by9) {
      rules.push({
        id: 'og-image-dimensions-near',
        name: 'Image Dimensions',
        category: 'recommended',
        status: 'warning',
        currentValue: `${width} × ${height} px`,
        expected: '1200 × 630 pixels',
        message: 'Dimensions approximate the 1.91:1 ratio, but exact 1200×630 ensures zero cropping on retina displays.',
        suggestion: 'Resize graphic to exactly 1200×630 pixels.',
      });
    } else {
      rules.push({
        id: 'og-image-dimensions-wrong',
        name: 'Image Aspect Ratio',
        category: 'critical',
        status: 'failed',
        currentValue: `${width} × ${height} px (${ratio.toFixed(2)}:1)`,
        expected: '1200 × 630 pixels (1.91:1 ratio)',
        message: 'Aspect ratio deviates significantly from 1.91:1; social cards will crop or letterbox.',
        suggestion: 'Export graphic at 1200×630 pixels with critical text centered.',
      });
    }
  } else {
    // If not explicitly set in tags, check if image is declared
    rules.push({
      id: 'og-image-dimensions-missing-tags',
      name: 'Image Dimension Tags (og:image:width & height)',
      category: 'recommended',
      status: 'warning',
      expected: 'og:image:width=1200 and og:image:height=630',
      message: 'Explicit width/height tags allow scrapers to render cards synchronously on first crawl.',
      suggestion: 'Include <meta property="og:image:width" content="1200" /> and height="630".',
    });
  }

  // Rule 5: twitter:card set to summary_large_image
  const twitterCard = (meta.twitterCard || '').trim();
  if (twitterCard === 'summary_large_image') {
    rules.push({
      id: 'twitter-card-summary-large',
      name: 'Twitter Card (twitter:card)',
      category: 'critical',
      status: 'passed',
      currentValue: 'summary_large_image',
      expected: 'summary_large_image',
      message: 'Card set to summary_large_image for full-width rich banner cards on X/Twitter.',
    });
  } else if (!twitterCard) {
    rules.push({
      id: 'twitter-card-missing',
      name: 'Twitter Card (twitter:card)',
      category: 'critical',
      status: 'failed',
      expected: 'summary_large_image',
      message: 'Missing twitter:card meta tag.',
      suggestion: 'Add <meta name="twitter:card" content="summary_large_image" />.',
    });
  } else {
    rules.push({
      id: 'twitter-card-not-large',
      name: 'Twitter Card (twitter:card)',
      category: 'recommended',
      status: 'warning',
      currentValue: twitterCard,
      expected: 'summary_large_image',
      message: `Card is set to "${twitterCard}". "summary_large_image" is recommended for prominent visual cards.`,
      suggestion: 'Change value to summary_large_image.',
    });
  }

  // Calculate score
  const passedCount = rules.filter(r => r.status === 'passed').length;
  const warningCount = rules.filter(r => r.status === 'warning').length;
  const failedCount = rules.filter(r => r.status === 'failed').length;

  const total = rules.length;
  const rawScore = Math.round(((passedCount * 1.0 + warningCount * 0.5) / (total || 1)) * 100);

  const hasSummaryLargeImage = twitterCard === 'summary_large_image';
  const hasFullHttpsImage = isHttps && !!img;
  const hasOptimalDimensions = width === 1200 && height === 630;

  return {
    score: Math.min(100, Math.max(0, rawScore)),
    passedCount,
    totalRules: total,
    allPassed: failedCount === 0 && warningCount === 0,
    rules,
    shareCards: {
      hasSummaryLargeImage,
      hasFullHttpsImage,
      hasOptimalDimensions,
      readyForTwitter: hasSummaryLargeImage && hasFullHttpsImage && !!title,
      readyForFacebook: hasFullHttpsImage && !!title && !!desc,
      readyForLinkedIn: hasFullHttpsImage && !!title,
      readyForDiscord: hasFullHttpsImage && !!title,
      readyForSlack: hasFullHttpsImage && !!title,
    },
  };
}
