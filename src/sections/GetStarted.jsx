import Reveal from '../components/Reveal.jsx'
import s from './GetStarted.module.css'

function GetStarted() {
  return (
    <section className={s.cta} id="get-started">
      <div className={s.bg} aria-hidden="true" />
      <div className={s.scrim} aria-hidden="true" />

      <div className={`container ${s.inner}`}>
        <Reveal>
          <h2 className={s.headline}>Ready to put AI to work?</h2>
          <p className={s.sub}>
            Start with one high-impact workflow. Define the policies. Run it with control. Review
            the evidence. Then scale what works.
          </p>
          <div className={s.ctas}>
            <a href="mailto:hello@avirat.ai" className={`btn ${s.primary}`}>
              Request a demo
              <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#how-it-works" className={`btn ${s.ghost}`}>
              See governed execution
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default GetStarted
