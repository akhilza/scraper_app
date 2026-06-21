import MetaTagsCard from './MetaTagsCard.jsx';
import HeadingsCard from './HeadingsCard.jsx';
import LinksCard from './LinksCard.jsx';
import ImagesCard from './ImagesCard.jsx';

export default function ResultsView({ result }) {
  const { data, url, loadTime, scrapedAt } = result;

  return (
    <div className="results">
      <div className="results-summary">
        <h2>{data.title || 'Untitled page'}</h2>
        <p className="results-meta">
          {url} <span className="dot">·</span> rendered in {loadTime}ms{' '}
          <span className="dot">·</span> {new Date(scrapedAt).toLocaleString()}
        </p>
      </div>

      <div className="results-grid">
        <MetaTagsCard metaTags={data.metaTags} />
        <HeadingsCard headings={data.headings} />
        <LinksCard links={data.links} />
        <ImagesCard images={data.images} />
      </div>
    </div>
  );
}
