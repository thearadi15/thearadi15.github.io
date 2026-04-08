'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const labs = [
  {
    id:'ctf', icon:'▣', color:'var(--plasma)', title:'CTF_WRITEUPS',
    desc:'Battle reports from competitive hacking. Techniques, tools, and methodologies dissected.',
    items:['HTB Forest — Active Directory chain','PicoCTF — Binary exploitation series','DEFCON 31 — Web & crypto challenges','CTF.NL — Reverse engineering set'],
  },
  {
    id:'research', icon:'◈', color:'var(--acid)', title:'SECURITY_RESEARCH',
    desc:'Original vulnerability research, CVE disclosures, and deep-dives into emerging attack surfaces.',
    items:['OAuth2 PKCE bypass analysis','Container escape techniques','LLM prompt injection vectors','Supply chain attack surfaces'],
  },
  {
    id:'learn', icon:'◉', color:'var(--ion)', title:'LEARNING_RESOURCES',
    desc:'Curated knowledge base for offensive and defensive practitioners at every level.',
    items:['Web app pentesting guide v3','Malware analysis lab setup','OSINT framework cheatsheet','Red team operations manual'],
  },
  {
    id:'tools', icon:'◎', color:'var(--ghost)', title:'TOOLS_&_SCRIPTS',
    desc:'Custom-built utilities for penetration testing, automation, and security operations.',
    items:['subdomain-enum.sh — fast recon','jwt-crack.py — token fuzzer','log-parser.go — SIEM helper','dorker.js — Google dork engine'],
  },
]

export default function CyberLabSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="cyberlab" ref={ref} style={{ background:'linear-gradient(180deg,transparent,rgba(255,45,120,.015),transparent)' }}>
      <div className="section-wrap">
        <motion.div className="mb-14" initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}>
          <div className="sec-tag mb-3">// 0x03_CYBER_LAB</div>
          <h2 className="sec-title" style={{ fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--plasma)' }}>
            SECURITY<span style={{ color:'var(--acid)' }}>_MATRIX</span>
          </h2>
          <div className="sec-line" style={{ background:'var(--plasma)', boxShadow:'0 0 8px var(--plasma)' }} />
        </motion.div>

        <div className="grid gap-5" style={{ gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))' }}>
          {labs.map((lab, i) => (
            <motion.div key={lab.id} className="card p-6 group lift"
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.5, delay: i*.1 }}>
              {/* Hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-sm"
                   style={{ background:`radial-gradient(circle at 30% 30%, ${lab.color}05 0%, transparent 65%)` }} />

              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl" style={{ color:lab.color, textShadow:`0 0 16px ${lab.color}` }}>{lab.icon}</span>
                <h3 className="t-display text-xs font-bold tracking-widest" style={{ color:lab.color }}>{lab.title}</h3>
              </div>

              <p className="t-mono text-xs leading-relaxed mb-5" style={{ color:'var(--text-mid)', lineHeight:'1.75' }}>{lab.desc}</p>

              <ul className="space-y-2">
                {lab.items.map(item => (
                  <li key={item} className="t-mono text-xs flex items-start gap-2" style={{ color:'var(--text-mid)' }}>
                    <span style={{ color:lab.color, marginTop:'1px' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t" style={{ borderColor:'var(--edge)' }}>
                <a href="#" className="t-mono text-xs transition-colors duration-200 flex items-center gap-2"
                   style={{ color:'var(--text-lo)', textDecoration:'none' }}
                   onMouseEnter={e=>(e.currentTarget.style.color=lab.color)}
                   onMouseLeave={e=>(e.currentTarget.style.color='var(--text-lo)')}>
                  EXPLORE SECTOR →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div className="mt-12 grid gap-4" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))' }}
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:.6, delay:.5 }}>
          {[['14', 'CTF EVENTS'], ['3', 'CVEs FILED'], ['200+', 'WRITEUPS'], ['50K+', 'LINES AUDITED']].map(([n,l])=>(
            <div key={l} className="card p-5 text-center">
              <div className="t-bebas text-4xl acid-text glow-acid mb-1">{n}</div>
              <div className="t-mono text-xs tracking-widest" style={{ color:'var(--text-lo)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
