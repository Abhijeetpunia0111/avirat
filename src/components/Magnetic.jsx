import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { stiffness: 300, damping: 22, mass: 0.4 }

/* Wraps an interactive element so it pulls toward the cursor on hover and
   snaps back on leave. `strength` controls how far it travels relative to
   the cursor's offset from centre — kept small so it reads as precision,
   not wobble. */
function Magnetic({ as = 'a', strength = 0.35, className, style, children, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default Magnetic
