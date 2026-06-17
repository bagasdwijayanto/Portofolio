import React, { useEffect, useState, useRef } from 'react'
import useInView from './useInView'

/**
 * Visitor counter menggunakan api.counterapi.dev
 * - Gratis, tanpa backend, persist di cloud
 * - Namespace unik per website untuk menghindari tabrakan
 * - Increment sekali per sesi browser (bukan per page load)
 */

// Ganti namespace ini jadi domain atau nama unik websitemu
const NAMESPACE = 'bagasdwijayanto-portfolio-2025'
const KEY       = 'visitors'
const API_BASE  = 'https://api.counterapi.dev/v1'

// Animated number counter
function AnimatedNumber({ target, duration = 1800 }) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    if (!target) return
    const start = performance.now()
    startRef.current = start
    const animate = (now) => {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <>{display.toLocaleString('id-ID')}</>
}

export default function VisitorCounter() {
  const [ref, inView] = useInView()
  const [count, setCount]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)
  const counted = useRef(false)

  useEffect(() => {
    // Only hit the API once per session
    const sessionKey = `visitor_counted_${NAMESPACE}`
    const alreadyCounted = sessionStorage.getItem(sessionKey)

    const fetchCount = async () => {
      try {
        let res, data

        if (!alreadyCounted) {
          // increment — up endpoint
          res  = await fetch(`${API_BASE}/${NAMESPACE}/${KEY}/up`)
          data = await res.json()
          sessionStorage.setItem(sessionKey, '1')
        } else {
          // just read — get endpoint
          res  = await fetch(`${API_BASE}/${NAMESPACE}/${KEY}/get`)
          data = await res.json()
        }

        setCount(data.count ?? data.value ?? 0)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  const stats = [
    {
      label: 'Total Pengunjung',
      icon: '👁️',
      color: '#6366f1',
      value: loading ? null : error ? '—' : count,
      sub: 'semua waktu',
    },
    {
      label: 'Sesi Aktif',
      icon: '🟢',
      color: '#22c55e',
      value: 1,
      sub: 'kamu sekarang',
      static: true,
    },
    {
      label: 'Lokasi',
      icon: '🌏',
      color: '#22d3ee',
      value: null,
      sub: 'worldwide',
      static: true,
      text: 'Global',
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
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#6366f1', fontSize: '0.78rem', fontWeight: 700,
        }}>{'</>'}</span>
        <span style={{
          color: 'var(--text-muted)', fontSize: '0.72rem',
          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
        }}>Visitor Stats</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.3), transparent)' }} />
      </div>

      {/* Cards row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
        gap: '16px',
      }}>
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            inView={inView}
            delay={i * 0.1}
            loading={loading && !stat.static}
          />
        ))}
      </div>

      {/* Live badge */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 8px #22c55e',
          display: 'inline-block',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>
          Visitor counter aktif — setiap kunjungan unik tercatat secara real-time
        </span>
      </div>
    </div>
  )
}

function StatCard({ stat, inView, delay, loading }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '20px 22px',
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? stat.color + '40' : 'var(--border-subtle)'}`,
        borderRadius: '16px',
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.35s ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 12px 32px ${stat.color}18` : 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${stat.color}, transparent)`,
        opacity: hov ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <div style={{
            color: 'var(--text-muted)', fontSize: '0.68rem',
            fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '8px',
          }}>
            {stat.label}
          </div>

          <div style={{
            fontSize: '2rem', fontWeight: 900, lineHeight: 1,
            background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '4px',
            minHeight: '2rem',
          }}>
            {loading ? (
              <LoadingDots color={stat.color} />
            ) : stat.text ? (
              stat.text
            ) : (
              <AnimatedNumber target={stat.value} />
            )}
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>
            {stat.sub}
          </div>
        </div>

        <span style={{
          fontSize: '1.5rem',
          opacity: 0.85,
          transform: hov ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
          flexShrink: 0,
        }}>
          {stat.icon}
        </span>
      </div>
    </div>
  )
}

function LoadingDots({ color }) {
  return (
    <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', height: '2rem' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: color,
          opacity: 0.5,
          animation: `pulse 1.2s ease ${i * 0.2}s infinite`,
          display: 'inline-block',
        }} />
      ))}
    </span>
  )
}
