export default function LinksCard({ links }) {
  const internal = links.filter((l) => l.type === 'internal');
  const external = links.filter((l) => l.type === 'external');

  return (
    <section className="card">
      <h3>
        <span className="card-index">03</span> Links ({links.length})
      </h3>
      <p className="breakdown">
        {internal.length} internal <span className="dot">·</span> {external.length} external
      </p>
      <ul className="scroll-list">
        {links.map((link, i) => (
          <li key={i}>
            <span className={`tag tag-${link.type}`}>{link.type}</span>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.text || link.href}
            </a>
          </li>
        ))}
        {links.length === 0 && <li className="empty">No links found.</li>}
      </ul>
    </section>
  );
}
