'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  { company:'CYAD Solutions', role:'Founder & Security Engineer', date:'Apr 2025 – Present', desc:'Architecting e-commerce solutions & performing full-scope penetration testing.' },
  { company:'HackerOne/Bugcrowd', role:'Bug Bounty Hunter', date:'May 2024 – Present', desc:'Identifying high-severity vulnerabilities (SQLi, IDOR, SSRF) with 95% acceptance rate.' },
  { company:'Encrypt Edge', role:'CTF Challenge Developer', date:'Nov 2025 – Present', desc:'Designing realistic attack scenarios in Web Exploitation and Binary Analysis.' },
  { company:'Hacktify Cybersecurity', role:'Pen Testing Intern', date:'Feb 2025 – Mar 2025', desc:'Executed security testing for OWASP Top 10 across 20+ environments.' },
]

const skills = [
  { category: 'Languages', items: ['Python', 'Bash', 'JavaScript', 'C/C++', 'PHP', 'SQL', 'PowerShell'] },
  { category: 'Security Tools', items: ['Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 'Nuclei', 'Ghidra', 'SQLMap'] },
  { category: 'Frameworks', items: ['OWASP Top 10', 'MITRE ATT&CK', 'CVE Analysis', 'CVSS Scoring'] },
  { category: 'Platforms', items: ['Kali Linux', 'Active Directory', 'Docker', 'Windows Server'] },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  
  return (
    <section id="credentials" ref={ref} className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} className="mb-12">
        <div className="sec-tag">// 0x05_IDENTITY_VERIFICATION</div>
        <h2 className="t-display text-4xl mt-2 mb-4" style={{ color: 'var(--primary)', textShadow: 'var(--glow)' }}>
          USER_CREDENTIALS<span className="opacity-30">.INF</span>
        </h2>
        <div className="t-body max-w-2xl text-[var(--text-mid)] leading-relaxed">
          Operational handle: <span style={{ color: 'var(--primary)' }}>z3r0ru135</span>. 
          Security researcher operating at the intersection of offensive security, bug bounty, and custom tooling. 
          Currently architecting secure deployments and leading red-team operations.
        </div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Skills & Certs */}
        <div className="space-y-8">
          <div className="hud-border p-6">
            <h3 className="t-display text-xs mb-6 tracking-widest" style={{ color: 'var(--primary)' }}>SKILL_MATRIX</h3>
            <div className="grid gap-6">
              {skills.map(s => (
                <div key={s.category}>
                  <div className="t-mono text-[0.65rem] opacity-40 mb-2 uppercase">{s.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map(item => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hud-border p-6">
            <h3 className="t-display text-xs mb-4 tracking-widest" style={{ color: 'var(--warn)' }}>CERTIFICATIONS</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[0.7rem] t-mono">
                <span style={{ color:'var(--text-hi)' }}>Ethical Hacker (Cisco)</span>
                <span className="opacity-40">SEP 2025</span>
              </div>
              <div className="flex justify-between items-center text-[0.7rem] t-mono">
                <span style={{ color:'var(--text-hi)' }}>Network Security Practitioner (CNSP)</span>
                <span className="opacity-40">JAN 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Experience & Education */}
        <div className="space-y-8">
          <div className="hud-border p-6">
            <h3 className="t-display text-xs mb-6 tracking-widest" style={{ color: 'var(--accent)' }}>SERVICE_HISTORY</h3>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l border-[var(--edge)]">
                  <div className="absolute left-[-5px] top-1 w-[9px] h-[9px] bg-[var(--accent)] rounded-full blur-[2px]" />
                  <div className="flex justify-between items-start mb-1">
                    <div className="t-display text-xs" style={{ color: 'var(--text-hi)' }}>{exp.company}</div>
                    <div className="t-mono text-[0.6rem] opacity-40 font-bold">{exp.date}</div>
                  </div>
                  <div className="t-mono text-[0.65rem] mb-2" style={{ color: 'var(--accent)' }}>{exp.role.toUpperCase()}</div>
                  <div className="t-body text-[0.72rem] opacity-60 leading-relaxed">{exp.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hud-border p-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <h3 className="t-display text-xs mb-4 tracking-widest opacity-40">EDUCATION.MD</h3>
            <div className="t-mono text-[0.7rem]">
              <div style={{ color: 'var(--text-hi)' }}>Lovely Professional University</div>
              <div className="opacity-50">B.Tech in Computer Science & Engineering</div>
              <div className="opacity-30 mt-1">GPA: 8.5/10 // 2023 - 2027</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

