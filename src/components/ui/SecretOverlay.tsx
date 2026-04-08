'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SecretOverlay({ open, onClose }: { open:boolean; onClose:()=>void }) {
  const [flag, setFlag] = useState(false)
  useEffect(() => { if(open) setTimeout(()=>setFlag(true),1800); else setFlag(false) }, [open])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[20000] flex flex-col items-center justify-center text-center p-8"
          style={{ background:'#000' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
          <motion.div initial={{ scale:.85, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:.3, type:'spring' }}
            className="max-w-xl w-full">
            <div className="t-mono text-xs tracking-[.5em] mb-8" style={{ color:'var(--acid)' }}>
              // ACCESS_GRANTED — CLEARANCE_LEVEL: OMEGA
            </div>
            <div className="t-display text-5xl mb-8 glitch" data-text="SYSTEM_COMPROMISED"
              style={{ color:'var(--acid)', textShadow:'0 0 20px var(--acid)', fontSize:'clamp(1.8rem,6vw,3.5rem)' }}>
              SYSTEM_COMPROMISED
            </div>
            <div className="t-mono text-sm leading-relaxed mb-8" style={{ color:'var(--text-mid)' }}>
              Congratulations, curious soul. You found the hidden layer.<br /><br />
              Every system has a backdoor.<br />Every lock has a key. Every firewall, a gap.<br /><br />
              The question isn't whether you can get in —<br />it's whether you're worthy of what you find.
            </div>
            <AnimatePresence>
              {flag && (
                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  className="mb-8 p-4 t-mono text-sm tracking-widest card">
                  <span style={{ color:'var(--ion)' }}>Flag: </span>
                  <span style={{ color:'var(--acid)' }}>CTF&#123;y0u_f0und_th3_s3cr3t_l4y3r_gj&#125;</span>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="t-mono text-xs mb-8" style={{ color:'var(--text-lo)' }}>
              "The quieter you become, the more you can hear." — K. Mitnick
            </p>
            <button onClick={onClose} className="btn plasma-btn">CLOSE TRANSMISSION</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
