import Reveal from '../components/Reveal.jsx'
import s from './sections.module.css'

const PROOFS = [
  {
    title: 'Security & compliance',
    text: 'Permission-aware execution, role-based access, approvals, and reviewable evidence.',
    icon: <path d="M12 3l7.5 2.8v5.6c0 4.7-3.2 8.1-7.5 9.4-4.3-1.3-7.5-4.7-7.5-9.4V5.8L12 3z" />,
  },
  {
    title: 'Runtime governance',
    text: 'Policies, approval rules, exception handling, and human-in-the-loop controls built into execution.',
    icon: <path d="M4 7h16M4 12h16M4 17h16M9 4.5v5M15 9.5v5M7 14.5v5" />,
  },
  {
    title: 'Operating controls',
    text: 'Usage visibility, execution limits, workflow guardrails, retry controls, and model routing.',
    icon: <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 8v4l2.8 2.8" />,
  },
  {
    title: 'Model-agnostic execution',
    text: 'Keep policies, workflows, evidence, and assurance consistent as models, tools, and architectures evolve.',
    icon: <path d="M12 3v3M12 11v2M12 18v3M4 8.5h5M15 8.5h5M4 15.5h5M15 15.5h5M9 8.5a3 3 0 1 0 6 0 3 3 0 1 0-6 0M9 15.5a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />,
  },
  {
    title: 'Enterprise integrations',
    text: 'Connectivity across systems, tools, APIs, data sources, models, and existing workflows.',
    icon: <path d="M10 14L4.5 8.5a3.6 3.6 0 0 1 5-5L15 9M14 10l5.5 5.5a3.6 3.6 0 0 1-5 5L9 15" />,
  },
  {
    title: 'Deployment flexibility',
    text: 'SaaS, private hosted, on-premise, or air-gapped options for enterprise operating requirements.',
    icon: <path d="M4 7.5a8 4 0 1 0 16 0 8 4 0 1 0-16 0M4 7.5v9c0 2.2 3.6 4 8 4s8-1.8 8-4v-9M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />,
  },
]

function Enterprise() {
  return (
    <section className="section" id="enterprise">
      <div className="container">
        <Reveal className="section-head section-head--wide">
          <span className="eyebrow">Enterprise readiness</span>
          <h2 className="headline">Built for environments where every AI action has to stand up.</h2>
        </Reveal>

        <div className={s.proofGrid}>
          {PROOFS.map((proof, i) => (
            <Reveal key={proof.title} delay={(i % 3) * 0.07} className={s.proof}>
              <svg
                className={s.proofIcon}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {proof.icon}
              </svg>
              <h3 className={s.proofTitle}>{proof.title}</h3>
              <p className={s.proofText}>{proof.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className={s.enterpriseClosing}>
            avirat.ai is designed for the realities of production AI with{' '}
            <b>control, accountability, interoperability, and proof.</b>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Enterprise
