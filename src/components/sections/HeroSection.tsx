'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from 'react'

function Uptime() {
  const [t, setT] = useState('00:00:00')
  useEffect(() => {
    const s = Date.now()
    const iv = setInterval(() => {
      const d = Math.floor((Date.now()-s)/1000)
      const h = String(Math.floor(d/3600)).padStart(2,'0')
      const m = String(Math.floor((d%3600)/60)).padStart(2,'0')
      const sc = String(d%60).padStart(2,'0')
      setT(`${h}:${m}:${sc}`)
    }, 1000)
    return () => clearInterval(iv)
  }, [])
  return <span style={{ color:'var(--primary)' }}>{t}</span>
}

export default function HeroSection() {
  return (
    <section id="overview" className="p-8 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="grid gap-6 md:grid-cols-12">
        
        {/* Identity Block */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5 }}>
            <div className="t-mono text-[0.65rem] tracking-[0.5em] mb-4" style={{ color: 'var(--primary)' }}>
              // SYSTEM_OPERATIONAL_OVERVIEW
            </div>
            <h1 className="t-display text-6xl md:text-8xl mb-4 font-black tracking-tighter" style={{ color: 'var(--text-hi)', textShadow: '0 0 30px rgba(0,229,255,0.2)' }}>
              ADITYA<br/><span style={{ color: 'var(--primary)', filter: 'brightness(1.2)' }}>RAJ</span>
            </h1>
            <div className="t-body text-xl md:text-2xl mb-8 tracking-wide flex items-center gap-3">
              <span className="opacity-40">ROLE_SPEC:</span>
              <TypeAnimation sequence={[
                'Security Researcher', 2500,
                'Bug Bounty Hunter', 2500,
                'Founding Engineer', 2500,
                'Exploit Developer', 2500,
              ]} repeat={Infinity} />
            </div>
          </motion.div>
        </div>

        {/* HUD Stats Block */}
        <div className="md:col-span-4 space-y-4">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }}
            className="hud-border p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">▣</div>
            <div className="t-mono text-[0.6rem] opacity-40 mb-3">SYSTEM_STATS.DB</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[0.65rem] t-mono mb-1">
                  <span>UPTIME</span>
                  <Uptime />
                </div>
                <div className="skill-track"><div className="skill-fill w-[88%]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-[var(--edge)] bg-[rgba(255,255,255,0.02)]">
                  <div className="t-mono text-[10px] opacity-40 mb-1">REPORTS</div>
                  <div className="t-display text-lg text-[var(--accent)]">95<span className="text-[10px]">%</span></div>
                </div>
                <div className="p-3 border border-[var(--edge)] bg-[rgba(255,255,255,0.02)]">
                  <div className="t-mono text-[10px] opacity-40 mb-1">CTF_RANK</div>
                  <div className="t-display text-lg text-[var(--primary)]">#TOP1</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4 }}
            className="hud-border p-5">
            <div className="t-mono text-[0.6rem] opacity-40 mb-3">CONNECTIVITY_VECTORS</div>
            <div className="flex flex-wrap gap-2 text-[0.65rem] t-mono">
              <a href="#" className="flex-1 p-2 border border-[var(--edge)] text-center hover:bg-[var(--primary)] hover:text-black transition-all">GITHUB</a>
              <a href="#" className="flex-1 p-2 border border-[var(--edge)] text-center hover:bg-[var(--primary)] hover:text-black transition-all">LINKEDIN</a>
            </div>
            <div className="mt-3 p-2 border border-[var(--edge)] text-[0.6rem] t-mono opacity-60 text-center">
              adityaraj919895@gmail.com
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="mt-16 pt-8 border-t border-[var(--edge)] grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 t-mono text-[0.55rem] tracking-widest">
        <div>// ARCH: X86_64</div>
        <div>// KERNEL: 6.8.0-ZEN</div>
        <div>// SHELL: ZSH_5.9</div>
        <div className="text-right">// STATUS: ENCRYPTED</div>
      </div>
    </section>
  )
}

