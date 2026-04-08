'use client'
import { useEffect, useRef } from 'react'
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x:0, y:0 })
  const rp  = useRef({ x:0, y:0 })
  const raf = useRef(0)
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      pos.current = { x:e.clientX, y:e.clientY }
      if (dot.current) { dot.current.style.left=e.clientX+'px'; dot.current.style.top=e.clientY+'px' }
    }
    const tick = () => {
      rp.current.x += (pos.current.x - rp.current.x) * .11
      rp.current.y += (pos.current.y - rp.current.y) * .11
      if (ring.current) { ring.current.style.left=rp.current.x+'px'; ring.current.style.top=rp.current.y+'px' }
      raf.current = requestAnimationFrame(tick)
    }
    const on = () => { dot.current?.classList.add('hov'); ring.current?.classList.add('hov') }
    const off= () => { dot.current?.classList.remove('hov'); ring.current?.classList.remove('hov') }
    window.addEventListener('mousemove', mv)
    document.querySelectorAll('a,button,[data-h]').forEach(el => { el.addEventListener('mouseenter',on); el.addEventListener('mouseleave',off) })
    raf.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove',mv); cancelAnimationFrame(raf.current) }
  }, [])
  return (<><div ref={dot} className="c-dot" /><div ref={ring} className="c-ring" /></>)
}
