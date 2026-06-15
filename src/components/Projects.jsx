import React, { useState } from 'react'
import useInView from './useInView'

const projects = [
  {
    id: 1,
    title: 'AR Lembah Hijau',
    category: 'AR',
    tags: ['Unity', 'Vuforia', 'C#', 'AR'],
    description: 'Aplikasi Augmented Reality untuk wisata Lembah Hijau. Pengguna dapat melihat informasi interaktif dan visual 3D saat mengunjungi lokasi wisata.',
    highlights: ['3D Object Overlay', 'Marker-based AR', 'Informasi Interaktif'],
    icon: '🌿',
    color: '#22c55e',
  },
  {
    id: 2,
    title: 'AR Komponen Komputer',
    category: 'AR',
    tags: ['Unity', 'Vuforia', 'C#', 'Education'],
    description: 'Media pembelajaran AR untuk SMKN 8 Bandar Lampung. Siswa dapat mengenali komponen komputer dengan visualisasi 3D interaktif.',
    highlights: ['Media Pembelajaran', 'Visualisasi 3D', 'SMKN 8 Bandar Lampung'],
    icon: '💻',
    color: '#6366f1',
  },
  {
    id: 3,
    title: 'AR Alat Musik Tradisional',
    category: 'AR',
    tags: ['Unity', 'AR', 'C#', 'Culture'],
    description: 'Aplikasi AR untuk mengenalkan alat musik tradisional Lampung. Pengguna dapat melihat model 3D dan mendengar suara asli alat musik.',
    highlights: ['Budaya Lampung', 'Audio Integration', 'Model 3D Interaktif'],
    icon: '🎵',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'drive.metrokota.go.id',
    category: 'Web',
    tags: ['PHP', 'Laravel', 'MySQL', 'Government'],
    description: 'Website resmi penyimpanan dan pengelolaan file untuk Pemerintah Kota Metro. Sistem manajemen dokumen berbasis web yang aman dan efisien.',
    highlights: ['Pemerintah Kota Metro', 'File Management', 'Secure Storage'],
    icon: '🏛️',
    color: '#3b82f6',
    url: 'https://drive.metrokota.go.id',
  },
  {
    id: 5,
    title: 'PPDB Kota Metro',
    category: 'Web',
    tags: ['PHP', 'Laravel', 'MySQL', 'Education'],
    description: 'Sistem Penerimaan Peserta Didik Baru (PPDB) online untuk Kota Metro. Platform pendaftaran sekolah yang terintegrasi dan user-friendly.',
    highlights: ['PPDB Online', 'Kota Metro', 'Multi-Sekolah'],
    icon: '🎓',
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'Bank Sampah 21 Yosodadi',
    category: 'Web',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Environment'],
    description: 'Sistem manajemen bank sampah untuk wilayah Yosodadi. Mengelola transaksi sampah, poin nasabah, dan laporan pengelolaan sampah.',
    highlights: ['Manajemen Sampah', 'Sistem Poin', 'Laporan Digital'],
    icon: '♻️',
    color: '#22d3ee',
    url: 'https://mutiara21.metrokota.go.id',
  },
  {
    id: 7,
    title: 'Retribusi Sampah Kota Metro',
    category: 'Web',
    tags: ['PHP', 'Laravel', 'MySQL', 'Government'],
    description: 'Sistem pengelolaan retribusi sampah Kota Metro. Memudahkan pencatatan, pembayaran, dan pelaporan retribusi sampah warga kota.',
    highlights: ['Kota Metro', 'Sistem Retribusi', 'Laporan Keuangan'],
    icon: '🗑️',
    color: '#ec4899',
    url: 'https://retribusi.metrokota.go.id',
  },
  {
    id: 8,
    title: 'Janji Jaga Polres Metro',
    category: 'Web',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Government'],
    description: 'Aplikasi web untuk sistem janji jaga dan manajemen jadwal personel Polres Metro Pusat. Memudahkan koordinasi dan monitoring kehadiran.',
    highlights: ['Polres Metro Pusat', 'Manajemen Jadwal', 'Monitoring Personel'],
    icon: '👮',
    color: '#f97316',
  },
]

const filters = ['All', 'Web', 'AR']

export default function Projects() {
  const [ref, inView]       = useInView()
  const [activeFilter, setActiveFilter] = useState('All')
  const [hovered, setHovered]           = useState(null)

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" style={{ padding: '110px 5%' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>03.</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Projects</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Featured{' '}
            <span className="gradient-text-static">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Project yang pernah saya kerjakan
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '9px 24px',
              border: activeFilter === f ? '1.5px solid #6366f1' : '1.5px solid var(--border-subtle)',
              borderRadius: '100px',
              background: activeFilter === f ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: activeFilter === f ? '#a5b4fc' : 'var(--text-muted)',
              fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.25s ease',
              letterSpacing: '0.03em',
              boxShadow: activeFilter === f ? '0 4px 16px rgba(99,102,241,0.25)' : 'none',
            }}
            onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
            onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              {f === 'All' ? '✦ All' : f === 'Web' ? '🌐 Web' : '🥽 AR'} {activeFilter === f && `(${filtered.length})`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${hovered === project.id ? project.color + '50' : 'var(--border-subtle)'}`,
                borderRadius: '20px',
                padding: '28px',
                cursor: 'default',
                opacity: inView ? 1 : 0,
                transform: inView
                  ? hovered === project.id ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)'
                  : 'translateY(40px)',
                transition: `all 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s`,
                boxShadow: hovered === project.id ? `0 24px 60px ${project.color}20` : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow bg */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 140, height: 140,
                background: `radial-gradient(circle, ${project.color}${hovered === project.id ? '20' : '08'}, transparent 70%)`,
                borderRadius: '50%',
                transition: 'all 0.4s ease',
                pointerEvents: 'none',
              }} />

              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${project.color}, transparent)`,
                opacity: hovered === project.id ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{
                  width: 52, height: 52,
                  background: `${project.color}15`,
                  border: `1.5px solid ${project.color}30`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                  transform: hovered === project.id ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  boxShadow: hovered === project.id ? `0 6px 20px ${project.color}40` : 'none',
                }}>{project.icon}</div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: `${project.color}15`,
                    color: project.color,
                    borderRadius: '100px',
                    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
                  }}>{project.category}</span>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                      width: 32, height: 32, borderRadius: '8px',
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#6366f1', textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.transform = 'scale(1.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.transform = 'scale(1)' }}
                    title="Kunjungi Website"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.05rem', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                {project.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '18px' }}>
                {project.description}
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {project.highlights.map(h => (
                  <span key={h} style={{
                    padding: '3px 10px',
                    background: 'var(--border-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.72rem', fontWeight: 600,
                  }}>{h}</span>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--text-muted)',
                    fontSize: '0.7rem', fontWeight: 500,
                    padding: '2px 8px',
                    background: 'rgba(99,102,241,0.06)',
                    borderRadius: '4px',
                  }}>#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
