import React, { useState, useRef, useEffect, useCallback } from 'react'
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
const CARD_W  = 320 + 24   // card width + gap
const AUTO_INTERVAL  = 2800 // ms between each auto step
const RESUME_DELAY   = 3000 // ms to wait before resuming after user interaction

// ── Project Card ──────────────────────────────────────────────
function ProjectCard({ project, inView, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? project.color + '50' : 'var(--border-subtle)'}`,
        borderRadius: '20px',
        padding: '28px',
        cursor: 'default',
        minWidth: '320px',
        width: '320px',
        flexShrink: 0,
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(40px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hovered ? `0 24px 60px ${project.color}25` : 'none',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Glow bg */}
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 140, height: 140,
        background: `radial-gradient(circle, ${project.color}${hovered ? '22' : '08'}, transparent 70%)`,
        borderRadius: '50%', transition: 'all 0.4s ease', pointerEvents: 'none',
      }} />
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
      }} />
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <div style={{
          width: 52, height: 52, background: `${project.color}15`,
          border: `1.5px solid ${project.color}30`, borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
          transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered ? `0 6px 20px ${project.color}40` : 'none',
        }}>{project.icon}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            padding: '4px 12px', background: `${project.color}15`, color: project.color,
            borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
          }}>{project.category}</span>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                width: 32, height: 32, borderRadius: '8px',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#6366f1', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.transform = 'scale(1)' }}
              title="Kunjungi Website"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {project.highlights.map(h => (
          <span key={h} style={{
            padding: '3px 10px', background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)', borderRadius: '6px',
            color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600,
          }}>{h}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)',
            fontSize: '0.7rem', fontWeight: 500, padding: '2px 8px',
            background: 'rgba(99,102,241,0.06)', borderRadius: '4px',
          }}>#{tag}</span>
        ))}
      </div>
    </div>
  )
}

// ── Nav Arrow Button ──────────────────────────────────────────
function NavBtn({ dir, onClick, disabled }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={dir === 'left' ? 'Scroll kiri' : 'Scroll kanan'}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        border: `1.5px solid ${disabled ? 'var(--border-subtle)' : hov ? '#6366f1' : 'var(--border)'}`,
        background: disabled ? 'transparent' : hov ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.06)',
        color: disabled ? 'var(--text-muted)' : hov ? '#a5b4fc' : 'var(--text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s ease',
        transform: hov && !disabled ? 'scale(1.1)' : 'scale(1)', flexShrink: 0,
      }}
    >
      {dir === 'left' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function Projects() {
  const [ref, inView]           = useInView()
  const [activeFilter, setActiveFilter] = useState('All')
  const trackRef      = useRef(null)
  const autoTimerRef  = useRef(null)  // setInterval handle
  const resumeTimerRef = useRef(null) // setTimeout handle for resume
  const isPausedRef   = useRef(false)

  // drag state
  const isDragging    = useRef(false)
  const dragStartX    = useRef(0)
  const scrollStartX  = useRef(0)
  const velocityRef   = useRef(0)
  const lastX         = useRef(0)
  const lastT         = useRef(0)
  const momentumRaf   = useRef(null)

  const [canLeft,     setCanLeft]    = useState(false)
  const [canRight,    setCanRight]   = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)   // active dot

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  // ── Sync active dot with scroll position ─────────────────────
  const syncDot = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / CARD_W)
    setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)))
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [filtered.length])

  // ── Scroll to a specific card index ──────────────────────────
  const scrollToIndex = useCallback((idx) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: idx * CARD_W, behavior: 'smooth' })
    setTimeout(syncDot, 400)
  }, [syncDot])

  // ── Auto-play: advance one card ───────────────────────────────
  const autoStep = useCallback(() => {
    const el = trackRef.current
    if (!el || isPausedRef.current) return
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4
    // loop back to start when at end
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + CARD_W, behavior: 'smooth' })
    setTimeout(syncDot, 400)
  }, [syncDot])

  // ── Start / restart auto-play timer ──────────────────────────
  const startAuto = useCallback(() => {
    clearInterval(autoTimerRef.current)
    autoTimerRef.current = setInterval(autoStep, AUTO_INTERVAL)
  }, [autoStep])

  // ── Pause auto-play, then resume after RESUME_DELAY ──────────
  const pauseAndResume = useCallback(() => {
    isPausedRef.current = true
    clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false
      startAuto()
    }, RESUME_DELAY)
  }, [startAuto])

  // Start auto-play when section is in view; stop when out
  useEffect(() => {
    if (inView) { startAuto() }
    else        { clearInterval(autoTimerRef.current) }
    return () => clearInterval(autoTimerRef.current)
  }, [inView, startAuto])

  // Reset on filter change
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollLeft = 0
    setActiveIndex(0)
    syncDot()
    if (inView) startAuto()
  }, [activeFilter, inView, startAuto, syncDot])

  // cleanup on unmount
  useEffect(() => () => {
    clearInterval(autoTimerRef.current)
    clearTimeout(resumeTimerRef.current)
    cancelAnimationFrame(momentumRaf.current)
  }, [])

  // ── Momentum scroll ───────────────────────────────────────────
  const startMomentum = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const decay = 0.93
    const step = () => {
      velocityRef.current *= decay
      if (Math.abs(velocityRef.current) < 0.5) { velocityRef.current = 0; syncDot(); return }
      el.scrollLeft += velocityRef.current
      syncDot()
      momentumRaf.current = requestAnimationFrame(step)
    }
    cancelAnimationFrame(momentumRaf.current)
    momentumRaf.current = requestAnimationFrame(step)
  }, [syncDot])

  // ── Pointer drag handlers ─────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    pauseAndResume()
    isDragging.current   = true
    dragStartX.current   = e.clientX
    scrollStartX.current = trackRef.current.scrollLeft
    velocityRef.current  = 0
    lastX.current        = e.clientX
    lastT.current        = performance.now()
    cancelAnimationFrame(momentumRaf.current)
    trackRef.current.style.cursor = 'grabbing'
    trackRef.current.style.scrollBehavior = 'auto'
  }, [pauseAndResume])

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const dx = e.clientX - dragStartX.current
    trackRef.current.scrollLeft = scrollStartX.current - dx
    const now = performance.now()
    const dt  = now - lastT.current
    if (dt > 0) velocityRef.current = (lastX.current - e.clientX) / dt * 16
    lastX.current = e.clientX
    lastT.current = now
    syncDot()
  }, [syncDot])

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    trackRef.current.style.cursor = 'grab'
    trackRef.current.style.scrollBehavior = 'smooth'
    startMomentum()
  }, [startMomentum])

  // Pause on hover, resume on leave
  const onMouseEnter = useCallback(() => pauseAndResume(), [pauseAndResume])
  const onMouseLeave = useCallback(() => {
    if (!isDragging.current) {
      isPausedRef.current = false
      startAuto()
    }
  }, [startAuto])

  // Arrow buttons
  const scrollBy = useCallback((dir) => {
    pauseAndResume()
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * CARD_W, behavior: 'smooth' })
    setTimeout(syncDot, 400)
  }, [pauseAndResume, syncDot])

  return (
    <section id="projects" style={{ padding: 'clamp(80px, 10vw, 110px) 0' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>

        {/* Header */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease', marginBottom: '40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>03.</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Projects</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Featured <span className="gradient-text-static">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Project yang pernah saya kerjakan</p>
        </div>

        {/* Filters + arrows */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => { setActiveFilter(f); pauseAndResume() }} style={{
                padding: '9px 24px',
                border: activeFilter === f ? '1.5px solid #6366f1' : '1.5px solid var(--border-subtle)',
                borderRadius: '100px',
                background: activeFilter === f ? 'rgba(99,102,241,0.12)' : 'transparent',
                color: activeFilter === f ? '#a5b4fc' : 'var(--text-muted)',
                fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.25s ease', letterSpacing: '0.03em',
                boxShadow: activeFilter === f ? '0 4px 16px rgba(99,102,241,0.25)' : 'none',
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
              >
                {f === 'All' ? '✦ All' : f === 'Web' ? '🌐 Web' : '🥽 AR'}
                {activeFilter === f && <span style={{ marginLeft: '6px', opacity: 0.7 }}>({filtered.length})</span>}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <NavBtn dir="left"  onClick={() => scrollBy(-1)} disabled={!canLeft} />
            <NavBtn dir="right" onClick={() => scrollBy(1)}  disabled={!canRight} />
          </div>
        </div>
      </div>

      {/* ── Carousel track ── */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onScroll={syncDot}
        style={{
          display: 'flex', gap: '24px',
          overflowX: 'auto', overflowY: 'visible',
          paddingLeft:   'max(5%, calc((100vw - 1200px)/2 + 5%))',
          paddingRight:  'max(5%, calc((100vw - 1200px)/2 + 5%))',
          paddingBottom: '24px', paddingTop: '8px',
          cursor: 'grab', scrollBehavior: 'smooth',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`
          #projects [data-carousel]::-webkit-scrollbar { display: none; }
        `}</style>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} inView={inView} index={i} />
        ))}
      </div>

      {/* ── Dots + auto-play indicator ── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px', padding: '0 5%' }}>
        {filtered.map((project, i) => (
          <button
            key={project.id}
            onClick={() => { pauseAndResume(); scrollToIndex(i) }}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width:  activeIndex === i ? 24 : 7,
              height: 7,
              borderRadius: '100px',
              border: 'none',
              background: activeIndex === i
                ? `linear-gradient(90deg, #6366f1, #22d3ee)`
                : 'rgba(99,102,241,0.28)',
              cursor: 'pointer', padding: 0,
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: activeIndex === i ? '0 0 10px rgba(99,102,241,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  )
}
