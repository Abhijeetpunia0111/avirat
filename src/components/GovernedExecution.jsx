import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import ExecutionCore from './ExecutionCore.jsx'
import PromptConsole from './PromptConsole.jsx'
import { useIsCompact } from '../hooks/useMediaQuery.js'
import styles from './GovernedExecution.module.css'

const STAGES = [
  {
    id: 'governance',
    pillar: 'Governance',
    claim: 'Control what AI is allowed to do',
    heading: 'Before anything runs, the request is bounded.',
    body: 'The runtime assembles only approved context, then tests the request against authority, data access, tool use, and cost rules. Nothing reaches a system it was never permitted to touch.',
    side: 'right',
    steps: [
      {
        n: '01',
        title: 'Context assembled',
        text: 'Approved knowledge, permissions, workflow history, and system context are gathered for the task.',
      },
      {
        n: '02',
        title: 'Policy checked',
        text: 'The request is evaluated against authority, data access, tool use, approval, and cost rules.',
      },
    ],
    readouts: [
      'Candidate records scoped to requisition #2291',
      'Ranking bound to the approved job specification',
      'Protected attributes excluded from scoring',
    ],
  },
  {
    id: 'execution',
    pillar: 'Execution',
    claim: 'Coordinate how AI work gets done',
    heading: 'Work runs across your systems, inside defined limits.',
    body: 'Agents, tools, and APIs are orchestrated as one workflow. Where judgment is required, the run pauses for a person — and every action carries a spend ceiling and an escalation path.',
    side: 'left',
    steps: [
      {
        n: '03',
        title: 'Approval routed',
        text: 'Human review is inserted where risk, policy, or operating thresholds require it.',
      },
      {
        n: '04',
        title: 'Work executed',
        text: 'Approved actions run across systems, tools, agents, and APIs within defined limits and escalation paths.',
      },
    ],
    readouts: [
      'Shortlist held for recruiter approval',
      'ATS write scoped to the shortlist field only',
      'Retry budget 3 · spend ceiling $4.20',
    ],
  },
  {
    id: 'assurance',
    pillar: 'Assurance',
    claim: 'Prove what happened and why',
    heading: 'Every step leaves a record you can defend.',
    body: 'Decisions, tool calls, approvals, exceptions, costs, and outcomes are captured as the work runs — not reconstructed afterwards. The run is reviewable the moment it finishes.',
    side: 'right',
    steps: [
      {
        n: '05',
        title: 'Trace recorded',
        text: 'Every decision, tool call, approval, exception, cost, and outcome is captured as the work runs.',
      },
      {
        n: '06',
        title: 'Evidence ready',
        text: 'Teams can review, audit, troubleshoot, improve, and scale the workflow with a complete execution record.',
      },
    ],
    readouts: [
      '17 decisions · 6 tool calls · 1 approval',
      'Reason recorded against every candidate',
      'Run exportable to the audit workspace',
    ],
  },
]

const PHASES = ['Intent', 'Governance', 'Execution', 'Assurance']

/* Scroll timeline keyframes for the pinned stage. */
const TYPE_RANGE = [0.05, 0.2]
const SUBMIT_RANGE = [0.21, 0.28]
const PANEL_WINDOWS = [
  [0.32, 0.38, 0.5, 0.56],
  [0.58, 0.64, 0.72, 0.78],
  [0.8, 0.86, 0.97, 1.0],
]

function StagePanel({ stage, progress, window: win, compact }) {
  const [inStart, inEnd, outStart, outEnd] = win
  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0])
  const y = useTransform(progress, [inStart, inEnd, outStart, outEnd], [34, 0, 0, -26])

  const content = (
    <>
      <div className={styles.panelHead}>
        <span className={styles.pillar}>{stage.pillar}</span>
        <span className={styles.claim}>{stage.claim}</span>
      </div>
      <h3 className={styles.panelHeading}>{stage.heading}</h3>
      <p className={styles.panelBody}>{stage.body}</p>

      <ol className={styles.steps}>
        {stage.steps.map((step) => (
          <li key={step.n}>
            <span className={styles.stepN}>{step.n}</span>
            <span>
              <b>{step.title}</b>
              <em>{step.text}</em>
            </span>
          </li>
        ))}
      </ol>

      <ul className={styles.readouts}>
        {stage.readouts.map((r) => (
          <li key={r}>
            <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
              <path d="M2.5 6.4L4.8 8.7 9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {r}
          </li>
        ))}
      </ul>
    </>
  )

  if (compact) {
    return (
      <motion.div
        className={styles.panelCompact}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.16, 0.8, 0.24, 1] }}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <div className={`${styles.panelSlot} ${stage.side === 'left' ? styles.slotLeft : styles.slotRight}`}>
      <motion.div className={styles.panel} style={{ opacity, y }}>
        {content}
      </motion.div>
    </div>
  )
}

