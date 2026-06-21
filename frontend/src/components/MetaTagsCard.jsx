export default function MetaTagsCard({ metaTags }) {
  const ogEntries = Object.entries(metaTags.openGraph);
  const twitterEntries = Object.entries(metaTags.twitter);

  return (
    <section className="card">
      <h3>
        <span className="card-index">01</span> Meta tags
      </h3>
      <p className="field">
        <span className="field-label">description</span>
        {metaTags.description || '—'}
      </p>

      {ogEntries.length > 0 && (
        <div className="subgroup">
          <h4>Open Graph</h4>
          <ul className="kv-list">
            {ogEntries.map(([key, value]) => (
              <li key={key}>
                <span className="field-label">{key}</span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {twitterEntries.length > 0 && (
        <div className="subgroup">
          <h4>Twitter card</h4>
          <ul className="kv-list">
            {twitterEntries.map(([key, value]) => (
              <li key={key}>
                <span className="field-label">{key}</span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
