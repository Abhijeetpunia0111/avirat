import PlatformDashboard from '../components/PlatformDashboard.jsx'
import Reveal from '../components/Reveal.jsx'
import s from './Platform.module.css'

const POINTS = [
  {
    title: 'Start with intent',
    text: 'Turn a business request into a governed workflow.',
  },
  {
    title: 'Keep humans in the loop',
    text: 'Pause, review, approve, or escalate where judgment is needed.',
  },
  {
    title: 'End with proof',
    text: 'Preserve a record behind every action, approval, and outcome.',
  },
]

function Platform() {
  return (
    <section className={s.platform} id="platform">
      <div className={s.bg} aria-hidden="true" />
      <div className={s.scrim} aria-hidden="true" />

      <div className={`container ${s.inner}`}>
        <div className={s.layout}>
          <div className={s.copy}>
            <Reveal>
              <span className={`eyebrow ${s.eyebrowLight}`}>Platform</span>
              <h2 className={s.headline}>The runtime behind governed AI work</h2>
              <p className={s.subtext}>
                avirat.ai brings governance, execution, human checkpoints, evidence, and cost
                controls into one operating layer above your models and systems. It does not replace
                the tools and models you already run — it governs how AI work moves between them.
              </p>
            </Reveal>

            <div className={s.points}>
              {POINTS.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.07} className={s.point}>
                  <b>{point.title}</b>
                  <span>{point.text}</span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="cta-row">
                <a href="#get-started" className={`btn ${s.primary}`}>
                  Explore the platform
                  <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className={s.visual}>
            <PlatformDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Platform
