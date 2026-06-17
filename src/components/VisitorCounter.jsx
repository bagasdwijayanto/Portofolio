import React, { useEffect, useState, useRef } from 'react'
import useInView from './useInView'

/**
 * Visitor counter — fully offline-first, zero external API dependency.
 *
 * Strategy:
 *  - localStorage 'bd_visit_count'   : total page views across all visits
 *  - localStorage 'bd_visitor_id'    : generated once per browser (unique visitor)
 *  - localStorage 'bd_unique_count'  : total unique visitors seen on this browser
 *  - sessionStorage 'bd_session_hit' : flag so refresh doesn't increment
 *
 * Data persists across sessions in the same browser.
 * For a deployed site, each visitor builds their own local count —
 * this is transparent and shown as "kunjungan di browser ini".
 */

const VISIT_KEY   = 'bd_visit_count'
const VISITOR_KEY = 'bd_visitor_id'
const UNIQUE_KEY  = 'bd_unique_count'
const SESSION_KEY = 'bd_session_hit'

function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

function AnimatedNumber({ target, duration = 1600 }) {
  const [display, setDisplay] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!target && target !== 0) return
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * target))
      if (p < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return <>{display.toLocaleString('id-ID')}</>
}

export default function VisitorCounter() {
  const [ref, inView] = useInView()
  const [stats, setStats] = useState({
    visits:    0,
    unique:    0,
    isNew:     false,
    sinceDate: '',
  })

  useEffect(() => {
    const alreadyHit = sessionStorage.getItem(SESSION_KEY)

    // ensure visitor ID exists
    let visitorId = localStorage.getItem(VISITOR_KEY)
    const isNew   = !visitorId
    if (isNew) {
      visitorId = genId()
      localStorage.setItem(VISITOR_KEY, visitorId)
    }

    // increment visit count only once per session
    let visits = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10)
    if (!alreadyHit) {
      visits += 1
      localStorage.setItem(VISIT_KEY, String(visits))
      sessionStorage.setItem(SESSION_KEY, '1')
    }

    // unique visitor count (per-browser)
    let unique = parseInt(localStorage.getItem(UNIQUE_KEY) || '0', 10)
    if (isNew) {
      unique += 1
      localStorage.setItem(UNIQUE_KEY, String(unique))
    }

    // first-visit date
    const firstKey = 'bd_first_visit'
    if (!localStorage.getItem(firstKey)) {
      localStorage.setItem(firstKey, new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }))
    }
    const sinceDate = localStorage.getItem(firstKey) || ''

    setStats({ visits, unique, isNew, sinceDate })
  }, [])

  const cards = [
    {
      label: 'Total Kunjungan',
      icon:  '👁️',
      color: '#6366f1',
      value: stats.visits,
      sub:   'di browser ini',
    },
    {
      label: 'Sesi Unik',
      icon:  '🧑‍💻',
      color: '#22c55e',
      value: stats.unique,
      sub:   stats.isNew ? '✦ kamu pengunjung baru!' : 'visitor tercatat',
    },
    {
      label: 'Sejak',
      icon:  '📅',
      color: '#22d3ee',
      value: null,
      text:  stats.sinceDate || '—',
      sub:   'kunjungan pertama',
    },
  ]

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s ease',
        marginTop: '80px',
      }}
    >
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.78rem', fontWeight: 700 }}>
          {'</>'}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
          Visitor Stats
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.3), transparent)' }} />
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
        gap: '16px',
      }}>
        {cards.map((card, i) => (
          <StatCard key={card.label} card={card} inView={inView} delay={i * 0.1} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#22c55e', boxShadow: '0 0 8px #22c55e',
          display: 'inline-block', animation: 'pulse 2s infinite',
        }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>
          {stats.isNew
            ? 'Selamat datang! Kunjunganmu tercatat untuk pertama kali 🎉'
            : `Kamu sudah mengunjungi halaman ini ${stats.visits}× — terima kasih!`}
        </span>
      </div>
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ card, inView, delay }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '20px 22px',
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? card.color + '40' : 'var(--border-subtle)'}`,
        borderRadius: '16px',
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.35s ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 12px 32px ${card.color}18` : 'none',
        position: 'relative', overflow: 'hidden', cursor: 'default',
      }}
    >
      {/* top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${card.color}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: 'opacity 0.3s',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <div style={{
            color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            {card.label}
          </div>

          <div style={{
            fontSize: '2rem', fontWeight: 900, lineHeight: 1,
            background: `linear-gradient(135deg, ${card.color}, ${card.color}aa)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '4px', minHeight: '2rem',
          }}>
            {card.text
              ? <span style={{ fontSize: '1.1rem' }}>{card.text}</span>
              : <AnimatedNumber target={card.value} />
            }
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>
            {card.sub}
          </div>
        </div>

        <span style={{
          fontSize: '1.5rem', opacity: 0.85, flexShrink: 0,
          transform: hov ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
          transition: 'transform 0.3s ease', display: 'inline-block',
        }}>
          {card.icon}
        </span>
      </div>
    </div>
  )
}
