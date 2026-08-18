import Reveal from '../components/Reveal.jsx'
import GradientField from '../components/GradientField.jsx'
import s from './ProofRow.module.css'

const CHECKS = ['Policy-checked', 'Approval-gated', 'Fully traceable', 'Cost-controlled']

function ProofRow() {
  return (
    <section className="section" id="proof">
      <div className="container">
        <div className={s.bento}>
          <Reveal className={`${s.card} ${s.cardNarrow}`}>
            <p className={s.copy}>
              <b>Built in, not bolted on.</b> Every run carries its own policy, approvals, and
              evidence from the start.
            </p>
            <div className={s.visual} aria-hidden="true">
              <img className={s.photo} src="/photos/proof-people.jpg" alt="" loading="lazy" />
            </div>
          </Reveal>

          <Reveal delay={0.06} className={`${s.card} ${s.cardMedium}`}>
            <p className={s.copy}>
              <b>Answers on request.</b> Every check, gate, and outcome, ready to show.
            </p>
            <ul className={s.checklist}>
              {CHECKS.map((label) => (
                <li key={label}>
                  <span>{label}</span>
                  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                    <path
                      d="M4 12L12 4M12 4H6M12 4V10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className={`${s.card} ${s.cardWide}`}>
            <div className={s.signature}>
              <GradientField className={s.signatureField} />
              <div className={s.signatureScrim} aria-hidden="true" />
              <p className={s.signatureLabel}>Governed execution, made visible.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ProofRow
