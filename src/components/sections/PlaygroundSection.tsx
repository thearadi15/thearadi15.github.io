'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ── Password Forge ───────────────────────────────────────────── */
function PasswordForge() {
  const [pwd, setPwd] = useState('')
  const [entropy, setEntropy] = useState(0)
  const [copied, setCopied] = useState(false)
  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.?'
    const arr = new Uint8Array(24)
    crypto.getRandomValues(arr)
    const p = Array.from(arr).map(b=>chars[b%chars.length]).join('')
    setPwd(p)
    setEntropy(Math.floor(Math.log2(Math.pow(chars.length, p.length))))
  }
  const copy = () => { navigator.clipboard.writeText(pwd); setCopied(true); setTimeout(()=>setCopied(false),1500) }
  useEffect(() => { generate() }, [])

  return (
    <div className="p-5 space-y-4">
      <div className="t-mono text-[0.6rem] tracking-[0.3em] opacity-40 uppercase">// PASSWORD_CRYPTO_FORGE</div>
      <div className="hud-border p-3 flex items-center justify-between group overflow-hidden">
        <span className="t-mono text-xs text-[var(--primary)] break-all flex-1 pr-4">{pwd}</span>
        <button onClick={copy} className="t-mono text-[0.6rem] px-3 py-1 border border-[var(--edge)] hover:bg-[var(--primary)] hover:text-black transition-all">
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 skill-track h-[2px]">
          <motion.div className="skill-fill h-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, entropy/2)}%` }} />
        </div>
        <span className="t-mono text-[0.6rem] opacity-60">ENTROPY: {entropy}bits</span>
      </div>
      <button className="w-full btn text-[0.65rem] py-2 justify-center" onClick={generate}>REGENERATE_SECRET_KEY</button>
    </div>
  )
}

/* ── ASCII Art Generator ──────────────────────────────────────── */
const PIXEL_FONT: Record<string, string[]> = {
  A:[' ▄▄ ','█▄▄█','█  █'], B:['█▄▄ ','█  █','█▄▄ '], C:[' ▄▄ ','█   ',' ▀▀ '],
  D:['█▄  ','█ █ ','▀▀  '], E:['█▀▀ ','█▀▀ ','▀▀▀ '], F:['█▀▀ ','█▀  ','█   '],
  G:[' ▄▄ ','█ ▀█',' ▀▀ '], H:['█  █','█▀▀█','█  █'], I:[' █ ',' █ ',' ▀ '],
  J:['  █','  █','▀▀  '], K:['█ ▄ ','█▀  ','█  ▀'], L:['█   ','█   ','▀▀▀ '],
  M:['█▄▄█','█  █','█  █'], N:['█  █','██ █','█ ██'], O:[' ▄▄ ','█  █',' ▀▀ '],
  P:['█▄▄█','█▀▀ ','█   '], Q:[' ▄▄ ','█  █',' ▀▀▄'], R:['█▄▄█','█ ▀▄','█  █'],
  S:[' ▄▄ ',' ▀▄ ','▄▄  '], T:['▀▀█▀▀','  █  ','  █  '], U:['█  █','█  █',' ▀▀ '],
  V:['█  █','█  █',' ▀▀ '], W:['█  █','█▄▄█','▀  ▀'], X:['█  █',' ▀▀ ','█  █'],
  Y:['█  █',' ▀▀ ',' █  '], Z:['▀▀▀█',' ▄▀ ','█▄▄▄'],
  '0':[' ▄▄ ','█  █',' ▀▀ '], '1':[' ▄█ ','  █ ',' ▀▀▀'], ' ':['    ','    ','    '],
}
function AsciiGen() {
  const [input, setInput] = useState('CYAD')
  const [art, setArt] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback((val: string) => {
    const rows = ['','','']
    for (const c of val.toUpperCase().slice(0, 10)) {
      const g = PIXEL_FONT[c] || PIXEL_FONT[' ']
      g.forEach((r,i) => rows[i] += r + ' ')
    }
    setArt(rows.join('\n'))
  }, [])

  useEffect(()=>generate(input),[input, generate])

  return (
    <div className="p-5 space-y-4">
      <div className="t-mono text-[0.6rem] tracking-[0.3em] opacity-40 uppercase">// ASCII_PIXEL_RENDERER</div>
      <div className="hud-border p-4 bg-black/40 min-h-[80px] flex items-center justify-center relative">
        <pre className="t-mono text-[0.6rem] leading-none text-[var(--secondary)] text-center">{art}</pre>
        <button onClick={() => { navigator.clipboard.writeText(art); setCopied(true); setTimeout(()=>setCopied(false),1500) }}
                className="absolute top-2 right-2 t-mono text-[0.5rem] opacity-40 hover:opacity-100 transition-opacity">
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} maxLength={10} 
               className="flex-1 bg-transparent border border-[var(--edge)] t-mono text-xs px-3 py-2 outline-none focus:border-[var(--secondary)]"
               placeholder="TYPE_INPUT..." />
      </div>
    </div>
  )
}

