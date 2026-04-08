'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Msg = { role:'ai'|'user'; text:string }

const quickReplies = [
  { label:'⚡ Projects', q:'show me projects' },
  { label:'🔐 Cyber Lab', q:'what is in the cyber lab' },
  { label:'👾 About', q:'tell me about z3r0ru135' },
  { label:'🖥 Terminal', q:'how do I open the terminal' },
]

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role:'ai', text:"ARIA online. I'm your guide to this digital universe. Ask me about z3r0ru135's projects, security research, or how to navigate the site. 👾" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, [msgs])

  // Auto-open once on load
  useEffect(() => {
    const t = setTimeout(() => { setOpen(true); setTimeout(() => setOpen(false), 5000) }, 3000)
    return () => clearTimeout(t)
  }, [])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setMsgs(m=>[...m, { role:'user', text }])
    setInput('')
    setLoading(true)
    try {
      const r = await fetch('/api/aria', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ message:text }) })
      const d = await r.json()
      setMsgs(m=>[...m, { role:'ai', text:d.response }])
    } catch {
      setMsgs(m=>[...m, { role:'ai', text:'Connection error. Try again, operator.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:5000 }}>
      <AnimatePresence>
        {open && (
          <motion.div className="ai-panel" style={{ position:'absolute' }}
            initial={{ opacity:0, y:14, scale:.95 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:14, scale:.95 }} transition={{ duration:.25 }}>

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor:'var(--edge)', background:'rgba(200,255,0,.025)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background:'linear-gradient(135deg,rgba(200,255,0,.15),rgba(255,45,120,.15))', border:'1px solid var(--edge)' }}>🤖</div>
              <div>
                <div className="t-display text-xs tracking-widest acid-text">ARIA</div>
                <div className="t-mono text-xs" style={{ color:'var(--acid)', fontSize:'.6rem' }}>● ONLINE</div>
              </div>
              <button onClick={()=>setOpen(false)}
                className="ml-auto t-mono text-xs transition-colors"
                style={{ color:'var(--text-lo)', cursor:'none', background:'none', border:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--plasma)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--text-lo)')}>✕</button>
            </div>

            {/* Messages */}
            <div ref={msgsRef} className="p-3 space-y-2 overflow-y-auto" style={{ height:'220px' }}>
              {msgs.map((m,i)=>(
                <div key={i} className={`ai-msg ${m.role==='user'?'user':''}`}>{m.text}</div>
              ))}
              {loading && (
                <div className="ai-msg">
                  <span style={{ color:'var(--acid)' }}>▮</span>
                  <span style={{ color:'var(--acid)', animation:'blink 1s step-end infinite', marginLeft:'4px' }}>▮</span>
                  <span style={{ color:'var(--acid)', animation:'blink 1s step-end infinite .3s', marginLeft:'4px' }}>▮</span>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="px-3 py-2 border-t flex flex-wrap gap-2" style={{ borderColor:'var(--edge)' }}>
              {quickReplies.map(q=>(
                <button key={q.label} onClick={()=>send(q.q)}
                  className="t-mono text-xs px-2 py-1 border rounded-sm transition-all duration-200"
                  style={{ borderColor:'var(--edge)', color:'var(--text-mid)', background:'transparent', cursor:'none', fontSize:'.6rem' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--acid)'; e.currentTarget.style.color='var(--acid)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--edge)'; e.currentTarget.style.color='var(--text-mid)' }}>
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 border-t" style={{ borderColor:'var(--edge)' }}>
              <input value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&send(input)}
                placeholder="Ask ARIA..."
                className="flex-1 bg-transparent border t-mono text-xs px-3 py-2 outline-none rounded-sm"
                style={{ borderColor:'var(--edge)', color:'var(--text-hi)', cursor:'none', fontSize:'.72rem' }}
                onFocus={e=>e.target.style.borderColor='var(--acid)'}
                onBlur={e=>e.target.style.borderColor='var(--edge)'} />
              <button onClick={()=>send(input)} disabled={loading}
                className="px-3 py-2 border t-mono text-xs transition-all duration-200 rounded-sm"
                style={{ borderColor:'var(--acid)', color:'var(--acid)', background:'rgba(200,255,0,.08)', cursor:'none' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(200,255,0,.18)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(200,255,0,.08)'}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger bubble */}
      <div onClick={()=>setOpen(v=>!v)}
        className="float-anim relative flex items-center justify-center text-2xl rounded-full"
        style={{ width:'56px', height:'56px', background:'linear-gradient(135deg,rgba(200,255,0,.15),rgba(255,45,120,.15))', border:'1px solid var(--edge)', cursor:'none', boxShadow:'0 0 30px rgba(200,255,0,.2)' }}>
        🤖
        <span className="pulse-dot absolute w-3 h-3 rounded-full" style={{ top:'-4px', right:'-4px', background:'var(--acid)', boxShadow:'0 0 8px var(--acid)' }} />
      </div>
    </div>
  )
}
