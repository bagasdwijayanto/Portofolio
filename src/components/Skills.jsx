import React, { useState } from 'react'
import useInView from './useInView'

const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    color: '#6366f1',
    skills: [
      { name: 'PHP',        level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'Python',     level: 75 },
      { name: 'C#',         level: 70 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '⚡',
    color: '#22d3ee',
    skills: [
      { name: 'Laravel',     level: 90 },
      { name: 'Vue.js',      level: 82 },
      { name: 'React',       level: 85 },
      { name: 'Svelte',      level: 72 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    title: 'Tools & Lainnya',
    icon: '🔧',
    color: '#8b5cf6',
    skills: [
      { name: 'Vanilla JS',    level: 88 },
      { name: 'AR Development', level: 78 },
      { name: 'MySQL',         level: 85 },
      { name: 'Git',           level: 80 },
    ],
  },
]

const techBadges = [
  { name: 'PHP',         bg: '#777BB4', text: '#fff', icon: '🐘' },
  { name: 'JavaScript',  bg: '#F7DF1E', text: '#000', icon: '🟨' },
  { name: 'Python',      bg: '#3776AB', text: '#fff', icon: '🐍' },
  { name: 'C#',          bg: '#239120', text: '#fff', icon: '#️⃣' },
  { name: 'Vue.js',      bg: '#42B883', text: '#fff', icon: '💚' },
  { name: 'React',       bg: '#61DAFB', text: '#000', icon: '⚛️' },
  { name: 'Laravel',     bg: '#FF2D20', text: '#fff', icon: '🔴' },
  { name: 'Svelte',      bg: '#FF3E00', text: '#fff', icon: '🧡' },
  { name: 'Tailwind',    bg: '#06B6D4', text: '#fff', icon: '🌊' },
  { name: 'Vanilla JS',  bg: '#F59E0B', text: '#000', icon: '✨' },
]

function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{name}</span>
        <span style={{
          color: color, fontSize: '0.75rem',
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
          opacity: inView ? 1 : 0,
          transition: `opacity 0.5s ease ${delay + 0.5}s`,
        }}>{level}%</span>
      </div>
      {/* Track */}
      <div style={{ background: 'var(--border-subtle)', borderRadius: '100px', height: '6px', overflow: 'hidden', position: 'relative' }}>
        {/* Fill */}
        <div style={{
          height: '100%',
          width: inView ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          borderRadius: '100px',
          transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
          boxShadow: inView ? `0 0 10px ${color}70` : 'none',
          position: 'relative',
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: inView ? 'shimmer 2s linear infinite' : 'none',
            animationDelay: `${delay + 1.2}s`,
          }} />
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView]   = useInView()
  const [hoveredCat, setHoveredCat] = useState(null)

  return (
    <section id="skills" style={{ padding: '110px 5%', background: 'var(--bg-secondary)', transition: 'background 0.4s' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>02.</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Skills</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Tech{' '}
            <span className="gradient-text-static">Stack</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1rem' }}>
            Teknologi dan tools yang saya kuasai
          </p>
        </div>

        {/* Tech Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '64px' }}>
          {techBadges.map((badge, i) => (
            <span key={badge.name} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px',
              background: badge.bg,
              color: badge.text,
              borderRadius: '100px',
              fontSize: '0.82rem',
              fontWeight: 700,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
              transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s`,
              cursor: 'default',
              userSelect: 'none',
              boxShadow: `0 4px 12px ${badge.bg}55`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)'; e.currentTarget.style.boxShadow = `0 8px 20px ${badge.bg}80` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 4px 12px ${badge.bg}55` }}
            >
              <span style={{ fontSize: '0.9rem' }}>{badge.icon}</span>
              {badge.name}
            </span>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.title}
              onMouseEnter={() => setHoveredCat(ci)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                padding: '32px',
                background: 'var(--bg-card)',
                border: `1px solid ${hoveredCat === ci ? cat.color + '40' : 'var(--border-subtle)'}`,
                borderRadius: '20px',
                opacity: inView ? 1 : 0,
                transform: inView
                  ? hoveredCat === ci ? 'translateY(-8px)' : 'translateY(0)'
                  : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${ci * 0.15}s`,
                boxShadow: hoveredCat === ci ? `0 20px 50px ${cat.color}20` : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${cat.color}, ${cat.color}00)`,
                opacity: hoveredCat === ci ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }} />

              {/* Background glow */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 120, height: 120,
                background: `radial-gradient(circle, ${cat.color}18, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <span style={{
                  width: 44, height: 44,
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: hoveredCat === ci ? `0 4px 16px ${cat.color}40` : 'none',
                  transition: 'box-shadow 0.3s',
                }}>{cat.icon}</span>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  {cat.title}
                </h3>
              </div>

              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  inView={inView}
                  delay={ci * 0.15 + si * 0.1 + 0.2}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
