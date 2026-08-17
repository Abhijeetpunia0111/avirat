import s from './PlatformDashboard.module.css'

const ACTIVE_NAV = 'Governance'

const NAV = [
  { label: 'Workspace', items: ['Overview', 'Requests', 'Runs'] },
  { label: 'Operating layer', items: ['Governance', 'Execution', 'Assurance'] },
]

const METRICS = [
  { value: '24', label: 'Runs in flight' },
  { value: '06', label: 'Checkpoints held' },
  { value: '02', label: 'Policy blocks' },
]

/* The same three-tier stack the section argues for, read as a product screen. */
const LAYERS = [
  {
    title: 'People & business intent',
    rows: [{ label: 'Requests, workflows, approvals', meta: 'input' }],
  },
  {
    title: 'avirat.ai operating layer',
    accent: true,
    rows: [
      { label: 'Governance — policy, authority, cost rules', meta: 'runtime' },
      { label: 'Execution — orchestration, checkpoints, recovery', meta: 'runtime' },
      { label: 'Assurance — trace, evidence, outcomes', meta: 'runtime' },
    ],
  },
  {
    title: 'Your existing stack',
    rows: [{ label: 'Models, agents, tools, APIs, systems of record', meta: 'unchanged' }],
  },
]

const CHECKPOINTS = [
  { name: 'Shortlist approval', owner: 'Talent Ops', state: 'Awaiting review', tone: 'wait' },
  { name: 'Spend above £2k', owner: 'Finance', state: 'Approved', tone: 'done' },
  { name: 'EU data transfer', owner: 'Legal', state: 'Escalated', tone: 'hold' },
]

function PlatformDashboard() {
  return (
    <div className={s.dash}>
      <div className={s.chrome}>
        <span className={s.chromeDot} />
        <span className={s.chromeLabel}>avirat.ai — runtime</span>
        <span className={s.chromeMeta}>RUN-4417</span>
      </div>

      <div className={s.body}>
        <aside className={s.side}>
          {NAV.map((group) => (
            <div key={group.label} className={s.sideGroup}>
              <span className={s.sideLabel}>{group.label}</span>
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`${s.sideItem} ${item === ACTIVE_NAV ? s.sideItemActive : ''}`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </aside>

        <div className={s.main}>
          <div className={s.mainHead}>
            <h3 className={s.mainTitle}>Runtime stack</h3>
            <span className={s.status}>
              <span className={s.statusDot} />
              live
            </span>
          </div>

          <div className={s.metrics}>
            {METRICS.map((metric) => (
              <div key={metric.label} className={s.metric}>
                <span className={s.metricValue}>{metric.value}</span>
                <span className={s.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className={s.stack}>
            {LAYERS.map((layer) => (
              <div key={layer.title} className={s.layer}>
                <div className={s.layerTitle}>{layer.title}</div>
                {layer.rows.map((row) => (
                  <div
                    key={row.label}
                    className={`${s.row} ${layer.accent ? s.rowAccent : ''}`}
                  >
                    <span className={s.rowLabel}>{row.label}</span>
                    <span className={s.rowMeta}>{row.meta}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={s.queue}>
            <div className={s.layerTitle}>Checkpoints</div>
            {CHECKPOINTS.map((cp) => (
              <div key={cp.name} className={s.queueRow}>
                <span className={s.queueName}>{cp.name}</span>
                <span className={s.queueOwner}>{cp.owner}</span>
                <span className={`${s.chip} ${s[cp.tone]}`}>{cp.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformDashboard
