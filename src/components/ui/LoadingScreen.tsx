'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const boot = [
  '> BOOTING NEURAL CORE v2.0.0...',
  '> INITIALIZING QUANTUM ENCRYPTION LAYER...',
  '> LOADING 3D RENDERING ENGINE...',
  '> ESTABLISHING GHOST PROTOCOL TUNNEL...',
  '> CALIBRATING THREAT INTELLIGENCE FEED...',
  '> DIGITAL UNIVERSE DEPLOYED. WELCOME BACK.',
]

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([])
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      if (i < boot.length) { setLines(p=>[...p,boot[i]]); setPct(Math.round((i+1)/boot.length*100)); i++ }
      else clearInterval(iv)
    }, 390)
    return () => clearInterval(iv)
  }, [])
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background:'#060609' }}
      exit={{ opacity:0 }} transition={{ duration:.5 }}
    >
      <div className="scanlines" />
      {/* Logo */}
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }} className="mb-10 text-center">
        <div className="t-display text-6xl acid-text glow-acid tracking-widest" style={{ fontSize:'clamp(2rem,8vw,5rem)' }}>
          Z3R0RU135
        </div>
        <div className="t-mono text-xs mt-2 tracking-[.5em]" style={{ color:'var(--text-lo)' }}>DIGITAL UNIVERSE</div>
      </motion.div>
      {/* Boot log */}
      <div className="w-full max-w-md mb-8 px-6 min-h-[120px]">
        {lines.map((l,i) => (
          <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} className="t-mono text-xs mb-1"
            style={{ color: i===lines.length-1 ? 'var(--primary)':'var(--text-lo)' }}>{l}</motion.div>
        ))}
      </div>
      {/* Progress */}
      <div className="w-80 h-px overflow-hidden rounded" style={{ background:'var(--edge)' }}>
        <motion.div className="h-full" style={{ background:'linear-gradient(90deg,var(--primary),var(--accent))', boxShadow:'0 0 8px var(--primary)' }}
          initial={{ width:'0%' }} animate={{ width:`${pct}%` }} transition={{ duration:.3 }} />
      </div>
      <div className="t-mono text-xs mt-2" style={{ color:'var(--text-lo)' }}>{pct}%</div>
      {/* Corners */}
      {[['top-6 left-6','border-t border-l'],['top-6 right-6','border-t border-r'],['bottom-6 left-6','border-b border-l'],['bottom-6 right-6','border-b border-r']].map(([p,b],i)=>(
        <div key={i} className={`absolute w-8 h-8 ${p} ${b}`} style={{ borderColor:'var(--edge)' }} />
      ))}
    </motion.div>
  )
}
