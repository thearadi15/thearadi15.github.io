import { NextResponse } from 'next/server'

const kb: Record<string,string> = {
  projects: "z3r0ru135 has built 6 major open-source weapons: Phantom Scanner (async network recon), Nexus AI (LLM orchestration), CryptVault (zero-knowledge secrets in Rust), NetPulse (traffic anomaly detection), DarkWeb Crawler (threat intel), and Forge CLI (dev automation). Head to Projects to explore each one. ⚡",
  cyberlab: "The Cyber Lab is the research bunker — CTF writeups from HackTheBox & DEFCON, original CVE disclosures, curated offensive security resources, and custom pentesting scripts. All public. 🔐",
  about: "z3r0ru135 started coding in 2016, discovered cybersecurity via CTF in 2018, published a CVE in 2020, went full red team in 2022, and built this digital universe in 2024. The story's in the About section. 👾",
  blog: "The blog covers OAuth2 exploitation, LLM prompt injection, HTB machine writeups, and the ethics of offensive security. Check the Blog section for latest transmissions. 📡",
  playground: "Playground has live interactive experiments: Matrix rain (click to cycle colors), cryptographic password forge, network probe tool, and ASCII art generator. 🎮",
  contact: "Reach z3r0ru135 via GitHub, Twitter, HackTheBox profile, or encrypted email — all linked in the About section.",
  terminal: "Hit Ctrl+` or click [TERMINAL] in the nav. Accepts: help, whoami, projects, cyberlab, skills, contact, matrix, clear — and a few secret commands.",
  secret: "I could point you somewhere... but where's the fun in that? Try clicking something that shouldn't be clickable. 👀",
  skills: "Stack: Python/Rust/Go (95%) · Penetration Testing (90%) · Web App Security (95%) · Reverse Engineering (80%) · Cloud/AWS Security (75%) · AI/ML Systems (85%).",
  ctf: "Active on HackTheBox, PicoCTF, DEFCON CTF. Specialties: AD exploitation, web app pentesting, binary analysis.",
  hello: "ARIA online. I'm your guide to this digital universe — ask me about z3r0ru135's projects, security research, blog posts, or how to navigate the site.",
  hi: "Hey operator! Ask me anything about z3r0ru135's work, the Cyber Lab, or where to go next.",
}

function reply(msg: string) {
  const l = msg.toLowerCase()
  for (const [k,v] of Object.entries(kb)) if (l.includes(k)) return v
  const def = [
    "Interesting query. Try asking about projects, cyberlab, blog, skills, or the terminal.",
    "That's outside my current intel — but the site has plenty to explore. Ask about projects or the cyber lab!",
    "I'm not sure about that one. Try: 'show me projects', 'what's in the cyber lab', or 'who is z3r0ru135'.",
  ]
  return def[Math.floor(Math.random()*def.length)]
}

export async function POST(req: Request) {
  const { message } = await req.json().catch(()=>({message:''}))
  await new Promise(r=>setTimeout(r, 300+Math.random()*400))
  return NextResponse.json({ response: reply(message||'hello'), ts: Date.now() })
}
export async function GET() {
  return NextResponse.json({ status:'ARIA_ONLINE', version:'2.4.1' })
}
