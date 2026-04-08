'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Line = { type:'prompt'|'out'|'info'|'err'|'hi'|'blank'; text:string }

const COMMANDS: Record<string,(args:string[])=>Line[]> = {
  help: () => [
    { type:'hi',  text:'╔══════════════════════════════════════╗' },
    { type:'hi',  text:'║      Z3R0RU135 TERMINAL v2.4.1       ║' },
    { type:'hi',  text:'╚══════════════════════════════════════╝' },
    { type:'blank', text:'' },
    { type:'info', text:'  whoami      — identity profile' },
    { type:'info', text:'  projects    — list all projects' },
    { type:'info', text:'  cyberlab    — security sectors' },
    { type:'info', text:'  skills      — skill matrix' },
    { type:'info', text:'  contact     — communication vectors' },
    { type:'info', text:'  blog        — latest transmissions' },
    { type:'info', text:'  matrix      — reality distortion' },
    { type:'info', text:'  secret      — ???' },
    { type:'info', text:'  clear       — clear terminal' },
    { type:'blank', text:'' },
  ],
  whoami: () => [
    { type:'hi',   text:'IDENTITY: z3r0ru135' },
    { type:'out',  text:'Role     : Security Researcher / Software Engineer' },
    { type:'out',  text:'Location : [CLASSIFIED]' },
    { type:'out',  text:'Status   : Active | Building | Breaking' },
    { type:'out',  text:'Clearance: OMEGA-3' },
    { type:'out',  text:'Handles  : HTB · CTF · GitHub · Twitter' },
    { type:'blank', text:'' },
  ],
  projects: () => [
    { type:'hi',   text:'BUILD_LOG [6 projects found]' },
    { type:'out',  text:'  ◈ phantom-scanner    — async network recon  [★847]' },
    { type:'out',  text:'  ◬ nexus-ai           — LLM orchestration    [★1203]' },
    { type:'out',  text:'  ◉ cryptvault         — zero-knowledge vault [★562]' },
    { type:'out',  text:'  ◎ netpulse           — traffic monitor      [★334]' },
    { type:'out',  text:'  ◐ darkweb-crawler    — threat intel         [★921]' },
    { type:'out',  text:'  ◫ forge-cli          — dev automation       [★178]' },
    { type:'blank', text:'' },
  ],
  cyberlab: () => [
    { type:'hi',   text:'CYBER_LAB SECTORS:' },
    { type:'out',  text:'  ▣ CTF Writeups       — ACTIVE (14 events)' },
    { type:'out',  text:'  ◈ Security Research  — ONGOING (3 CVEs)' },
    { type:'out',  text:'  ◉ Tools & Scripts    — OPEN SOURCE' },
    { type:'out',  text:'  ◎ Learning Resources — UNLOCKED' },
    { type:'blank', text:'' },
  ],
  skills: () => [
    { type:'hi',   text:'SKILL_MATRIX:' },
    { type:'out',  text:'  Python/Rust/Go     ████████████ 92%' },
    { type:'out',  text:'  Pentesting         ████████████ 90%' },
    { type:'out',  text:'  Web App Security   ████████████ 95%' },
    { type:'out',  text:'  Rev Engineering   █████████░░░ 78%' },
    { type:'out',  text:'  Cloud Security    █████████░░░ 74%' },
    { type:'out',  text:'  AI/ML Systems     ██████████░░ 83%' },
    { type:'blank', text:'' },
  ],
  contact: () => [
    { type:'hi',   text:'CONTACT_VECTORS:' },
    { type:'out',  text:'  GitHub  : github.com/z3r0ru135' },
    { type:'out',  text:'  Twitter : @z3r0ru135' },
    { type:'out',  text:'  HTB     : z3r0ru135' },
    { type:'out',  text:'  Email   : [ENCRYPTED — use PGP]' },
    { type:'blank', text:'' },
  ],
  blog: () => [
    { type:'hi',   text:'LATEST_TRANSMISSIONS:' },
    { type:'out',  text:'  [1] Breaking OAuth2: When Trust Becomes a Vulnerability' },
    { type:'out',  text:'  [2] Prompt Injection: The Unsolved Problem of LLM Security' },
    { type:'out',  text:'  [3] HTB Forest: Owning Active Directory from Zero' },
    { type:'out',  text:'  [4] The Ethics of Offensive Security' },
    { type:'blank', text:'' },
  ],
  matrix: () => {
    setTimeout(() => {
      document.body.style.filter = 'hue-rotate(90deg) saturate(2)'
      setTimeout(() => { document.body.style.filter = '' }, 3500)
    }, 50)
    return [
      { type:'hi',  text:'INITIATING REALITY_DISTORTION.EXE...' },
      { type:'out', text:'// You have chosen to see how deep the rabbit hole goes.' },
      { type:'out', text:'// Reality suspended for 3.5 seconds.' },
      { type:'blank', text:'' },
    ]
  },
  secret: () => {
    setTimeout(() => document.querySelector<HTMLButtonElement>('.footer-secret-btn')?.click(), 400)
    return [
      { type:'hi',  text:'ACCESSING CLASSIFIED SECTOR...' },
      { type:'out', text:'// Clearance verified. Omega-3 protocol activated.' },
      { type:'blank', text:'' },
    ]
  },
  clear: () => [],
}

