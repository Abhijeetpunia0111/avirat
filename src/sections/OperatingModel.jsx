import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { useIsCompact } from '../hooks/useMediaQuery.js'
import { EASE } from '../lib/motion.js'
import s from './OperatingModel.module.css'

const PILLARS = [
  {
    id: 'governance',
    name: 'Governance',
    caption: 'Policy & authority',
    claim: 'Control what AI is allowed to do.',
    text: 'Set boundaries for what AI can access, decide, trigger, approve, escalate, or spend.',
  },
  {
    id: 'execution',
    name: 'Execution',
    caption: 'Orchestration',
    claim: 'Coordinate how AI work gets done.',
    text: 'Orchestrate agents, tools, workflows, systems, approvals, exceptions, and recovery paths.',
  },
  {
    id: 'assurance',
    name: 'Assurance',
    caption: 'Evidence & trace',
    claim: 'Prove what happened and why.',
    text: 'Capture the evidence needed to review, trust, audit, improve, and scale AI work.',
  },
]

const PLATE_Y = [116, 190, 264]

function plate(cy) {
  return `M60 ${cy} L170 ${cy - 46} L280 ${cy} L170 ${cy + 46} Z`
}

function ModelVisual({ active }) {
  return (
    <svg
      viewBox="0 0 340 356"
      className={s.modelSvg}
      role="img"
      aria-label="Business intent passes through governance, execution, and assurance before it reaches your systems of record"
    >
      {/* what enters the model */}
      <text x="170" y="24" textAnchor="middle" className={s.modelCap}>
        Business intent
      </text>
      <line x1="170" y1="36" x2="170" y2="66" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />

      {PILLARS.map((pillar, i) => {
        const cy = PLATE_Y[i]
        const isActive = active === i
        return (
          <motion.g
            key={pillar.id}
            animate={{ opacity: isActive ? 1 : 0.42 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.g animate={{ y: isActive ? -6 : 0 }} transition={{ duration: 0.55, ease: EASE }}>
              <path
                d={plate(cy)}
                fill="var(--surface)"
                stroke={isActive ? 'var(--accent)' : 'var(--line-strong)'}
                strokeWidth={isActive ? 1.6 : 1}
                strokeLinejoin="round"
              />
              <circle cx="60" cy={cy} r="2.4" fill={isActive ? 'var(--accent)' : 'var(--line-strong)'} />
              <circle cx="280" cy={cy} r="2.4" fill={isActive ? 'var(--accent)' : 'var(--line-strong)'} />
              <text
                x="170"
                y={cy - 1}
                textAnchor="middle"
                className={`${s.plateName} ${isActive ? s.plateNameActive : ''}`}
              >
                {pillar.name}
              </text>
              <text x="170" y={cy + 15} textAnchor="middle" className={s.plateCaption}>
                {pillar.caption}
              </text>
            </motion.g>
          </motion.g>
        )
      })}

      {/* what the model runs on */}
      <line x1="170" y1="310" x2="170" y2="330" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
      <text x="170" y="348" textAnchor="middle" className={s.modelCap}>
        Systems of record
      </text>
    </svg>
  )
}

function Header() {
  return (
    <>
      <span className="eyebrow">The operating model</span>
      <h2 className="headline">Autonomy needs an operating model.</h2>
      <p className="subtext">
        avirat.ai brings governance, execution, and assurance together so AI work can be controlled
        while it runs, not reviewed only after it is done.
      </p>
    </>
  )
}

function PillarList({ active, onPoint }) {
  return (
    <div className={s.pillarList}>
      {PILLARS.map((pillar, i) => (
        <div
          key={pillar.id}
          className={`${s.pillarCard} ${active === i ? s.pillarCardActive : ''}`}
          onMouseEnter={() => onPoint(i)}
          onMouseLeave={() => onPoint(null)}
          onFocus={() => onPoint(i)}
          onBlur={() => onPoint(null)}
          tabIndex={0}
        >
          <div className={s.pillarTop}>
            <span className={s.pillarName}>{pillar.name}</span>
            <span className={s.pillarIndex}>0{i + 1}</span>
          </div>
          <p className={s.pillarClaim}>{pillar.claim}</p>
          <p className={s.pillarText}>{pillar.text}</p>
        </div>
      ))}
    </div>
  )
}

function OperatingModel() {
  const trackRef = useRef(null)
  const compact = useIsCompact()
  const reduced = useReducedMotion()
  const [stepped, setStepped] = useState(0)
  const [pointed, setPointed] = useState(null)
  const active = pointed ?? stepped

  /* The pin holds while focus walks 01 → 02 → 03, then releases. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(PILLARS.length - 1, Math.max(0, Math.floor(v * PILLARS.length)))
    setStepped((prev) => (prev === next ? prev : next))
  })

  /* Small screens and reduced-motion read the whole model at once, unpinned. */
  if (compact || reduced) {
    return (
      <section className={`${s.section} ${s.static}`} id="operating-model">
        <div className={s.bg} aria-hidden="true" />

        <div className="container">
          <Reveal className={s.head}>
            <Header />
          </Reveal>

          <div className={s.layout}>
            <div className={s.visual}>
              <ModelVisual active={active} />
            </div>
            <PillarList active={active} onPoint={setPointed} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={s.section} id="operating-model">
      <div className={s.track} ref={trackRef} style={{ '--pillar-count': PILLARS.length }}>
        <div className={s.stage}>
          {/* Inside the sticky stage, so the ground stays viewport-sized while pinned. */}
          <div className={s.bg} aria-hidden="true" />

          <div className={`container ${s.stageInner}`}>
            <div className={s.head}>
              <Header />
            </div>

            <div className={s.layout}>
              <div className={s.visual}>
                <ModelVisual active={active} />
              </div>
              <PillarList active={active} onPoint={setPointed} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OperatingModel
