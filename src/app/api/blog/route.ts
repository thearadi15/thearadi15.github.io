import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({
    posts: [
      { id:1, title:"Breaking OAuth2: When Trust Becomes a Vulnerability", excerpt:"Deep dive into how OAuth2 flows are exploited through subtle implementation flaws and token confusion attacks that bypass PKCE entirely.", cat:"CYBERSECURITY", date:"2024.12.15", read:"12 min", accent:"acid", slug:"breaking-oauth2" },
      { id:2, title:"Prompt Injection: The Unsolved Problem of LLM Security", excerpt:"Why every LLM-powered application is a potential attack surface, and how adversarial prompts hijack agent behavior in production systems.", cat:"AI & ML", date:"2024.11.28", read:"8 min", accent:"ghost", slug:"prompt-injection" },
      { id:3, title:"HTB Forest: Owning Active Directory from Zero", excerpt:"Full walkthrough from AS-REP Roasting to DCSync privilege escalation through a real Active Directory environment, step by step.", cat:"CTF", date:"2024.11.10", read:"20 min", accent:"plasma", slug:"htb-forest" },
      { id:4, title:"The Ethics of Offensive Security", excerpt:"A personal reflection on the moral complexities of red teaming, bug bounty hunting, and understanding the adversarial mindset.", cat:"PHILOSOPHY", date:"2024.10.22", read:"6 min", accent:"ember", slug:"ethics-offsec" },
    ]
  })
}
