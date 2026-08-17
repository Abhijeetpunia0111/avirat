/* House motion: short travel, long settle, no overshoot. Mirrors --ease in index.css. */
export const EASE = [0.32, 0.08, 0.24, 1]

export const REVEAL = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
}
