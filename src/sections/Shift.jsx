import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { useIsCompact } from '../hooks/useMediaQuery.js'
import { EASE } from '../lib/motion.js'
import s from './Shift.module.css'
import shared from './sections.module.css'

const STATS = [
  { value: 88, label: 'of organizations report regular AI use in at least one business function.' },
  { value: 39, label: 'are experimenting with AI agents.' },
  { value: 23, label: 'are scaling agentic AI somewhere in the enterprise.' },
]

/* Each named window is [start, end] in track progress (0–1). Windows within
   a beat are sequential and non-overlapping on purpose: a stat finishes
   fading and counting in, then holds exactly as-is until the next one
   starts — nothing keeps moving once it is readable. */
const CLAIM_OUT = [0.15, 0.24]
const Q1_IN = [0.17, 0.27]
const Q1_CUT = [0.31, 0.4]
const Q1_FADE = [0.37, 0.46]
const Q2_IN = [0.42, 0.52]
const PIVOT_UP = [0.54, 0.62]

const STAT_WINDOWS = [
  [0.58, 0.67],
  [0.7, 0.79],
  [0.82, 0.91],
]
const SOURCE_IN = [0.91, 0.95]
const GROUP_OUT = [0.95, 1]

/* The rail's four labels line up with where each beat's content is fully settled. */
const BEATS = [
  { at: 0, label: 'What changed' },
  { at: CLAIM_OUT[1], label: 'The old question' },
  { at: Q1_FADE[1], label: 'The new question' },
  { at: PIVOT_UP[1], label: 'What the data shows' },
]

function ScrollStat({ stat, window: win, progress }) {
  const [start, end] = win
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [26, 0])
  const filter = useTransform(progress, [start, end], ['blur(10px)', 'blur(0px)'])
  const count = useTransform(progress, [start, end], [0, stat.value])
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(count, 'change', (v) => setDisplay(Math.round(v)))

  return (
    <motion.div className={s.stat} style={{ opacity, y, filter }}>
      <div className={s.statValue}>
        {display}
        <span>%</span>
      </div>
      <p className={s.statLabel}>{stat.label}</p>
    </motion.div>
  )
}

function RevealStat({ stat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, stat.value, {
      duration: 1.6,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, stat.value, delay])

  return (
    <div className={s.stat} ref={ref}>
      <div className={s.statValue}>
        {display}
        <span>%</span>
      </div>
      <p className={s.statLabel}>{stat.label}</p>
    </div>
  )
}

function Quote() {
  return (
    <blockquote className={shared.quote}>
      <p className={shared.quoteText}>
        Everyone asks what AI can do for your business, but are you thinking about what AI can do to
        your business?
      </p>
      <cite className={shared.quoteCite}>
        Amit Zavery — President, Chief Product Officer &amp; COO, ServiceNow
      </cite>
    </blockquote>
  )
}

