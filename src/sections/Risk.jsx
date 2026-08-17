import Reveal from '../components/Reveal.jsx'
import s from './sections.module.css'

const RISKS = [
  {
    title: 'Agent sprawl',
    text: 'Multiple agents emerge across teams without shared ownership, standards, or oversight.',
  },
  {
    title: 'Untraceable decisions',
    text: 'Actions happen without clear records of what ran, why, who approved, and the outcome that followed.',
  },
  {
    title: 'Siloed controls',
    text: 'Governance stays locked inside individual tools instead of governing work across systems, workflows, and business units.',
  },
  {
    title: 'Unbounded access',
    text: 'Agents reach data or systems beyond the authority they were ever granted.',
  },
  {
    title: 'Runaway costs',
    text: 'Loops, retries, and tool calls exceed the budgets defined for the workflow.',
  },
  {
    title: 'No safe recovery',
    text: 'Failures lack clear rollback, escalation, or intervention paths when a run goes wrong.',
  },
]

function Risk() {
  return (
    <section className={`section ${s.risk}`} id="risk">
      <div className="container">
        <Reveal className="section-head section-head--wide">
          <span className="eyebrow">The risk</span>
          <h2 className="headline">
            AI adoption is not the risk.
            <br />
            Ungoverned execution is.
          </h2>
          <p className="subtext">
            Trusting AI in production is hard because production requires control over what AI knows,
            decides, does, costs, and leaves behind.
          </p>
        </Reveal>

        <div className={s.riskGrid}>
          {RISKS.map((risk, i) => (
            <Reveal key={risk.title} delay={(i % 3) * 0.08}>
              <article className={s.riskCard}>
                <span className={s.riskBar} aria-hidden="true" />
                <span className={s.riskIndex}>R{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.riskTitle}>{risk.title}</h3>
                <p className={s.riskText}>{risk.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <blockquote className={s.quote} style={{ marginTop: 'clamp(64px, 9vw, 110px)' }}>
            <p className={s.quoteText}>
              AI can demonstrate value in a pilot. In production, it must also carry responsibility.
              Without a trust infrastructure, scale remains out of reach.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

export default Risk
