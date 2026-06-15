import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on non-touch devices
    if ('ontouchstart' in window) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display = 'block'
    ring.style.display = 'block'

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    let raf
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const grow = () => { ring.style.transform += ' scale(1.5)'; ring.style.opacity = '0.5' }
    const shrink = () => { ring.style.opacity = '1' }
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        display: 'none',
        position: 'fixed',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#6366f1',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        display: 'none',
        position: 'fixed',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1.5px solid rgba(99,102,241,0.7)',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'opacity 0.3s',
      }} />
    </>
  )
}