function Shift() {
  const trackRef = useRef(null)
  const compact = useIsCompact()
  const reduced = useReducedMotion()
  const [beat, setBeat] = useState(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let next = 0
    for (let i = 0; i < BEATS.length; i += 1) if (v >= BEATS[i].at) next = i
    setBeat((prev) => (prev === next ? prev : next))
  })

  /* 01 — the claim holds the stage, then clears it. */
  const claimOpacity = useTransform(scrollYProgress, CLAIM_OUT, [1, 0])
  const claimY = useTransform(scrollYProgress, CLAIM_OUT, [0, -70])
  const claimBlur = useTransform(scrollYProgress, CLAIM_OUT, ['blur(0px)', 'blur(14px)'])
  const claimScale = useTransform(scrollYProgress, CLAIM_OUT, [1, 0.94])

  /* 02–03 — the pivot: the old question arrives, is cut, and gives way. */
  const q1Opacity = useTransform(
    scrollYProgress,
    [Q1_IN[0], Q1_IN[1], Q1_DIM[0], Q1_DIM[1], Q1_OUT[0], Q1_OUT[1]],
    [0, 1, 1, 0.4, 0.4, 0],
  )
  const q1Y = useTransform(scrollYProgress, Q1_IN, [64, 0])
  const q1Blur = useTransform(scrollYProgress, Q1_IN, ['blur(18px)', 'blur(0px)'])
  const q1Scale = useTransform(scrollYProgress, Q1_DIM, [1, 0.5])
  const cut = useTransform(scrollYProgress, Q1_CUT, [0, 1])

  const q2Opacity = useTransform(scrollYProgress, Q2_IN, [0, 1])
  const q2Y = useTransform(scrollYProgress, Q2_IN, [56, 0])
  const q2Blur = useTransform(scrollYProgress, Q2_IN, ['blur(20px)', 'blur(0px)'])

  /* 04 — the pivot lifts out of the way and the evidence takes the stage. */
  const pivotY = useTransform(scrollYProgress, PIVOT_UP, ['0vh', '-19vh'])
  const pivotScale = useTransform(scrollYProgress, PIVOT_UP, [1, 0.44])
  const statsOpacity = useTransform(scrollYProgress, STATS_IN, [0, 1])
  const statsY = useTransform(scrollYProgress, STATS_IN, ['13vh', '8vh'])
  const sourceOpacity = useTransform(scrollYProgress, SOURCE_IN, [0, 1])

  /* Small screens and reduced-motion read the whole shift at once, unpinned. */
  if (compact || reduced) {
    return (
      <section className={`${s.section} ${s.static}`} id="shift">
        <div className="container">
          <div className="section-head section-head--wide">
            <span className="eyebrow">The shift</span>
            <h2 className="headline">AI is moving from answering to acting</h2>
            <p className="subtext">
              AI is no longer just drafting, summarizing, classifying, or searching. It is beginning
              to plan, decide, coordinate, call tools, update systems, and complete work.
            </p>
          </div>

          <div className={s.questions}>
            <p className={`${s.question} ${s.questionFrom}`}>
              <span className={s.questionInner}>
                Can AI help?
                <span className={s.strike} aria-hidden="true" />
              </span>
            </p>
            <p className={s.question}>
              <span className={`${s.questionInner} ${s.fill} ${s.fillMoving}`}>
                Can AI be trusted to act?
              </span>
            </p>
          </div>

          <div className={s.stats}>
            {STATS.map((stat, i) => (
              <RevealStat key={stat.value} stat={stat} delay={i * 0.12} />
            ))}
          </div>

          <p className={s.source}>Source: McKinsey, The State of AI: Global Survey 2025</p>

          <Reveal delay={0.1} style={{ marginTop: 'clamp(64px, 9vw, 110px)' }}>
            <Quote />
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className={s.section} id="shift">
      <div className={s.track} ref={trackRef}>
        <div className={s.stage}>
          <div className={s.stageTop}>
            <div className="container">
              <span className="eyebrow">The shift</span>
            </div>
          </div>

          <div className={s.center}>
            {/* 01 — the claim */}
            <motion.div
              className={s.layer}
              style={{
                opacity: claimOpacity,
                y: claimY,
                filter: claimBlur,
                scale: claimScale,
              }}
            >
              <h2 className={s.title}>AI is moving from answering to acting</h2>
              <p className={s.lede}>
                AI is no longer just drafting, summarizing, classifying, or searching. It is
                beginning to plan, decide, coordinate, call tools, update systems, and complete work.
              </p>
            </motion.div>

            {/* 02–03 — the pivot */}
            <motion.div className={s.layer} style={{ y: pivotY, scale: pivotScale }}>
              <motion.p
                className={`${s.question} ${s.questionFrom}`}
                style={{ opacity: q1Opacity, y: q1Y, filter: q1Blur, scale: q1Scale }}
              >
                <span className={`${s.questionInner} ${s.fill}`}>
                  Can AI help?
                  <motion.span className={s.strike} style={{ scaleX: cut }} aria-hidden="true" />
                </span>
              </motion.p>

              <motion.p
                className={s.question}
                style={{ opacity: q2Opacity, y: q2Y, filter: q2Blur }}
              >
                <span className={`${s.questionInner} ${s.fill} ${s.fillMoving}`}>
                  Can AI be trusted to act?
                </span>
              </motion.p>
            </motion.div>

            {/* 04 — the evidence */}
            <motion.div className={s.layer} style={{ opacity: statsOpacity, y: statsY }}>
              <div className={s.stats}>
                {STATS.map((stat, i) => (
                  <ScrollStat key={stat.value} stat={stat} index={i} progress={scrollYProgress} />
                ))}
              </div>
              <motion.p className={s.source} style={{ opacity: sourceOpacity }}>
                Source: McKinsey, The State of AI: Global Survey 2025
              </motion.p>
            </motion.div>
          </div>

          <div className={s.stageFoot}>
            <div className="container">
              <div className={s.rail}>
                <span className={s.railIndex}>0{beat + 1}</span>
                <span className={s.railLabel}>{BEATS[beat].label}</span>
                <span className={s.railTrack}>
                  <motion.span className={s.railFill} style={{ scaleX: scrollYProgress }} />
                </span>
                <span className={s.railIndex}>0{BEATS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${s.after}`}>
        <Reveal>
          <Quote />
        </Reveal>
      </div>
    </section>
  )
}

export default Shift