/* ── Hash Inspector ───────────────────────────────────────────── */
function HashGen() {
  const [input, setInput] = useState('CYAD_SOLUTIONS')
  const [hashes, setHashes] = useState<Record<string,string>>({})
  const [copyIdx, setCopyIdx] = useState<string|null>(null)

  const compute = useCallback(async (val: string) => {
    if (!val || !window.crypto?.subtle) return
    const enc = new TextEncoder()
    const buf = enc.encode(val)
    const h: Record<string,string> = {}
    for (const algo of ['SHA-256','SHA-512']) {
      const dg = await crypto.subtle.digest(algo, buf)
      h[algo] = Array.from(new Uint8Array(dg)).map(b=>b.toString(16).padStart(2,'0')).join('')
    }
    setHashes(h)
  }, [])

  useEffect(()=>{ compute(input) },[input, compute])

  const copy = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt)
    setCopyIdx(id)
    setTimeout(()=>setCopyIdx(null), 1500)
  }

  return (
    <div className="p-5 space-y-4">
      <div className="t-mono text-[0.6rem] tracking-[0.3em] opacity-40 uppercase">// HASH_INTEGRITY_CHECK</div>
      <input value={input} onChange={e=>setInput(e.target.value)}
        className="w-full bg-transparent border border-[var(--edge)] t-mono text-xs px-3 py-2 outline-none focus:border-[var(--accent)]"
        placeholder="INPUT_DATA..." />
      <div className="space-y-2">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="hud-border p-3 group cursor-pointer" onClick={()=>copy(hash, algo)}>
            <div className="flex justify-between items-center mb-1">
              <span className="t-mono text-[0.55rem] text-[var(--accent)]">{algo}</span>
              <span className="t-mono text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity">
                {copyIdx === algo ? 'COPIED' : 'CLICK_TO_COPY'}
              </span>
            </div>
            <div className="t-mono text-[0.55rem] break-all opacity-60 font-medium">{hash}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Section ─────────────────────────────────────────────── */
export default function PlaygroundSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="utilities" ref={ref} className="p-8 max-w-6xl mx-auto">
      <motion.div className="mb-12" initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}>
        <div className="sec-tag mb-3">// 0x03_UTILITY_MODULES</div>
        <h2 className="t-display text-4xl" style={{ color: 'var(--primary)', textShadow: 'var(--glow)' }}>
          CORE_TOOLS<span className="opacity-30">.SRV</span>
        </h2>
        <div className="sec-line" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} className="card hud-border p-0">
          <PasswordForge />
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1 }} className="card hud-border p-0">
          <HashGen />
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.2 }} className="card hud-border p-0 md:col-span-2 lg:col-span-1">
          <AsciiGen />
        </motion.div>
      </div>

      <div className="mt-8 hud-border p-4 bg-[var(--primary)]/5 t-mono text-[0.6rem] flex items-center gap-3">
        <span className="text-[var(--primary)]">●</span>
        <span className="opacity-60">ALL OPERATIONS PERFORMED LOCALLY VIA CLIENT-SIDE CRYPTOGRAPHY SUBTLE API. NO DATA IS TRANSMITTED.</span>
      </div>
    </section>
  )
}

