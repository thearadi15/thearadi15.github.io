'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href:'#home', label:'HOME' }, { href:'#projects', label:'PROJECTS' },
  { href:'#cyberlab', label:'CYBER_LAB' }, { href:'#playground', label:'PLAYGROUND' },
  { href:'#blog', label:'BLOG' }, { href:'#about', label:'ABOUT' },
]

export default function Navbar({ onTerminal }: { onTerminal:()=>void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mob, setMob] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const linkStyle = { color:'var(--text-mid)', textDecoration:'none', fontFamily:'"DM Mono",monospace', fontSize:'.68rem', letterSpacing:'.15em', textTransform:'uppercase' as const, transition:'color .25s' }
  const hover = (e: any) => { e.target.style.color='var(--acid)'; e.target.style.textShadow='0 0 10px var(--acid)' }
  const unhov = (e: any) => { e.target.style.color='var(--text-mid)'; e.target.style.textShadow='' }

  return (
    <motion.nav className={`fixed top-0 inset-x-0 z-[1000] flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled?'nav-glass':''}`}
      initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:.6, delay:.2 }}>
      <a href="#home" className="t-display acid-text glow-acid text-base tracking-[.2em]" style={{ textDecoration:'none' }}>Z3R0RU135</a>

      <ul className="hidden md:flex gap-7 list-none m-0 p-0">
        {links.map(l => (
          <li key={l.href}><a href={l.href} style={linkStyle} onMouseEnter={hover} onMouseLeave={unhov}>{l.label}</a></li>
        ))}
      </ul>

      <div className="flex gap-3 items-center">
        <button onClick={onTerminal} className="hidden md:block btn text-xs py-2 px-3" style={{ fontSize:'.65rem' }}>
          [&nbsp;TERMINAL&nbsp;]
        </button>
        <button className="md:hidden btn py-2 px-3 text-xs" onClick={() => setMob(!mob)}>{mob?'✕':'☰'}</button>
      </div>

      <AnimatePresence>
        {mob && (
          <motion.div className="absolute top-full inset-x-0 nav-glass border-t py-4 md:hidden" style={{ borderColor:'var(--edge)' }}
            initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} className="block px-6 py-3" style={{ ...linkStyle, display:'block' }} onClick={()=>setMob(false)}>{l.label}</a>
            ))}
            <button onClick={()=>{setMob(false);onTerminal()}} className="btn mx-6 mt-3 text-xs py-2 px-3">[ TERMINAL ]</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
