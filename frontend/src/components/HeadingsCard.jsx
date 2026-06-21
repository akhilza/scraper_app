export default function HeadingsCard({ headings }) {
  const levels = Object.entries(headings).filter(([, items]) => items.length > 0);

  return (
    <section className="card">
      <h3>
        <span className="card-index">02</span> Headings
      </h3>
      {levels.length === 0 && <p className="empty">No headings found on this page.</p>}
      {levels.map(([tag, items]) => (
        <div className="subgroup" key={tag}>
          <h4>{tag.toUpperCase()}</h4>
          <ul className="plain-list">
            {items.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
