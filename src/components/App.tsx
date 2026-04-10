'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Cursor from './ui/Cursor'
import LoadingScreen from './ui/LoadingScreen'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import CyberLabSection from './sections/CyberLabSection'
import PlaygroundSection from './sections/PlaygroundSection'
import IntelSection from './sections/IntelSection'
import AboutSection from './sections/AboutSection'
import Terminal from './terminal/Terminal'
import AIAssistant from './ai/AIAssistant'

const Scene3D = dynamic(() => import('./3d/Scene3D'), { ssr: false })

type Module = 'OVERVIEW' | 'UTILITIES' | 'RESOURCES' | 'ASSETS' | 'CREDENTIALS'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeModule, setActiveModule] = useState<Module>('OVERVIEW')
  const [termOpen, setTermOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') setTermOpen(v => !v)
      if (e.key === 'Escape') setTermOpen(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const navItems: { id: Module; label: string; icon: string }[] = [
    { id: 'OVERVIEW',    label: 'SYSTEM_OVERVIEW', icon: '▣' },
    { id: 'UTILITIES',   label: 'TOOLS_GATEWAY',   icon: '▧' },
    { id: 'ASSETS',      label: 'PROJECT_ASSETS',  icon: '▤' },
    { id: 'RESOURCES',   label: 'INTEL_MONITOR', icon: '▨' },
    { id: 'CREDENTIALS', label: 'USER_IDENTITY',   icon: '▩' },
  ]

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen key="load" />}</AnimatePresence>

      {loaded && (
        <div className="dash-container">
          <div className="scanlines" />
          <div className="noise" />
          <Cursor />
          <Scene3D />

          {/* Sidebar */}
          <aside className="dash-sidebar">
            <div className="p-6 border-b border-[var(--edge)] mb-4">
              <div className="t-display text-xl tracking-tighter" style={{ color: 'var(--primary)', textShadow: 'var(--glow)' }}>
                Z3R0_OS<span className="text-[0.6rem] ml-1 opacity-50">v2.4</span>
              </div>
              <div className="t-mono text-[0.6rem] mt-1 opacity-40">USER: ADITYA_RAJ</div>
            </div>

            <nav className="flex-1">
              {navItems.map(item => (
                <div
                  key={item.id}
                  className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
                  onClick={() => setActiveModule(item.id)}
                >
                  <span className="mr-3 opacity-70">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-[var(--edge)]">
              <button
                onClick={() => setTermOpen(true)}
                className="w-full btn ghost text-[0.65rem] py-2 justify-center"
              >
                EXECUTE_TERMINAL [^`]
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="dash-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-[2]"
              >
                {activeModule === 'OVERVIEW'    && <HeroSection />}
                {activeModule === 'UTILITIES'   && <PlaygroundSection />}
                {activeModule === 'ASSETS'      && <ProjectsSection />}
                {activeModule === 'RESOURCES'   && (
                  <>
                    <IntelSection />
                    <div className="divider" />
                    <CyberLabSection />
                  </>
                )}
                {activeModule === 'CREDENTIALS' && <AboutSection />}
              </motion.div>
            </AnimatePresence>

            {/* Global HUD elements */}
            <div className="fixed bottom-4 right-6 z-[100] t-mono text-[0.6rem] opacity-30 pointer-events-none">
              COORD: 28.6139° N, 77.2090° E // SYSTEM_STABLE // NO_THREATS_DETECTED
            </div>
          </main>

          <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
          <AIAssistant />
        </div>
      )}
    </>
  )
}

