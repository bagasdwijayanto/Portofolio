import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Tampilan Cerah' : 'Tampilan Gelap'}
      style={{
        width: 40, height: 40, borderRadius: '10px',
        border: '1px solid var(--border)',
        background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        fontSize: '1.05rem',
        lineHeight: 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(99,102,241,0.2)'
        e.currentTarget.style.transform = 'scale(1.08)'
        e.currentTarget.style.borderColor = '#6366f1'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)'
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('home')
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        const top    = s.offsetTop - 100
        const bottom = top + s.offsetHeight
        if (window.scrollY >= top && window.scrollY < bottom) setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 5%', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <a href="#home" onClick={closeMenu} style={{ textDecoration: 'none', zIndex: 1001 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800, fontSize: '1.3rem',
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>BD.</span>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-desktop-links" style={{
          gap: '2rem', listStyle: 'none', alignItems: 'center',
        }}>
          {links.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.href}>
                <a href={link.href} style={{
                  textDecoration: 'none',
                  color: isActive ? '#6366f1' : 'var(--text-secondary)',
                  fontSize: '0.875rem', fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s',
                  position: 'relative', paddingBottom: '4px',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = isActive ? '#6366f1' : 'var(--text-secondary)'}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0,
                      width: '100%', height: '2px',
                      background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
                      borderRadius: '2px',
                    }} />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Desktop Hire Me button */}
          <a href="#contact" className="nav-hire-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px', color: '#fff',
            textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.02em',
            transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.35)' }}
          >
            Hire Me ✦
          </a>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Hamburger button — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width: 40, height: 40, borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'rgba(99,102,241,0.1)',
              cursor: 'pointer', zIndex: 1001,
              display: 'none',       /* shown via CSS class */
              flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '5px', padding: '8px',
              transition: 'all 0.3s',
            }}
          >
            <span style={{
              display: 'block', width: '18px', height: '2px',
              background: menuOpen ? '#6366f1' : 'var(--text-primary)',
              borderRadius: '2px',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'all 0.3s',
            }} />
            <span style={{
              display: 'block', width: '18px', height: '2px',
              background: menuOpen ? '#6366f1' : 'var(--text-primary)',
              borderRadius: '2px',
              opacity: menuOpen ? 0 : 1,
              transition: 'all 0.3s',
            }} />
            <span style={{
              display: 'block', width: '18px', height: '2px',
              background: menuOpen ? '#6366f1' : 'var(--text-primary)',
              borderRadius: '2px',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              transition: 'all 0.3s',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((link, i) => {
          const id = link.href.replace('#', '')
          const isActive = active === id
          return (
            <a key={link.href} href={link.href} onClick={closeMenu} style={{
              textDecoration: 'none',
              color: isActive ? '#6366f1' : 'var(--text-primary)',
              fontSize: '1.5rem', fontWeight: 700,
              letterSpacing: '-0.01em',
              padding: '8px 0',
              borderBottom: '1px solid var(--border-subtle)',
              width: '100%', textAlign: 'center',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${i * 0.06}s`,
            }}>
              {link.label}
            </a>
          )
        })}
        <a href="#contact" onClick={closeMenu} style={{
          marginTop: '16px',
          padding: '14px 48px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '12px', color: '#fff',
          textDecoration: 'none', fontSize: '1rem', fontWeight: 700,
          boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 0.4s ease ${links.length * 0.06}s`,
        }}>
          Hire Me ✦
        </a>

        {/* Theme toggle in mobile menu */}
        <div style={{
          marginTop: '8px',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 0.4s ease ${(links.length + 1) * 0.06}s`,
        }}>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
