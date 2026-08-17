import { motion, useTransform } from 'framer-motion'
import styles from './ExecutionCore.module.css'

/* Top plate first — index 0 sits highest in the stack. */
const PLATES = [
  { id: 'assurance', label: 'Assurance', caption: 'Evidence & trace', stage: 3 },
  { id: 'governance', label: 'Governance', caption: 'Policy & authority', stage: 1 },
  { id: 'execution', label: 'Execution', caption: 'Orchestration', stage: 2 },
  { id: 'substrate', label: 'Models & systems', caption: 'Your existing stack', stage: 0 },
]

/* Screen-space vertical compression of the 3D stack at rotateX(56deg). */
const Z_TO_SCREEN = 0.83

function PlateMotif({ id }) {
  if (id === 'substrate') {
    return (
      <svg viewBox="0 0 200 200" className={styles.motif} aria-hidden="true">
        <defs>
          <pattern id="core-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.6" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#core-dots)" />
      </svg>
    )
  }

  if (id === 'execution') {
    return (
      <svg viewBox="0 0 200 200" className={styles.motif} aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.4" fill="none">
          <path d="M40 100h40M120 100h40M100 40v40M100 120v40" />
          <path d="M58 58l26 26M142 58l-26 26M58 142l26-26M142 142l-26-26" opacity="0.5" />
        </g>
        <g fill="currentColor">
          <circle cx="100" cy="100" r="7" />
          <circle cx="34" cy="100" r="4" />
          <circle cx="166" cy="100" r="4" />
          <circle cx="100" cy="34" r="4" />
          <circle cx="100" cy="166" r="4" />
          <circle cx="52" cy="52" r="3" opacity="0.6" />
          <circle cx="148" cy="52" r="3" opacity="0.6" />
          <circle cx="52" cy="148" r="3" opacity="0.6" />
          <circle cx="148" cy="148" r="3" opacity="0.6" />
        </g>
      </svg>
    )
  }

  if (id === 'governance') {
    return (
      <svg viewBox="0 0 200 200" className={styles.motif} aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.55">
          {[40, 70, 100, 130, 160].map((v) => (
            <g key={v}>
              <line x1={v} y1="30" x2={v} y2="170" />
              <line x1="30" y1={v} x2="170" y2={v} />
            </g>
          ))}
        </g>
        <rect x="70" y="70" width="60" height="60" rx="6" fill="currentColor" opacity="0.16" />
        <rect x="70" y="70" width="60" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 200" className={styles.motif} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <path d="M28 66h58l14 -18 14 36 12 -22h46" />
        <path d="M28 100h44l16 22 18 -44 14 22h52" opacity="0.7" />
        <path d="M28 138h64l12 -16 16 28h52" opacity="0.45" />
      </g>
    </svg>
  )
}

function Plate({ plate, depth, separation, isActive }) {
  const z = useTransform(separation, (s) => depth * s)

  return (
    <motion.div
      className={`${styles.plate} ${isActive ? styles.plateActive : ''}`}
      style={{ z, zIndex: depth }}
    >
      <div className={styles.plateFace}>
        <PlateMotif id={plate.id} />
      </div>
    </motion.div>
  )
}

function PlateLabel({ plate, depth, separation, opacity, isActive }) {
  const y = useTransform(separation, (s) => -depth * s * Z_TO_SCREEN)

  return (
    <motion.div
      className={`${styles.label} ${isActive ? styles.labelActive : ''}`}
      style={{ y, opacity }}
    >
      <span className={styles.leader} />
      <span className={styles.labelText}>
        <b>{plate.label}</b>
        <i>{plate.caption}</i>
      </span>
    </motion.div>
  )
}

function ExecutionCore({ progress, activeStage, separation, rotation }) {
  const busScale = useTransform(separation, [0, 58], [0.18, 1])
  const labelOpacity = useTransform(progress, [0.24, 0.32], [0, 1])

  return (
    <div className={styles.core}>
      <div className={styles.scene}>
        <motion.div className={styles.stack} style={{ rotateX: 56, rotateZ: rotation }}>
          {PLATES.map((plate, i) => (
            <Plate
              key={plate.id}
              plate={plate}
              depth={PLATES.length - 1 - i}
              separation={separation}
              isActive={activeStage === plate.stage}
            />
          ))}
          <motion.div className={styles.bus} style={{ scaleY: busScale }} />
        </motion.div>
      </div>

      <div className={styles.labels} aria-hidden="true">
        {PLATES.map((plate, i) => (
          <PlateLabel
            key={plate.id}
            plate={plate}
            depth={PLATES.length - 1 - i}
            separation={separation}
            opacity={labelOpacity}
            isActive={activeStage === plate.stage}
          />
        ))}
      </div>
    </div>
  )
}

export default ExecutionCore
