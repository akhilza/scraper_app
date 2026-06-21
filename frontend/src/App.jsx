import { useMutation } from '@tanstack/react-query';
import UrlInputForm from './components/UrlInputForm.jsx';
import ResultsView from './components/ResultsView.jsx';
import { scrapeUrl } from './api/scrapeApi.js';

export default function App() {
  const mutation = useMutation({
    mutationFn: scrapeUrl,
  });

  const handleSubmit = (url) => {
    mutation.mutate(url);
  };

  return (
    <div className="app">
      <header className="app-header">
        <span className="eyebrow">extractor</span>
        <h1>Pull the structure out of any page</h1>
        <p>Paste a URL. A real browser renders it, then we extract the fields below.</p>
      </header>

      <UrlInputForm onSubmit={handleSubmit} isLoading={mutation.isPending} />

      {mutation.isPending && <p className="status status-loading">Rendering page and extracting data…</p>}

      {mutation.isError && (
        <div className="status status-error">
          {mutation.error?.response?.data?.error || 'Something went wrong while scraping that page.'}
        </div>
      )}

      {mutation.isSuccess && <ResultsView result={mutation.data} />}
    </div>
  );
}
