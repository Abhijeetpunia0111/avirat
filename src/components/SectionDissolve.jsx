import { useMemo, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import s from './SectionDissolve.module.css'

const COLS = 14
const ROWS = 4

/* A mosaic of tiles between two sections, seeded from `from` and flipping to
   `to` tile-by-tile as the strip scrolls through view. Thresholds carry a
   diagonal bias (top-left tiles flip first) plus enough randomness that the
   frontier reads as a rough dissolve rather than a straight line. */
function buildThresholds() {
  const diag = COLS + ROWS - 2
  return Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    const base = (col + row) / diag
    return Math.min(1, Math.max(0, base * 0.55 + Math.random() * 0.45))
  })
}

function SectionDissolve({ from, to }) {
  const ref = useRef(null)
  const tileRefs = useRef([])
  const thresholds = useMemo(buildThresholds, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    tileRefs.current.forEach((el, i) => {
      if (el) el.style.backgroundColor = v >= thresholds[i] ? to : from
    })
  })

  if (from === to) return null

  return (
    <div className={s.strip} ref={ref} aria-hidden="true">
      {thresholds.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            tileRefs.current[i] = el
          }}
          className={s.tile}
          style={{ backgroundColor: from }}
        />
      ))}
    </div>
  )
}

export default SectionDissolve
