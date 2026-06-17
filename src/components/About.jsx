import React from 'react'
import useInView from './useInView'

const timeline = [
  {
    year: '2019',
    title: 'Kuliah di UBL',
    desc: 'Memulai studi S1 Informatika di Universitas Bandar Lampung, Fakultas Ilmu Komputer.',
    icon: '🎓',
    color: '#6366f1',
  },
  {
    year: '2021',
    title: 'Project AR Pertama',
    desc: 'Mengembangkan aplikasi AR Lembah Hijau menggunakan Unity dan Vuforia.',
    icon: '🥽',
    color: '#22d3ee',
  },
  {
    year: '2025',
    title: 'Fullstack Development',
    desc: 'Mengerjakan project pemerintahan: PPDB Kota Metro, Retribusi Sampah, Portal drive.metrokota.go.id.',
    icon: '💻',
    color: '#8b5cf6',
  },
  { 
    year: '2025',
    title: 'Dinas Kominfotik Kota Metro',
    desc: 'Bergabung sebagai developer di Dinas Komunikasi, Informatika dan Statistik Kota Metro.',
    icon: '🏛️',
    color: '#22c55e',
  },
]

const infoCards = [
  { label: 'Lokasi',     value: 'Lampung, Indonesia',      icon: '📍' },
  { label: 'Pekerjaan',  value: 'Kominfotik Kota Metro',   icon: '💼' },
  { label: 'Pendidikan', value: 'S1 Informatika — UBL',    icon: '🎓' },
  { label: 'Fokus',      value: 'Web & AR Development',    icon: '🚀' },
]

export default function About() {
  const [ref, inView]   = useInView()
  const [ref2, inView2] = useInView()

  const stagger = (i, base = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${base + i * 0.1}s, transform 0.7s ease ${base + i * 0.1}s`,
  })

  return (
    <section id="about" style={{ padding: 'clamp(80px, 10vw, 110px) 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div ref={ref} style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>01.</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>About Me</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Tentang{' '}
            <span className="gradient-text-static">Saya</span>
          </h2>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '64px' }}>

          {/* Left column */}
          <div>
            {/* Avatar placeholder + glow */}
            <div style={{ ...stagger(0), marginBottom: '32px' }}>
              <div style={{
                width: 96, height: 96,
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '24px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
                animation: 'glowPulse 3s ease infinite',
              }}>
                👨‍💻
              </div>
            </div>

            <p style={{ ...stagger(1), color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '18px', fontSize: '1rem' }}>
              Saya adalah <strong style={{ color: 'var(--text-primary)' }}>Bagas Dwijayanto</strong>, Fullstack Developer yang passionate membangun solusi digital inovatif.
              Perjalanan saya dimulai sejak <strong style={{ color: '#a5b4fc' }}>2019</strong> di Universitas Bandar Lampung, Fakultas Ilmu Komputer, Prodi Informatika.
            </p>

            <p style={{ ...stagger(2), color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '32px', fontSize: '1rem' }}>
              Saat ini bekerja di <strong style={{ color: 'var(--text-primary)' }}>Dinas Komunikasi, Informatika dan Statistik (Kominfotik) Kota Metro</strong>,
              mengembangkan sistem digital untuk pelayanan publik. Pengalaman mulai dari aplikasi
              AR edukasi hingga sistem informasi pemerintahan kota.
            </p>

            {/* Info Cards Grid */}
            <div className="info-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {infoCards.map((card, i) => (
                <div key={card.label} style={{
                  ...stagger(i + 3),
                  padding: '16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease, opacity 0.7s ease, transform 0.7s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{card.icon}</div>
                  <div style={{ color: '#6366f1', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>
                    {card.label}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600 }}>{card.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={ref2}>
            <h3 style={{
              color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '32px',
              opacity: inView2 ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}>
              ✦ Perjalanan Karir
            </h3>

            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '23px', top: 0, bottom: 0,
                width: '1px',
                background: 'linear-gradient(180deg, #6366f1, rgba(99,102,241,0.05))',
                opacity: inView2 ? 1 : 0,
                transition: 'opacity 1s ease 0.3s',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '24px', alignItems: 'flex-start',
                    opacity: inView2 ? 1 : 0,
                    transform: inView2 ? 'translateX(0)' : 'translateX(30px)',
                    transition: `all 0.6s ease ${0.2 + i * 0.12}s`,
                  }}>
                    {/* Icon dot */}
                    <div style={{
                      width: 46, height: 46, minWidth: 46,
                      borderRadius: '50%',
                      background: `${item.color}18`,
                      border: `2px solid ${item.color}50`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                      zIndex: 1,
                      boxShadow: `0 0 12px ${item.color}30`,
                    }}>{item.icon}</div>

                    {/* Content */}
                    <div style={{
                      flex: 1,
                      padding: '16px 20px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${item.color}40`
                      e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}18`
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</h4>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: item.color,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          background: `${item.color}15`,
                          borderRadius: '6px',
                        }}>{item.year}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
