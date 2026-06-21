export default function ImagesCard({ images }) {
  return (
    <section className="card">
      <h3>
        <span className="card-index">04</span> Images ({images.length})
      </h3>
      <ul className="scroll-list">
        {images.map((img, i) => (
          <li key={i}>
            <span className="img-src">{img.src}</span>
            <span className={img.alt ? 'alt-ok' : 'alt-missing'}>
              {img.alt ? `alt: ${img.alt}` : 'no alt text'}
            </span>
          </li>
        ))}
        {images.length === 0 && <li className="empty">No images found.</li>}
      </ul>
    </section>
  );
}
