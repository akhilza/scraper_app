import express from 'express';
import { isValidUrl } from '../utils/validateUrl.js';
import { renderPage } from '../services/scraper.js';
import { extractData } from '../services/parser.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'A valid URL is required' });
  }
  const startTime = Date.now();
  try {
    const html = await renderPage(url);
    const data = extractData(html, url);
    const loadTime = Date.now() - startTime;

    return res.json({
      success: true,
      url,
      loadTime,
      scrapedAt: new Date().toISOString(),
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to scrape the page',
    });
  }
});

export default router;
