import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { useIsCompact, useReducedMotion } from '../hooks/useMediaQuery.js'
import s from './Farewell.module.css'

/* The operating reality governed execution removes. */
const LEAVING = [
  'prompt-by-prompt pilots',
  'ungoverned agents',
  'untraceable AI decisions',
  'approvals lost in inboxes',
  'audit trails rebuilt after the fact',
  'unbounded token spend',
]

/* What the runtime puts in its place. */
const REPLACING = [
  {
    label: 'Bounded authority',
    meta: 'Policy, permissions, and access checked before anything runs',
    icon: <path d="M12 3l7.5 2.8v5.6c0 4.7-3.2 8.1-7.5 9.4-4.3-1.3-7.5-4.7-7.5-9.4V5.8L12 3z" />,
  },
  {
    label: 'Human checkpoints',
    meta: 'Review, approval, or escalation wherever judgment is needed',
    icon: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.2 12.3l2.6 2.6 5-5.2" />,
  },
  {
    label: 'Sealed evidence',
    meta: 'Decisions, actions, and outcomes recorded as the work runs',
    icon: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h3" />,
  },
  {
    label: 'Cost ceilings',
    meta: 'Spend, retries, and tool calls capped per run',
    icon: <path d="M13 3L5 14h5l-1 7 8-11h-5l1-7z" />,
  },
]

const STEP_VH = 34

function Markers() {
  return (
    <div className={s.markers}>
      {REPLACING.map((item, i) => (
        <Reveal key={item.label} delay={0.1 + i * 0.08} className={s.marker}>
          <span className={s.markerBadge}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
          </span>
          <span className={s.markerLabel}>{item.label}</span>
          <span className={s.markerMeta}>{item.meta}</span>
        </Reveal>
      ))}
    </div>
  )
}

function Farewell() {
  const trackRef = useRef(null)
  const compact = useIsCompact()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const fill = useTransform(scrollYProgress, [0, 1], ['8%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(LEAVING.length - 1, Math.max(0, Math.floor(v * LEAVING.length)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const lead = (
    <>
      <span className="eyebrow">The handover</span>
      <div className={s.leadTitleRow}>
        <h2 className={s.leadTitle}>Wave goodbye to</h2>
        <svg className={s.arrow} viewBox="0 0 88 52" width="80" height="47" aria-hidden="true">
          <path
            d="M4 46C9 18 34 3 70 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M60 9.5L70.5 15.2L63 23"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )

  /* Small screens and reduced-motion get the full list, unpinned. */
  if (compact || reduce) {
    return (
      <section className={s.section} id="handover">
        <div className="container">
          <Reveal className={s.leadStatic}>{lead}</Reveal>

          <ul className={s.listStatic}>
            {LEAVING.map((item, i) => (
              <Reveal key={item} as="li" delay={i * 0.06} className={s.itemStatic}>
                <span className={s.itemText}>{item}</span>
              </Reveal>
            ))}
          </ul>

          <Markers />
        </div>
      </section>
    )
  }

  return (
    <section className={s.section} id="handover">
      <div
        className={s.track}
        ref={trackRef}
        style={{ height: `calc(100vh + ${LEAVING.length * STEP_VH}vh)` }}
      >
        <div className={s.stage}>
          <div className={`container ${s.inner}`}>
            <div className={s.row}>
              <div className={s.lead}>
                {lead}

                <div className={s.progress}>
                  <span className={s.count}>
                    {String(active + 1).padStart(2, '0')}
                    <i>/</i>
                    {String(LEAVING.length).padStart(2, '0')}
                  </span>
                  <span className={s.progressTrack}>
                    <motion.span className={s.progressFill} style={{ width: fill }} />
                  </span>
                </div>
              </div>

              <div className={s.viewport}>
                <ul
                  className={s.list}
                  style={{ transform: `translateY(calc(${-active} * var(--row)))` }}
                >
                  {LEAVING.map((item, i) => (
                    <li
                      key={item}
                      className={`${s.item} ${i === active ? s.itemActive : ''} ${i < active ? s.itemGone : ''}`}
                    >
                      <span className={s.itemText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Markers />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Farewell
