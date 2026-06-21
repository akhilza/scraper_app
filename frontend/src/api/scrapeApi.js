import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function scrapeUrl(url) {
  const { data } = await api.post('/scrape', { url });
  return data;
}
