import { load } from 'cheerio';

export function extractData(html, baseUrl) {
  const $ = load(html);
  const origin = new URL(baseUrl).origin;

  return {
    title: $('title').first().text().trim() || null,
    metaTags: extractMetaTags($),
    headings: extractHeadings($),
    links: extractLinks($, origin),
    images: extractImages($, origin),
  };
}

function extractMetaTags($) {
  const meta = {
    description: null,
    openGraph: {},
    twitter: {},
    other: {},
  };

  $('meta').each((_, el) => {
    const name = $(el).attr('name');
    const property = $(el).attr('property');
    const content = $(el).attr('content');

    if (!content) return;

    if (name === 'description') {
      meta.description = content;
    } else if (property && property.startsWith('og:')) {
      meta.openGraph[property.replace('og:', '')] = content;
    } else if (name && name.startsWith('twitter:')) {
      meta.twitter[name.replace('twitter:', '')] = content;
    } else if (name) {
      meta.other[name] = content;
    }
  });

  return meta;
}

function extractHeadings($) {
  const headings = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };

  Object.keys(headings).forEach((tag) => {
    $(tag).each((_, el) => {
      const text = $(el).text().trim();
      if (text) headings[tag].push(text);
    });
  });

  return headings;
}

function extractLinks($, origin) {
  const links = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
      return;
    }
    let resolved;
    try {
      resolved = new URL(href, origin).href;
    } catch {
      return;
    }

    links.push({
      text: text || null,
      href: resolved,
      type: resolved.startsWith(origin) ? 'internal' : 'external',
    });
  });
  return links;
}

function extractImages($, origin) {
  const images = [];

  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (!src) return;

    let resolved;
    try {
      resolved = new URL(src, origin).href;
    } catch {
      resolved = src;
    }

    images.push({
      src: resolved,
      alt: $(el).attr('alt') || null,
    });
  });

  return images;
}
