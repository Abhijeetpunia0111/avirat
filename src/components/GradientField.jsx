import styles from './GradientField.module.css'

/**
 * The site's one deliberately loud visual — a warm coral → pink → violet →
 * blue fluted-glass clip. Used in exactly two places: the ProofRow signature
 * card and the closing CTA band. Purely decorative; sizing, radius, and any
 * scrim live on the parent.
 */
function GradientField({ className = '' }) {
  return (
    <div className={`${styles.field} ${className}`} aria-hidden="true">
      <video
        className={styles.video}
        src="/proof-glass.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}

export default GradientField
