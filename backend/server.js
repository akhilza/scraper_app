import express from 'express';
import cors from 'cors';
import scrapeRouter from './routes/scrape.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/scrape', scrapeRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Scraper API running on http://localhost:${PORT}`);
});
