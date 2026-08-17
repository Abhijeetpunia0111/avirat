import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

function Reveal({ children, delay = 0, y = 14, className, style, as = 'div' }) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

export default Reveal