function GovernedExecution() {
  const trackRef = useRef(null)
  const compact = useIsCompact()
  const [activeStage, setActiveStage] = useState(0)
  const [shift, setShift] = useState(240)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      setShift(Math.min(Math.max(w * 0.21, 150), 300))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useMotionValueEvent(progress, 'change', (v) => {
    const next = v < 0.3 ? 0 : v < 0.57 ? 1 : v < 0.79 ? 2 : 3
    setActiveStage((prev) => (prev === next ? prev : next))
  })

  const offset = useTransform(
    progress,
    [0, 0.28, 0.36, 0.52, 0.6, 0.74, 0.82, 1],
    [0, 0, -1, -1, 1, 1, -1, -1],
  )
  const coreX = useTransform(offset, (v) => v * shift)
  const coreY = useTransform(progress, [0.2, 0.34], [40, 74])
  const coreScale = useTransform(progress, [0.2, 0.34], [0.82, 1])
  const separation = useTransform(progress, [0.26, 0.38], [3, 48])
  const rotation = useTransform(progress, [0.26, 1], [-16, 26])
  const railFill = useTransform(progress, [0.28, 1], ['0%', '100%'])

  /* Static values for the compact, non-pinned layout. */
  const staticProgress = useMotionValue(1)
  const staticSeparation = useMotionValue(50)
  const staticRotation = useMotionValue(12)

  if (compact) {
    return (
      <section className={styles.section} id="how-it-works">
        <div className="container">
          <div className="section-head section-head--wide">
            <span className="eyebrow">From intent to evidence</span>
            <h2 className="headline">See how governed execution works</h2>
            <p className="subtext">
              A business request should not move from prompt to action unchecked. avirat.ai passes
              work through context, policy, approvals, system actions, and evidence capture.
            </p>
          </div>

          <div className={styles.compactStage}>
            <div className={styles.compactConsole}>
              <PromptConsole
                progress={staticProgress}
                typeRange={TYPE_RANGE}
                submitRange={SUBMIT_RANGE}
                isStatic
              />
            </div>
            <div className={styles.compactCore}>
              <ExecutionCore
                progress={staticProgress}
                activeStage={1}
                separation={staticSeparation}
                rotation={staticRotation}
              />
            </div>
          </div>

          <div className={styles.compactPanels}>
            {STAGES.map((stage, i) => (
              <StagePanel key={stage.id} stage={stage} progress={progress} window={PANEL_WINDOWS[i]} compact />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className="section-head section-head--wide">
          <span className="eyebrow">From intent to evidence</span>
          <h2 className="headline">See how governed execution works</h2>
          <p className="subtext">
            A business request should not move from prompt to action unchecked. avirat.ai passes work
            through context, policy, approvals, system actions, and evidence capture.
          </p>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        <div className={styles.stage}>
          <div className={styles.statusBar}>
            <div className={`container ${styles.statusInner}`}>
              <span className={styles.statusRun}>RUN-4417</span>
              <div className={styles.phases}>
                {PHASES.map((phase, i) => (
                  <span
                    key={phase}
                    className={`${styles.phase} ${i === activeStage ? styles.phaseActive : ''} ${i < activeStage ? styles.phaseDone : ''}`}
                  >
                    {phase}
                  </span>
                ))}
              </div>
              <span className={styles.statusState}>
                {activeStage === 0 ? 'awaiting intent' : activeStage === 3 ? 'evidence sealed' : 'executing'}
              </span>
            </div>
          </div>

          <motion.div
            className={styles.coreHolder}
            style={{ x: coreX, y: coreY, scale: coreScale }}
          >
            <ExecutionCore
              progress={progress}
              activeStage={activeStage}
              separation={separation}
              rotation={rotation}
            />
          </motion.div>

          <div className={styles.consoleHolder}>
            <PromptConsole progress={progress} typeRange={TYPE_RANGE} submitRange={SUBMIT_RANGE} />
          </div>

          {STAGES.map((stage, i) => (
            <StagePanel key={stage.id} stage={stage} progress={progress} window={PANEL_WINDOWS[i]} />
          ))}

          <div className={styles.rail} aria-hidden="true">
            <motion.span className={styles.railFill} style={{ height: railFill }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GovernedExecution
