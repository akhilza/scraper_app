import puppeteer from 'puppeteer';

export async function renderPage(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    );
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    return await page.content();
  } finally {
    await browser.close();
  }
}
