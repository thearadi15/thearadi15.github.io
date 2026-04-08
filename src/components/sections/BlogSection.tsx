'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const accentMap: Record<string,string> = {
  acid:'var(--acid)', ghost:'var(--ghost)', plasma:'var(--plasma)', ember:'var(--ember)'
}

const posts = [
  { id:1, title:"Breaking OAuth2: When Trust Becomes a Vulnerability", excerpt:"Deep dive into how OAuth2 flows are exploited through subtle implementation flaws and token confusion attacks that bypass PKCE entirely.", cat:"CYBERSECURITY", date:"2024.12.15", read:"12 min", accent:"acid" },
  { id:2, title:"Prompt Injection: The Unsolved Problem of LLM Security", excerpt:"Why every LLM-powered application is a potential attack surface, and how adversarial prompts hijack agent behavior in production systems.", cat:"AI & ML", date:"2024.11.28", read:"8 min", accent:"ghost" },
  { id:3, title:"HTB Forest: Owning Active Directory from Zero", excerpt:"Full walkthrough from AS-REP Roasting to DCSync privilege escalation through a real Active Directory environment, step by step.", cat:"CTF", date:"2024.11.10", read:"20 min", accent:"plasma" },
  { id:4, title:"The Ethics of Offensive Security", excerpt:"A personal reflection on the moral complexities of red teaming, bug bounty hunting, and understanding the adversarial mindset to build better defenses.", cat:"PHILOSOPHY", date:"2024.10.22", read:"6 min", accent:"ember" },
]

export default function BlogSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="blog" ref={ref} style={{ background:'linear-gradient(180deg,transparent,rgba(200,255,0,.012),transparent)' }}>
      <div className="section-wrap">
        <motion.div className="mb-14" initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}>
          <div className="sec-tag mb-3">// 0x05_TRANSMISSIONS</div>
          <h2 className="sec-title acid-text" style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>
            DATA<span style={{ color:'var(--ghost)' }}>_FEED</span>
          </h2>
          <div className="sec-line" />
        </motion.div>

        <div className="grid gap-5" style={{ gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))' }}>
          {posts.map((post, i) => (
            <motion.div key={post.id} className="card overflow-hidden group lift cursor-pointer"
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.5, delay: i*.1 }}>
              {/* Accent top bar */}
              <div className="h-[2px]" style={{ background:accentMap[post.accent], boxShadow:`0 0 8px ${accentMap[post.accent]}` }} />

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="t-mono text-xs tracking-widest" style={{ color:accentMap[post.accent] }}>{post.cat}</span>
                  <span className="t-mono text-xs" style={{ color:'var(--text-lo)' }}>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="t-body font-bold text-lg leading-snug mb-3 transition-colors duration-200 group-hover:text-acid"
                    style={{ color:'var(--text-hi)', fontWeight:700, lineHeight:1.35 }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="t-mono text-xs leading-relaxed mb-5" style={{ color:'var(--text-mid)', lineHeight:'1.8' }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor:'var(--edge)' }}>
                  <span className="t-mono text-xs flex items-center gap-2 transition-colors duration-200"
                        style={{ color:'var(--text-lo)' }}
                        onMouseEnter={e=>(e.currentTarget.style.color=accentMap[post.accent])}
                        onMouseLeave={e=>(e.currentTarget.style.color='var(--text-lo)')}>
                    READ_ARTICLE →
                  </span>
                  <span className="t-mono text-xs" style={{ color:'var(--text-lo)' }}>{post.read}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All posts CTA */}
        <motion.div className="text-center mt-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.6 }}>
          <a href="#" className="btn text-xs py-3 px-8">VIEW ALL TRANSMISSIONS →</a>
        </motion.div>
      </div>
    </section>
  )
}
