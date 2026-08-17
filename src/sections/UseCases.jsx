import Reveal from '../components/Reveal.jsx'
import s from './sections.module.css'

const CASES = [
  {
    title: 'Legal',
    text: 'For legal work, where precision, review, and defensible records matter.',
    icon: (
      <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v6h6M9 13h6M9 17h4" />
    ),
  },
  {
    title: 'Compliance',
    text: 'For policy, risk, and audit workflows that need evidence by default.',
    icon: (
      <path d="M12 3l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3zM8.5 12.2l2.4 2.4 4.6-4.8" />
    ),
  },
  {
    title: 'HR',
    text: 'For hiring workflows that need speed, consistency, and accountable judgment.',
    icon: (
      <path d="M9 11a3.6 3.6 0 1 0 0-7.2A3.6 3.6 0 0 0 9 11zM3 20.4c0-3.3 2.7-6 6-6s6 2.7 6 6M16.5 8.6h5M19 6.1v5" />
    ),
  },
  {
    title: 'eCommerce',
    text: 'Customer self-service that moves from answers to governed account actions.',
    icon: (
      <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L21 8H6M9.5 20.5h.01M17.5 20.5h.01" />
    ),
  },
]

function UseCases() {
  return (
    <section className="section" id="use-cases">
      <div className="container">
        <Reveal className="section-head section-head--wide">
          <span className="eyebrow">Use cases</span>
          <h2 className="headline">Start where AI work already has consequences</h2>
          <p className="subtext">
            avirat.ai is built for workflows where AI actions touch sensitive data, decisions,
            records, customers, policies, or compliance evidence.
          </p>
        </Reveal>

        <div className={s.useGrid}>
          {CASES.map((useCase, i) => (
            <Reveal key={useCase.title} delay={i * 0.07}>
              <a href="#get-started" className={s.useCard}>
                <svg
                  className={s.useIcon}
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {useCase.icon}
                </svg>
                <h3 className={s.useTitle}>{useCase.title}</h3>
                <p className={s.useText}>{useCase.text}</p>
                <span className={s.useGo} aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="cta-row">
            <a href="#get-started" className="btn btn-secondary">
              Explore governed workflows
              <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default UseCases
