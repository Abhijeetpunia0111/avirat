import { useRef } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Magnetic from '../components/Magnetic.jsx'
import Reveal from '../components/Reveal.jsx'
import WaveBars from '../components/WaveBars.jsx'
import q from './ThreeQuestions.module.css'

/* The label names the check each question makes — the set is parallel, not sequential. */
const QUESTIONS = [
  {
    mark: 'Authority',
    title: 'Is it authorized?',
    text: 'Are actions controlled by policy, permissions, and human approval?',
  },
  {
    mark: 'Reliability',
    title: 'Is it executable?',
    text: 'Can work run reliably across systems, exceptions, and recovery paths?',
  },
  {
    mark: 'Evidence',
    title: 'Can it be proven?',
    text: 'Can every decision, action, cost, and outcome be traced?',
  },
]

/* Each question owns a third of the track. Within that third the beats run:
   blur in from below → the words fill left to right → the answer arrives →
   blur out upward as the next question takes the stage. */
const ENTER = [0, 0.18]
const FILL = [0.17, 0.62]
const SUB = [0.5, 0.68]
const EXIT = [0.86, 1]

/* A greyed word with an accent copy of itself clipped in from the left. Two
   nodes rather than an interpolated colour keeps the palette in the stylesheet,
   where the rest of the page's colour decisions live. */
function Word({ text, progress, start, end }) {
  const cover = useTransform(progress, [start, end], [100, 0])
  const clipPath = useMotionTemplate`inset(0 ${cover}% 0 0)`

  return (
    <span className={q.word}>
      {text}
      <motion.span className={q.wordFill} style={{ clipPath }} aria-hidden="true">
        {text}
      </motion.span>
    </span>
  )
}

function Slide({ item, index, total, progress }) {
  const band = 1 / total
  const local = useTransform(progress, [index * band, (index + 1) * band], [0, 1])
  const isLast = index === total - 1

  /* The last question holds rather than leaving — the closing line follows it. */
  const stops = isLast ? ENTER : [...ENTER, ...EXIT]
  const opacity = useTransform(local, stops, isLast ? [0, 1] : [0, 1, 1, 0])
  const y = useTransform(local, stops, isLast ? [48, 0] : [48, 0, 0, -48])
  const blur = useTransform(local, stops, isLast ? [14, 0] : [14, 0, 0, 14])
  const filter = useMotionTemplate`blur(${blur}px)`

  const subOpacity = useTransform(local, SUB, [0, 1])
  const subY = useTransform(local, SUB, [20, 0])
  const subBlur = useTransform(local, SUB, [10, 0])
  const subFilter = useMotionTemplate`blur(${subBlur}px)`

  const words = item.title.split(' ')
  const step = (FILL[1] - FILL[0]) / (words.length + 0.6)

  return (
    <motion.div className={q.slide} style={{ opacity, y, filter }}>
      <span className={q.slideMark}>{item.mark}</span>

      <h3 className={q.slideTitle}>
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            text={word}
            progress={local}
            start={FILL[0] + i * step}
            end={FILL[0] + i * step + step * 1.6}
          />
        ))}
      </h3>

      <motion.p className={q.slideText} style={{ opacity: subOpacity, y: subY, filter: subFilter }}>
        {item.text}
      </motion.p>
    </motion.div>
  )
}

const LEAD = 'Before AI work can scale, every run needs to answer three questions.'

/* Owns the track ref, so the scroll hook only exists when the track does. */
function Scroller() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  /* The horizon doubles as the progress read-out: the accent field is clipped
     in from the left across the whole track, the same left-to-right sweep the
     words use. It replaces a separate indicator rather than sitting beside one. */
  const waveCover = useTransform(scrollYProgress, [0.02, 0.96], [100, 0])
  const waveClip = useMotionTemplate`inset(0 ${waveCover}% 0 0)`

  return (
    <div className={q.track} ref={trackRef} style={{ '--q-count': QUESTIONS.length }}>
      <div className={q.stage}>
        <div className={`container ${q.stageInner}`}>
          <p className={q.lead}>{LEAD}</p>

          <div className={q.stack}>
            {QUESTIONS.map((item, i) => (
              <Slide
                key={item.title}
                item={item}
                index={i}
                total={QUESTIONS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className={q.horizon} aria-hidden="true">
          <div className={q.waveHolder}>
            <div className={q.waveStack}>
              <div className={q.waveBase}>
                <WaveBars count={104} tone="ink" />
              </div>
              <motion.div className={q.waveFill} style={{ clipPath: waveClip }}>
                <WaveBars count={104} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThreeQuestions() {
  const reduced = useReducedMotion()

  return (
    <section className={`section--alt ${q.section}`} id="built-to-execute">
      <div className={`container ${q.head}`}>
        <Reveal className="section-head section-head--wide" style={{ marginBottom: 0 }}>
          <span className="eyebrow">Built to execute</span>
          <h2 className="headline">avirat.ai is built for that trust.</h2>
          <p className="subtext">
            The governed execution layer for enterprise AI. It turns business intent into controlled,
            coordinated, and traceable execution across the tools, teams, and systems your business
            already runs.
          </p>
        </Reveal>
      </div>

      {reduced ? (
        <div className={`container ${q.staticList}`}>
          <p className={q.lead}>{LEAD}</p>
          {QUESTIONS.map((item) => (
            <div key={item.title} className={q.staticItem}>
              <span className={q.slideMark}>{item.mark}</span>
              <h3 className={q.staticTitle}>{item.title}</h3>
              <p className={q.staticText}>{item.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <Scroller />
      )}

      <div className={`container ${q.closing}`}>
        <Reveal className={q.closingRow}>
          <p className={q.closingLine}>avirat.ai answers all three at runtime.</p>
          <Magnetic href="#how-it-works" className="btn btn-primary">
            See how it works
            <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

export default ThreeQuestions
