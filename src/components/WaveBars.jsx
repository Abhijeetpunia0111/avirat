import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'
import styles from './WaveBars.module.css'

/**
 * A dense field of hairline rules tracing a shallow dip curve — the page's one
 * ambient texture. Kept flat and monochrome; the curve is the idea, not the fill.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.006 } },
}

const barVariant = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: EASE } },
}

function WaveBars({ count = 96, tone = 'accent', className = '' }) {
  const bars = Array.from({ length: count }, (_, i) => {
    const t = Math.abs(i / (count - 1) - 0.5) * 2 // 0 at centre -> 1 at the edges
    return {
      height: 14 + Math.pow(t, 1.8) * 86,
      opacity: 0.16 + Math.pow(t, 1.5) * 0.62,
    }
  })

  return (
    <motion.div
      className={`${styles.wave} ${tone === 'ink' ? styles.ink : styles.accentTone} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8%' }}
      aria-hidden="true"
    >
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className={styles.bar}
          style={{ height: `${b.height}%`, opacity: b.opacity }}
          variants={barVariant}
        />
      ))}
    </motion.div>
  )
}

export default WaveBars
