import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

const LINKS = [
  { label: 'The shift', href: '#shift' },
  { label: 'Risk', href: '#risk' },
  { label: 'Operating model', href: '#operating-model' },
  { label: 'Platform', href: '#platform' },
  { label: 'Use cases', href: '#use-cases' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
            <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="8" r="3" fill="var(--accent)" />
          </svg>
          <span>avirat<span className={styles.dotAi}>.ai</span></span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <a href="#get-started" className={`btn btn-primary ${styles.navCta}`}>
          Book an assessment
        </a>
      </div>
    </header>
  )
}

export default Nav
