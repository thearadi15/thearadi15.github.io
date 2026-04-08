import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({
    projects: [
      { id:1, name:"PHANTOM SCANNER", desc:"Advanced async network recon tool with stealth mode and distributed scanning. Maps attack surfaces across entire CIDR ranges in seconds.", tags:["Python","Scapy","AsyncIO","SQLite"], icon:"◈", color:"acid", status:"ACTIVE", stars:847, github:"#", demo:"#" },
      { id:2, name:"NEXUS AI", desc:"Modular LLM orchestration layer that chains multiple AI agents for complex autonomous reasoning with persistent memory and tool use.", tags:["TypeScript","LangChain","Redis","Docker"], icon:"◬", color:"ghost", status:"v2.0", stars:1203, github:"#", demo:"#" },
      { id:3, name:"CRYPTVAULT", desc:"Zero-knowledge encrypted secrets manager built in Rust. Local-first architecture — your data never leaves your machine unencrypted.", tags:["Rust","AES-256","Tauri","React"], icon:"◉", color:"plasma", status:"OSS", stars:562, github:"#", demo:"#" },
      { id:4, name:"NETPULSE", desc:"Real-time network traffic visualization with ML-based anomaly detection and instant threat alerting via configurable webhooks.", tags:["Go","InfluxDB","Grafana","Kafka"], icon:"◎", color:"ember", status:"BETA", stars:334, github:"#", demo:"#" },
      { id:5, name:"DARKWEB CRAWLER", desc:"Ethical threat intel crawler for monitoring leaked credentials and dark web chatter, with automated correlation and alerting.", tags:["Python","Tor","Elasticsearch","OSINT"], icon:"◐", color:"ion", status:"LIVE", stars:921, github:"#", demo:"#" },
      { id:6, name:"FORGE CLI", desc:"Developer automation toolkit with pluggable modules for scaffolding, testing, and deploying full-stack apps in under 60 seconds.", tags:["Node.js","Bash","YAML","Handlebars"], icon:"◫", color:"acid", status:"WIP", stars:178, github:"#", demo:"#" },
    ]
  })
}
