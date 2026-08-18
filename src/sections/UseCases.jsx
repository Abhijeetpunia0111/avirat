import Magnetic from '../components/Magnetic.jsx'
import Reveal from '../components/Reveal.jsx'
import s from './sections.module.css'

const CASES = [
  {
    title: 'Legal',
    text: 'For legal work, where precision, review, and defensible records matter.',
    photo: 'usecase-legal',
  },
  {
    title: 'Compliance',
    text: 'For policy, risk, and audit workflows that need evidence by default.',
    photo: 'usecase-compliance',
  },
  {
    title: 'HR',
    text: 'For hiring workflows that need speed, consistency, and accountable judgment.',
    photo: 'usecase-hr',
  },
  {
    title: 'eCommerce',
    text: 'Customer self-service that moves from answers to governed account actions.',
    photo: 'usecase-ecommerce',
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
                <img
                  className={s.usePhoto}
                  src={`/photos/${useCase.photo}.jpg`}
                  alt=""
                  loading="lazy"
                />
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
            <Magnetic href="#get-started" className="btn btn-secondary">
              Explore governed workflows
              <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default UseCases
