import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const roles = [
  'Fullstack Developer',
  'Vue.js Developer',
  'Laravel Developer',
  'AR Developer',
  'Web Engineer',
]

export default function Hero() {
  const { theme } = useTheme()
  const canvasRef   = useRef(null)
  const [roleIdx, setRoleIdx]     = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping]       = useState(true)
  const [visible, setVisible]     = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  /* Typewriter */
  useEffect(() => {
    const target = roles[roleIdx]
    let timeout
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75)
      } else {
        timeout = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setRoleIdx(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIdx])

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let raf

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light'

    const particles = Array.from({ length: 100 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 2 + 0.3,
      dx:    (Math.random() - 0.5) * 0.5,
      dy:    (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      hue:   Math.random() > 0.6 ? 245 : 195,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const dark = isDark()
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `hsla(${p.hue}, 80%, 65%, ${p.alpha})`
          : `hsla(${p.hue}, 70%, 50%, ${p.alpha * 0.6})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            const alpha = dark
              ? 0.07 * (1 - dist / 130)
              : 0.04 * (1 - dist / 130)
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`
            ctx.lineWidth   = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const delay = (d) => ({ animationDelay: `${d}s`, animationFillMode: 'both' })

  return (
    <section id="home" style={{
      position:   'relative',
      minHeight:  '100vh',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:   'hidden',
      background: theme === 'dark'
        ? 'radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(34,211,238,0.06) 0%, transparent 50%), #0a0a0f'
        : 'radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(34,211,238,0.04) 0%, transparent 50%), #f8fafc',
    }}>
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Morphing blobs */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: 420, height: 420,
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)'
          : 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'float 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 300, height: 300,
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)'
          : 'radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'floatReverse 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 600, height: 600,
        marginLeft: -300, marginTop: -300,
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(139,92,246,0.06), transparent 65%)'
          : 'radial-gradient(circle, rgba(139,92,246,0.03), transparent 65%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'float 12s ease-in-out infinite',
      }} />

      {/* Content */}
      <div style={{
        position:   'relative',
        zIndex:     2,
        textAlign:  'center',
        padding:    '0 24px',
        maxWidth:   '850px',
        opacity:    visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>

        {/* Badge */}
        <div style={{ animation: 'fadeInDown 0.7s ease', ...delay(0) }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px',
            background: theme === 'dark' ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
            border:   '1px solid rgba(99,102,241,0.3)',
            borderRadius: '100px',
            marginBottom: '32px',
            fontSize:   '0.8rem',
            color:      '#a5b4fc',
            letterSpacing: '0.05em',
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#22d3ee',
              boxShadow: '0 0 8px #22d3ee',
              animation: 'pulse 2s infinite',
              display: 'inline-block',
            }} />
            💼 Dinas Kominfotik Kota Metro
          </div>
        </div>

        {/* Name */}
        <div style={{ animation: 'fadeInUp 0.8s ease', ...delay(0.1) }}>
          <h1 style={{
            fontSize:    'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight:  900,
            lineHeight:  1.05,
            letterSpacing: '-0.03em',
            marginBottom: '8px',
            color: 'var(--text-primary)',
          }}>
            Bagas{' '}
            <span className="gradient-text">Dwijayanto</span>
          </h1>
        </div>

        {/* Typewriter role */}
        <div style={{ animation: 'fadeInUp 0.8s ease', ...delay(0.2), marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            minHeight: '2.2em',
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#6366f1',
              fontSize: '0.9em',
              fontWeight: 700,
            }}>{'>'}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{displayed}</span>
            <span style={{
              display: 'inline-block', width: '2px', height: '1.2em',
              background: '#6366f1',
              boxShadow: '0 0 8px rgba(99,102,241,0.8)',
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </div>
        </div>

        {/* Description */}
        <div style={{ animation: 'fadeInUp 0.8s ease', ...delay(0.3) }}>
          <p style={{
            fontSize:    'clamp(0.9rem, 2vw, 1.05rem)',
            color:       'var(--text-secondary)',
            maxWidth:    '560px',
            margin:      '0 auto 44px',
            lineHeight:  1.85,
          }}>
            Fullstack Developer & AR Enthusiast dari{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Lampung, Indonesia</strong>.
            Alumni <strong style={{ color: '#a5b4fc' }}>S1 Informatika — Universitas Bandar Lampung</strong>.
            Membangun sistem digital untuk pelayanan publik yang lebih baik.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ animation: 'fadeInUp 0.8s ease', ...delay(0.4) }}>
          <div className="hero-cta" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
            <a href="#projects" style={{
              padding: '15px 36px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              backgroundSize: '200% auto',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 30px rgba(99,102,241,0.45)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.03em',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(99,102,241,0.65)'
              e.currentTarget.style.backgroundPosition = 'right center'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.45)'
              e.currentTarget.style.backgroundPosition = 'left center'
            }}
            >
              🚀 Lihat Projects
            </a>
            <a href="#contact" style={{
              padding: '15px 36px',
              background: 'transparent',
              color: 'var(--text-primary)',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1.5px solid var(--border)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.03em',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#6366f1'
              e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(99,102,241,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              📩 Hubungi Saya
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ animation: 'fadeInUp 0.8s ease', ...delay(0.5) }}>
          <div className="hero-stats" style={{
            display: 'flex', gap: '0', justifyContent: 'center',
            flexWrap: 'wrap',
            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            {[
              { value: '8+',  label: 'Projects',          icon: '📦' },
              { value: '5+',  label: 'Tahun Pengalaman',  icon: '📅' },
              { value: '10+', label: 'Tech Stack',        icon: '⚡' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, minWidth: '120px',
                padding: '20px 16px',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                animation: `countUp 0.6s ease ${0.5 + i * 0.1}s both`,
              }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '1.8rem', fontWeight: 900, lineHeight: 1,
                  background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '4px',
                }}>{stat.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} style={{
        position: 'absolute', bottom: '28px', left: '50%',
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.12em',
        animation: 'bounce 2.2s ease infinite',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <span>SCROLL</span>
        <div style={{
          width: 24, height: 38,
          border: '1.5px solid currentColor',
          borderRadius: '12px',
          display: 'flex', justifyContent: 'center', paddingTop: '6px',
        }}>
          <div style={{
            width: 4, height: 8,
            background: '#6366f1',
            borderRadius: '2px',
            animation: 'bounce 1.5s ease infinite',
          }} />
        </div>
      </button>
    </section>
  )
}
