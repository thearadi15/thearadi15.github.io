'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const CITIES = [
  { name: 'NEW_YORK', x: 25, y: 35 },
  { name: 'LONDON', x: 48, y: 30 },
  { name: 'TOKYO', x: 85, y: 35 },
  { name: 'SYDNEY', x: 88, y: 80 },
  { name: 'MOSCOW', x: 58, y: 25 },
  { name: 'SHANGHAI', x: 82, y: 42 },
  { name: 'LOS_ANGELES', x: 15, y: 40 },
  { name: 'BERLIN', x: 51, y: 30 },
  { name: 'NEW_DELHI', x: 68, y: 45 },
  { name: 'SAO_PAULO', x: 32, y: 75 },
  { name: 'LAGOS', x: 48, y: 55 },
  { name: 'DUBAI', x: 60, y: 45 },
]

const THREAT_TYPES = [
  'BRUTE_FORCE_PROTOCOL_V7',
  'SQL_INJECTION_OVERFLOW',
  'DDOS_SYN_FLOOD',
  'ZERO_DAY_EXPLOIT_LEAK',
  'MALWARE_PAYLOAD_DROP',
  'ENCRYPTION_LAYER_BREACH',
  'SHASH_COLLISION_ATTEMPT',
]

interface Attack {
  id: number
  from: typeof CITIES[0]
  to: typeof CITIES[0]
  type: string
}

export default function IntelSection() {
  const [attacks, setAttacks] = useState<Attack[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [risk, setRisk] = useState(42)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const from = CITIES[Math.floor(Math.random() * CITIES.length)]
      const to = CITIES[Math.floor(Math.random() * CITIES.length)]
      const type = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)]
      
      if (from === to) return

      const newAttack = { id: Date.now(), from, to, type }
      setAttacks(prev => [...prev.slice(-8), newAttack])
      
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false })
      const logMsg = `[${timestamp}] ALERT_${type} FROM [${from.name}] TO [${to.name}] -- STATUS: NEUTRALIZED`
      setLogs(prev => [...prev.slice(-20), logMsg])
      
      setRisk(prev => Math.min(100, Math.max(10, prev + (Math.random() * 10 - 5))))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  return (
    <div className="h-full flex flex-col gap-6 p-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-[var(--edge)] bg-[rgba(0,229,255,0.03)] backdrop-blur-md relative overflow-hidden">
          <div className="t-mono text-[0.6rem] opacity-50 mb-1">GLOBAL_RISK_INDEX</div>
          <div className="t-display text-4xl text-[var(--primary)]">{risk.toFixed(1)}%</div>
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-[var(--primary)]"
            animate={{ width: `${risk}%` }}
          />
        </div>
        <div className="p-4 border border-[var(--edge)] bg-[rgba(123,97,255,0.03)] backdrop-blur-md">
          <div className="t-mono text-[0.6rem] opacity-50 mb-1">ACTIVE_THREATS</div>
          <div className="t-display text-4xl text-[var(--accent)]">{attacks.length}</div>
        </div>
        <div className="p-4 border border-[var(--edge)] bg-[rgba(255,45,120,0.03)] backdrop-blur-md text-right">
          <div className="t-mono text-[0.6rem] opacity-50 mb-1">SYSTEM_STATUS</div>
          <div className="t-display text-2xl text-[var(--secondary)] animate-pulse">LOCKED_//_STABLE</div>
        </div>
      </div>

      {/* Main Map Visualization */}
      <div className="flex-1 relative border border-[var(--edge)] bg-[#050508] overflow-hidden min-h-[400px]">
        <div className="scanlines opacity-20 pointer-events-none" />
        <div className="absolute top-4 left-4 t-mono text-[0.65rem] opacity-40">REAL_TIME_INTEL_VECTOR_MAP</div>
        
        {/* World Grid Map (Semi-abstract) */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 select-none">
          {/* Simple dot-map representation */}
          {[...Array(20)].map((_, i) => (
            <line key={`v-${i}`} x1={i*5} y1="0" x2={i*5} y2="100" stroke="var(--edge)" strokeWidth="0.05" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i*5} x2="100" y2={i*5} stroke="var(--edge)" strokeWidth="0.05" />
          ))}
          
          {/* Attack Lines */}
          <AnimatePresence>
            {attacks.map(attack => {
              const dx = attack.to.x - attack.from.x
              const dy = attack.to.y - attack.from.y
              const midX = (attack.from.x + attack.to.x) / 2
              const midY = (attack.from.y + attack.to.y) / 2 - 10 // Curve upward
              
              const path = `M ${attack.from.x} ${attack.from.y} Q ${midX} ${midY} ${attack.to.x} ${attack.to.y}`
              
              return (
                <g key={attack.id}>
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.circle
                    r="0.8"
                    fill="var(--primary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [attack.from.x, attack.to.x],
                      y: [attack.from.y, attack.to.y],
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Origin Pulse */}
                  <motion.circle
                    cx={attack.from.x} cy={attack.from.y}
                    r="2" stroke="var(--primary)" fill="none"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                </g>
              )
            })}
          </AnimatePresence>

          {/* City Nodes */}
          {CITIES.map(city => (
            <g key={city.name}>
              <circle cx={city.x} cy={city.y} r="0.4" fill="var(--text-lo)" opacity="0.5" />
              <text x={city.x + 1} y={city.y} fontSize="1.2" fill="var(--text-lo)" className="t-mono opacity-20" style={{ pointerEvents:'none' }}>
                {city.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
            <div className="t-mono text-[0.5rem] opacity-50 text-white">EXTERNAL_INTRUSION_VECTOR</div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
            <div className="t-mono text-[0.5rem] opacity-50">HEURISTIC_BUFFER_ZONE</div>
          </div>
        </div>
      </div>

      {/* Terminal Log */}
      <div className="h-40 border border-[var(--edge)] bg-black/50 p-4 relative backdrop-blur-xl">
        <div className="absolute top-0 right-4 h-full flex items-center">
            <div className="w-1 h-2/3 bg-[var(--primary)] opacity-10 rounded-full" />
        </div>
        <div className="t-mono text-[0.6rem] opacity-40 mb-2 flex justify-between uppercase">
            <span>Live_Incident_Feed</span>
            <span className="animate-pulse">●_STREAMING_DATA</span>
        </div>
        <div 
          ref={logRef}
          className="h-full overflow-y-auto t-mono text-[0.65rem] scrollbar-hide space-y-1"
        >
          {logs.map((log, i) => (
            <div key={i} className={log.includes('ALERT') ? 'text-[var(--primary)]' : 'text-white/60'}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
