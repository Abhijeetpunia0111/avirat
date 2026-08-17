import { motion } from 'framer-motion'
import WaveBars from './WaveBars.jsx'
import { EASE } from '../lib/motion.js'
import styles from './Hero.module.css'

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.12 + i * 0.1, ease: EASE },
  }),
}

function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <motion.span className={styles.label} variants={rise} initial="hidden" animate="show" custom={0}>
          The governed operating layer for enterprise AI
        </motion.span>

        <motion.h1 className={styles.title} variants={rise} initial="hidden" animate="show" custom={1}>
          Make enterprise AI
          <span className={styles.titleAccent}> executable</span>
        </motion.h1>

        <motion.p className={styles.lede} variants={rise} initial="hidden" animate="show" custom={2}>
          avirat.ai moves AI out of pilots, prompts, and isolated agents into governed execution
          across real systems, roles, policies, approvals, costs, and evidence.
        </motion.p>

        <motion.div className={styles.ctas} variants={rise} initial="hidden" animate="show" custom={3}>
          <a href="#get-started" className="btn btn-primary">
            Book an AI execution assessment
            <svg className="btn-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn btn-secondary">
            See governed execution in action
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.horizon}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
      >
        <div className={`container ${styles.horizonHead}`}>
          <span>Every run: context, policy, approval, execution, evidence.</span>
        </div>
        <div className={styles.waveHolder}>
          <WaveBars count={104} />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
