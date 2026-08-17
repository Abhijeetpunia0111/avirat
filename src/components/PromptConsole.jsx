import { motion, useTransform } from 'framer-motion'
import styles from './PromptConsole.module.css'

const PROMPT = 'Find me the best suitable candidate from all the applicants.'

/* Fan-out traces: prompt bar -> execution core, drawn like a CPU pin escape. */
const TRACES = [
  'M300 8 V34 H92 V96',
  'M300 8 V44 H168 V96',
  'M300 8 V56 H244 V96',
  'M300 8 V56 H356 V96',
  'M300 8 V44 H432 V96',
  'M300 8 V34 H508 V96',
]

function PromptConsole({ progress, typeRange, submitRange, isStatic = false }) {
  const [typeStart, typeEnd] = typeRange
  const [submitStart, submitEnd] = submitRange

  const typed = useTransform(progress, [typeStart, typeEnd], [0, 1])
  const text = useTransform(typed, (v) => PROMPT.slice(0, Math.round(v * PROMPT.length)))
  const caretOpacity = useTransform(progress, [typeEnd, submitStart], [1, 0])

  const consoleY = useTransform(progress, [submitStart, submitEnd], [0, -26])
  const consoleOpacity = useTransform(progress, [submitStart, submitEnd, submitEnd + 0.06], [1, 0.6, 0])
  const consoleScale = useTransform(progress, [submitStart, submitEnd], [1, 0.94])

  const runActive = useTransform(typed, (v) => (v > 0.98 ? 1 : 0.35))
  const traceDraw = useTransform(progress, [typeEnd, submitEnd], [0, 1])
  const traceOpacity = useTransform(progress, [typeEnd, submitEnd, submitEnd + 0.08], [0, 1, 0])

  const consoleStyle = isStatic ? undefined : { y: consoleY, opacity: consoleOpacity, scale: consoleScale }

  return (
    <div className={styles.wrap}>
      <motion.div className={styles.console} style={consoleStyle}>
        <div className={styles.chrome}>
          <span className={styles.chromeDot} />
          <span className={styles.chromeLabel}>avirat runtime — new request</span>
          <span className={styles.chromeMeta}>RUN-4417</span>
        </div>

        <div className={styles.field}>
          <span className={styles.prefix}>&gt;</span>
          <span className={styles.text}>
            <motion.span>{isStatic ? PROMPT : text}</motion.span>
            <motion.span
              className={styles.caret}
              style={isStatic ? undefined : { opacity: caretOpacity }}
            />
          </span>
          <motion.span className={styles.run} style={isStatic ? undefined : { opacity: runActive }}>
            Run
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>

        <div className={styles.foot}>
          <span className={styles.footItem}>Requester: Talent Ops</span>
          <span className={styles.footSep} />
          <span className={styles.footItem}>Scope: Requisition #2291</span>
          <span className={styles.footSep} />
          <span className={styles.footItem}>Policy set: Hiring / EU</span>
        </div>
      </motion.div>

      <motion.svg
        className={styles.traces}
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
        style={isStatic ? { opacity: 0.9 } : { opacity: traceOpacity }}
        aria-hidden="true"
      >
        {TRACES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={isStatic ? undefined : { pathLength: traceDraw }}
            opacity={0.35 + (i % 3) * 0.2}
          />
        ))}
        {TRACES.map((d, i) => (
          <circle key={`p${d}`} r="2.6" fill="var(--accent)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={d} begin={`${i * 0.16}s`} />
          </circle>
        ))}
      </motion.svg>
    </div>
  )
}

export default PromptConsole
