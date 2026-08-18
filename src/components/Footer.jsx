import { useState } from 'react'
import Magnetic from './Magnetic.jsx'
import styles from './Footer.module.css'

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Governed execution', href: '#how-it-works' },
      { label: 'Policy & authority', href: '#operating-model' },
      { label: 'Human checkpoints', href: '#operating-model' },
      { label: 'Evidence & trace', href: '#platform' },
      { label: 'Cost controls', href: '#platform' },
      { label: 'Integrations', href: '#capabilities' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Financial services', href: '#use-cases' },
      { label: 'Healthcare', href: '#use-cases' },
      { label: 'Public sector', href: '#use-cases' },
      { label: 'Manufacturing', href: '#use-cases' },
      { label: 'Technology', href: '#use-cases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Governance brief', href: '#get-started' },
      { label: 'The shift', href: '#shift' },
      { label: 'The risk', href: '#risk' },
      { label: 'Enterprise readiness', href: '#enterprise' },
      { label: 'Security', href: '#enterprise' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#top' },
      { label: 'Contact', href: 'mailto:hello@avirat.ai' },
      { label: 'Trust center', href: '#enterprise' },
      { label: 'Privacy', href: '#top' },
      { label: 'Terms of use', href: '#top' },
    ],
  },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    path: 'M4 7v10M4 3.6v.1M9 17v-5.5a2.5 2.5 0 015 0V17',
  },
  {
    label: 'X',
    href: 'https://x.com',
    path: 'M3.5 3.5l13 13M16.5 3.5l-13 13',
  },
  {
    label: 'GitHub',
    path: 'M12.5 17.5v-2.6c0-.8-.3-1.4-.7-1.7 2.3-.3 4.2-1.2 4.2-4.6 0-1-.3-1.8-.9-2.4.1-.3.4-1.2-.1-2.4 0 0-.8-.2-2.5 1a8.4 8.4 0 00-4.5 0c-1.7-1.2-2.5-1-2.5-1-.5 1.2-.2 2.1-.1 2.4-.6.6-.9 1.4-.9 2.4 0 3.4 1.9 4.3 4.2 4.6-.3.3-.6.8-.7 1.5-.6.3-2.1.8-3-.9 0 0-.5-1-1.6-1.1',
    href: 'https://github.com',
  },
  {
    label: 'Email',
    href: 'mailto:hello@avirat.ai',
    path: 'M2.5 5h15v10h-15zM2.5 5.6l7.5 5.4 7.5-5.4',
  },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.signup}>
          <a href="#top" className={styles.brand}>
            <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
              <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="8" r="3" fill="var(--accent-soft)" />
            </svg>
            avirat<span className={styles.dotAi}>.ai</span>
          </a>

          <h2 className={styles.signupTitle}>
            AI moves fast.
            <br />
            We&apos;ll keep you ahead of it.
          </h2>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.srOnly} htmlFor="footer-email">
              Work email
            </label>
            <input
              id="footer-email"
              className={styles.input}
              type="email"
              required
              placeholder="Enter your work email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Magnetic as="button" strength={0.5} className={styles.submit} type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Magnetic>
          </form>

          <p className={styles.formNote} role="status">
            {sent
              ? "Thanks — you're on the list."
              : 'Governance briefs and product updates. Unsubscribe any time.'}
          </p>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.title} className={styles.column}>
              <h3 className={styles.columnTitle}>
                {column.title}
                <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </h3>
              <ul>
                {column.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Magnetic href={link.href} strength={0.5}>
                      {link.label}
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.base}`}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} avirat.ai — Control · Accountability · Interoperability · Proof
        </span>

        <div className={styles.social}>
          {SOCIAL.map((item) => (
            <Magnetic
              key={item.label}
              href={item.href}
              strength={0.55}
              aria-label={item.label}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path d={item.path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
