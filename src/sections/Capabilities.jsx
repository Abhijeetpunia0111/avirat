import Reveal from '../components/Reveal.jsx'
import s from './Capabilities.module.css'

const STEPS = [
  { no: '0.', kind: 'Trigger', text: 'Request enters the runtime with scope and policy set' },
  { no: '1.', kind: 'Read policy', text: 'Hiring / EU authority matrix' },
  { no: '2.', kind: 'Check', text: 'Spend above €5k threshold', flag: true },
]

const TRACE = [
  { kind: 'Plan', text: 'Identify contracts with renewal inside 90 days.' },
  { kind: 'Execute', text: 'Query contract store.' },
  { kind: 'Plan', text: 'Map obligations against policy exceptions.' },
  { kind: 'Execute', text: 'Draft exposure summary with citations.' },
  { kind: 'Plan', text: 'Route to legal for approval.' },
]

/* Generic system glyphs — mail, chat, doc, cloud, store, calendar, ticket, code. */
const GLYPHS = [
  'M3 5h14v10H3zM3 6l7 5 7-5',
  'M3 4h14v9H8l-4 4v-4H3z',
  'M5 3h6l4 4v10H5zM11 3v4h4',
  'M6 15a4 4 0 010-8 5 5 0 019.5 1.5A3.2 3.2 0 0115 15z',
  'M4 6c0-1.1 2.7-2 6-2s6 .9 6 2-2.7 2-6 2-6-.9-6-2zM4 6v8c0 1.1 2.7 2 6 2s6-.9 6-2V6',
  'M3 5h14v12H3zM3 9h14M7 3v4M13 3v4',
  'M3 7a2 2 0 000 6v3h14v-3a2 2 0 010-6V4H3zM10 4v12',
  'M7 6l-4 4 4 4M13 6l4 4-4 4',
]

function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <Reveal className={s.head}>
          <div className={s.headText}>
            <span className="eyebrow">Capabilities</span>
            <h2 className={s.headline}>
              The governed execution layer
              <br />
              to get AI work done
            </h2>
          </div>
          <a href="#get-started" className={`btn btn-primary ${s.headCta}`}>
            Explore the platform
            <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        <div className={s.bento}>
          {/* ---- Connect systems ---- */}
          <Reveal className={`${s.card} ${s.cardWide}`}>
            <p className={s.copy}>
              <b>Connect systems.</b> Across every model, agent, tool, and system of record.
            </p>
            <div className={`${s.visual} ${s.visualWave}`} aria-hidden="true">
              <div className={s.askBar}>
                <span className={s.askPlus}>+</span>
                <span className={s.askText}>Ask anything…</span>
                <span className={s.askTools}>
                  <svg viewBox="0 0 16 16" width="15" height="15">
                    <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="11" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  <span className={s.askOrb} />
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- Take action ---- */}
          <Reveal delay={0.08} className={`${s.card} ${s.cardNarrow}`}>
            <p className={s.copy}>
              <b>Take action.</b> Move work forward with governed automation and agents.
            </p>
            <div className={`${s.visual} ${s.visualSteps}`} aria-hidden="true">
              <ol className={s.steps}>
                {STEPS.map((step) => (
                  <li key={step.no} className={s.step}>
                    <div className={s.stepHead}>
                      <span className={s.stepNo}>{step.no}</span>
                      <span className={s.stepKind}>{step.kind}</span>
                      {step.flag && (
                        <svg className={s.stepFlag} viewBox="0 0 16 16" width="13" height="13">
                          <path d="M8 2.5l6 11H2zM8 7v3M8 11.6v.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className={s.stepText}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* ---- Understand context ---- */}
          <Reveal delay={0.04} className={`${s.card} ${s.cardNarrow}`}>
            <p className={s.copy}>
              <b>Understand context.</b> Turn fragmented information into trusted answers.
            </p>
            <div className={`${s.visual} ${s.visualTrace}`} aria-hidden="true">
              <div className={s.question}>
                Summarise Q3 vendor risk exposure across active contracts.
              </div>
              <div className={s.sources}>
                Show work — 16 sources
                <svg viewBox="0 0 16 16" width="12" height="12">
                  <path d="M4 6.5L8 10.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <ul className={s.trace}>
                {TRACE.map((row, i) => (
                  <li key={i}>
                    <i className={row.kind === 'Plan' ? s.tracePlan : s.traceExec}>{row.kind}</i>
                    <span>{row.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ---- Work everywhere ---- */}
          <Reveal delay={0.12} className={`${s.card} ${s.cardWide}`}>
            <p className={s.copy}>
              <b>Work everywhere.</b> Bring governed AI into the tools your teams already use.
            </p>
            <div className={`${s.visual} ${s.visualApps}`} aria-hidden="true">
              <div className={s.appField}>
                {Array.from({ length: 16 }, (_, i) => (
                  <span
                    key={i}
                    className={s.appBubble}
                    style={{ animationDelay: `${(i % 8) * 0.35}s` }}
                  >
                    <svg viewBox="0 0 20 20" width="20" height="20">
                      <path
                        d={GLYPHS[i % GLYPHS.length]}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Capabilities
