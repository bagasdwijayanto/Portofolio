import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setProgress(scrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${progress}%`,
      height: '2px',
      background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
      zIndex: 9999,
      transition: 'width 0.1s linear',
      boxShadow: '0 0 10px rgba(99,102,241,0.8)',
    }} />
  )
}