export default function Terminal({ open, onClose }: { open:boolean; onClose:()=>void }) {
  const [lines, setLines] = useState<Line[]>([
    { type:'hi',   text:'Z3R0RU135 TERMINAL v2.4.1 — ghost:~$' },
    { type:'out',  text:'Type  help  for available commands.' },
    { type:'blank', text:'' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100) }, [open])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [lines])

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const [c, ...args] = trimmed.split(' ')
    const promptLine: Line = { type:'prompt', text:`ghost:~$ ${cmd}` }

    if (!trimmed) { setLines(p=>[...p, promptLine]); return }

    setHistory(h=>[cmd,...h])
    setHistIdx(-1)

    if (c === 'clear') { setLines([]); return }

    const handler = COMMANDS[c]
    const result: Line[] = handler ? handler(args) : [
      { type:'err', text:`command not found: ${c}` },
      { type:'out', text:"Type  'help'  for available commands." },
      { type:'blank', text:'' },
    ]
    setLines(p=>[...p, promptLine, ...result])
  }

  const colorMap: Record<string,string> = {
    prompt:'var(--acid)', out:'var(--text-mid)', info:'var(--ion)',
    err:'var(--plasma)', hi:'var(--ghost)', blank:'inherit'
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          style={{ background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)' }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          onClick={e=>{ if(e.target===e.currentTarget) onClose() }}>

          <motion.div className="term-window w-full max-w-2xl"
            initial={{ scale:.92, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:.92, y:20 }}>

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor:'rgba(200,255,0,.15)', background:'rgba(200,255,0,.03)' }}>
              <div className="flex gap-2">
                {['var(--plasma)','#FFB830','var(--acid)'].map((c,i)=>(
                  <div key={i} className="w-3 h-3 rounded-full" style={{ background:c }} />
                ))}
              </div>
              <div className="flex-1 text-center t-mono text-xs tracking-widest" style={{ color:'var(--acid)' }}>
                z3r0ru135 — bash — 80×24
              </div>
              <button onClick={onClose} className="t-mono text-xs transition-colors"
                style={{ color:'var(--text-lo)', cursor:'none', background:'none', border:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--plasma)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--text-lo)')}>
                [ESC]
              </button>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="term-output p-4 h-80 overflow-y-auto">
              {lines.map((line, i) => (
                <div key={i} style={{ color: colorMap[line.type] || 'inherit', minHeight:'1.4em' }}>
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor:'rgba(200,255,0,.1)' }}>
              <span className="t-mono text-sm t-prompt">ghost:~$</span>
              <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none t-mono text-sm"
                style={{ color:'var(--acid)', caretColor:'var(--acid)', cursor:'none' }}
                onKeyDown={e=>{
                  if (e.key==='Enter') { run(input); setInput('') }
                  if (e.key==='ArrowUp') { const ni=Math.min(histIdx+1,history.length-1); setHistIdx(ni); setInput(history[ni]||'') }
                  if (e.key==='ArrowDown') { const ni=Math.max(histIdx-1,-1); setHistIdx(ni); setInput(ni===-1?'':history[ni]||'') }
                  if (e.key==='Tab') { e.preventDefault()
                    const cmds=Object.keys(COMMANDS); const match=cmds.find(c=>c.startsWith(input))
                    if(match) setInput(match)
                  }
                }}
                spellCheck={false} autoComplete="off" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
