import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const SUGGESTIONS = [
  'Apa skill utama Bagas?',
  'Ceritakan tentang project AR',
  'Bagas kerja di mana?',
  'Bagaimana cara menghubungi Bagas?',
]

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#6366f1',
          display: 'inline-block',
          animation: `pulse 1.2s ease ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '12px',
      animation: 'fadeInUp 0.3s ease',
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', marginRight: '8px', marginTop: '2px',
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '80%',
        padding: '10px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser
          ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
          : 'var(--bg-secondary)',
        color: isUser ? '#fff' : 'var(--text-primary)',
        fontSize: '0.875rem',
        lineHeight: 1.6,
        border: isUser ? 'none' : '1px solid var(--border-subtle)',
        boxShadow: isUser ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const { theme } = useTheme()
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! 👋 Saya asisten virtual Bagas. Ada yang ingin kamu tanyakan tentang portfolio atau pengalamannya?' }
  ])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [unread, setUnread]     = useState(0)
  const [pulse, setPulse]       = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  // scroll to bottom on new message
  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, open])

  // focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setUnread(0)
    }
  }, [open])

  // pulse badge after 3s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const sendMessage = async (text) => {
    const userText = (text || input).trim()
    if (!userText || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.role !== 'system'),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const reply = data.reply || 'Maaf, tidak ada respons.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      if (!open) setUnread(u => u + 1)
    } catch (err) {
      console.error('[Chatbot error]', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Maaf, terjadi kesalahan: ${err.message}. Pastikan API key sudah dikonfigurasi di Vercel.`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const isDark = theme === 'dark'

  return (
    <>
      {/* ── Chat Window ── */}
      <div style={{
        position: 'fixed',
        bottom: '90px',
        right: '24px',
        width: 'min(380px, calc(100vw - 48px))',
        height: '520px',
        borderRadius: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: isDark
          ? '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)'
          : '0 24px 64px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 9000,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transformOrigin: 'bottom right',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', gap: '12px',
          flexShrink: 0,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', border: '2px solid rgba(255,255,255,0.3)',
          }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Asisten Bagas</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem' }}>Online · Powered by Gemini</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1rem',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          aria-label="Tutup chat"
          >✕</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(99,102,241,0.3) transparent',
        }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', marginRight: '8px',
              }}>🤖</div>
              <div style={{
                padding: '10px 14px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '18px 18px 18px 4px',
              }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions — show only at start */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)} style={{
                padding: '5px 12px',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '100px', color: '#a5b4fc',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.16)'; e.currentTarget.style.borderColor = '#6366f1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)' }}
              >{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', gap: '8px', alignItems: 'flex-end',
          flexShrink: 0,
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tulis pertanyaan..."
            rows={1}
            style={{
              flex: 1, resize: 'none',
              background: 'var(--bg-secondary)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '12px', padding: '10px 14px',
              color: 'var(--text-primary)', fontSize: '0.875rem',
              fontFamily: 'inherit', outline: 'none',
              transition: 'border-color 0.2s',
              maxHeight: '100px', lineHeight: 1.5,
              scrollbarWidth: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 40, height: 40, borderRadius: '12px', flexShrink: 0,
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : 'var(--border-subtle)',
              border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', transition: 'all 0.25s ease',
              transform: input.trim() && !loading ? 'scale(1)' : 'scale(0.95)',
              boxShadow: input.trim() && !loading ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
            }}
            aria-label="Kirim pesan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── FAB Toggle Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle chatbot"
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: 56, height: 56, borderRadius: '50%',
          background: open
            ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(99,102,241,0.55)',
          zIndex: 9001,
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'scale(1) rotate(0deg)' : pulse ? 'scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.55)' }}
      >
        {/* Ping ring animation */}
        {!open && pulse && (
          <span style={{
            position: 'absolute', inset: -4,
            borderRadius: '50%',
            border: '2px solid rgba(99,102,241,0.5)',
            animation: 'glowPulse 1.5s ease infinite',
            pointerEvents: 'none',
          }} />
        )}
        {/* Unread badge */}
        {unread > 0 && !open && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 18, height: 18, borderRadius: '50%',
            background: '#ef4444', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--bg-primary)',
          }}>{unread}</span>
        )}
        <span style={{
          fontSize: '1.4rem', lineHeight: 1,
          transition: 'transform 0.3s ease',
          display: 'inline-block',
          transform: open ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)',
        }}>
          {open ? '✕' : '💬'}
        </span>
      </button>
    </>
  )
}
