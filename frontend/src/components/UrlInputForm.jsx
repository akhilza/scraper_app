import { useState } from 'react';

export default function UrlInputForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLoading}
        aria-label="Page URL"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Scraping…' : 'Scrape page'}
      </button>
    </form>
  );
}
