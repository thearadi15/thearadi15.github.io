'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  { 
    id:1, name:"z3r0-toolkit", 
    desc:"Production-ready bug bounty automation toolkit — from reconnaissance to validated findings. Designed for scalable vulnerability discovery.", 
    tags:["Python","Bash","Nuclei","JS"], 
    icon:"◈", color:"var(--primary)", status:"STABLE" 
  },
  { 
    id:2, name:"Kryptos Keeper", 
    desc:"Secure file management system with AES encryption, role-based access control, and data privacy protections.", 
    tags:["Python","PostgreSQL","AES-256"], 
    icon:"◉", color:"var(--accent)", status:"V1.2" 
  },
  { 
    id:3, name:"Security Labs", 
    desc:"Red Team, Web App, and AD attack simulation environments for hands-on penetration testing practice.", 
    tags:["Metasploit","BloodHound","DVWA"], 
    icon:"◬", color:"var(--warn)", status:"ACTIVE" 
  },
  { 
    id:4, name:"CTF Challenges", 
    desc:"Designed and implemented hands-on challenges across Web Exploitation, OSINT, and Reverse Engineering.", 
    tags:["PHP","Python","Forensics"], 
    icon:"▣", color:"var(--secondary)", status:"RELEASED" 
  },
]

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="repository" ref={ref} className="p-8 max-w-6xl mx-auto">
      <motion.div className="mb-12" initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}>
        <div className="sec-tag mb-3">// 0x02_ASSET_REPOSITORY</div>
        <h2 className="t-display text-4xl" style={{ color: 'var(--primary)', textShadow: 'var(--glow)' }}>
          ACTIVE_PROJECTS<span className="opacity-30">.BIN</span>
        </h2>
        <div className="sec-line" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div key={p.id} className="hud-border p-6 group lift"
            initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ delay: i * .1 }}>
            
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl" style={{ color: p.color, textShadow: `0 0 15px ${p.color}40` }}>{p.icon}</div>
              <span className="tag" style={{ borderColor:`${p.color}40`, color:p.color }}>{p.status}</span>
            </div>

            <h3 className="t-display text-sm font-bold tracking-wider mb-3" style={{ color:'var(--text-hi)' }}>
              {p.name.toUpperCase()}
            </h3>

            <p className="t-mono text-[0.7rem] leading-relaxed mb-6 opacity-60">
              {p.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tags.map(t => <span key={t} className="tag text-[0.6rem]">{t}</span>)}
            </div>

            <div className="flex gap-3 pt-4 border-t border-[var(--edge)]">
              <a href="#" className="btn ghost text-[0.6rem] py-2 px-4 flex-1 justify-center">SOURCE_CODE</a>
              <a href="#" className="btn text-[0.6rem] py-2 px-4 flex-1 justify-center" style={{ borderColor:p.color, color:p.color }}>DOCUMENTATION</a>
            </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  )
}

