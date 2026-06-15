import React, { useState } from 'react'
import useInView from './useInView'

const contactLinks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l1.36-1.36a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: '+62 xxx-xxxx-xxxx',
    href: 'https://wa.me/62xxxxxxxxxxx',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'bagas@example.com',
    href: 'mailto:bagas@example.com',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/bagas',
    href: 'https://github.com',
    color: '#a5b4fc',
    bg: 'rgba(165,180,252,0.1)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/bagas',
    href: 'https://linkedin.com',
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.1)',
  },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:bagas@example.com?subject=${subject}&body=${body}`)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '13px 16px',
    background: 'var(--bg-secondary)',
    border: `1.5px solid ${focused === field ? '#6366f1' : 'var(--border-subtle)'}`,
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
    fontFamily: 'inherit',
  })

  return (
    <section id="contact" style={{ padding: '110px 5%', background: 'var(--bg-secondary)', transition: 'background 0.4s' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6366f1', fontSize: '0.85rem', fontWeight: 700 }}>04.</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Contact</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Let's{' '}
            <span className="gradient-text-static">Connect</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px' }}>
            Punya project menarik atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px' }}>

          {/* Contact links */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Hubungi Via
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactLinks.map((link, i) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 20px',
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${0.15 + i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${link.color}60`
                  e.currentTarget.style.background   = link.bg
                  e.currentTarget.style.transform    = 'translateX(8px)'
                  e.currentTarget.style.boxShadow    = `0 8px 24px ${link.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.background   = 'var(--bg-card)'
                  e.currentTarget.style.transform    = 'translateX(0)'
                  e.currentTarget.style.boxShadow    = 'none'
                }}
                >
                  <span style={{
                    width: 42, height: 42, borderRadius: '10px',
                    background: link.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: link.color, flexShrink: 0,
                  }}>{link.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {link.label}
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>{link.value}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1rem', transition: 'transform 0.2s' }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { key: 'name',  label: 'Nama',  type: 'text',  placeholder: 'Nama kamu' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type} placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    style={inputStyle(field.key)}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Pesan
                </label>
                <textarea
                  placeholder="Ceritakan project atau keperluanmu..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required rows={5}
                  style={{ ...inputStyle('message'), resize: 'vertical' }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <button type="submit" style={{
                padding: '14px 32px',
                background: sent
                  ? 'rgba(34,197,94,0.12)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border:    sent ? '1.5px solid rgba(34,197,94,0.4)' : 'none',
                borderRadius: '12px',
                color:     sent ? '#22c55e' : '#fff',
                fontWeight: 700,
                fontSize:  '0.9rem',
                cursor:    'pointer',
                transition: 'all 0.35s ease',
                letterSpacing: '0.03em',
                boxShadow: sent ? 'none' : '0 8px 25px rgba(99,102,241,0.4)',
                transform:  'none',
              }}
              onMouseEnter={e => {
                if (!sent) {
                  e.currentTarget.style.transform   = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow   = '0 12px 35px rgba(99,102,241,0.6)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = sent ? 'none' : '0 8px 25px rgba(99,102,241,0.4)'
              }}
              >
                {sent ? '✓ Berhasil Terkirim!' : '📩 Kirim Pesan →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
