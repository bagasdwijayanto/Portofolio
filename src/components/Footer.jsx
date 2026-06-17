import React from 'react'
import VisitorCounter from './VisitorCounter'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '64px 5% 48px',
      background: 'var(--bg-primary)',
      transition: 'background 0.4s, border-color 0.4s',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Visitor Counter ── */}
        <VisitorCounter />

        {/* ── Divider ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)',
          margin: '40px 0 36px',
        }} />

        {/* ── Footer bottom bar ── */}
        <div className="footer-inner" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '24px',
        }}>
          {/* Logo + tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800, fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>BD.</span>
              <span style={{
                padding: '2px 10px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '100px',
                color: '#a5b4fc',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}>Fullstack Developer</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Bagas Dwijayanto · Dinas Kominfotik Kota Metro
            </p>
          </div>

          {/* Nav links */}
          <div className="footer-nav" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                color: 'var(--text-muted)', textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 600,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#6366f1'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{link}</a>
            ))}
          </div>

          {/* Right */}
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
              © {new Date().getFullYear()} · bagasdwijayanto
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
