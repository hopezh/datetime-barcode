export default function Step({ number, title, children }) {
  return (
    <section className="step">
      <div className="step-meta">
        <span className="meta">step</span>
        <span className="step-number">{number}</span>
      </div>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="step-body">{children}</div>
    </section>
  )
}
