'use client'
import dynamic from 'next/dynamic'
const App = dynamic(() => import('@/components/App'), { ssr: false, loading: () => <Loader /> })
function Loader() {
  return (
    <div style={{position:'fixed',inset:0,background:'#060609',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:9999}}>
      <div style={{fontFamily:'sans-serif',fontSize:'1.5rem',fontWeight:'bold',color:'#C8FF00',letterSpacing:'.2em',marginBottom:'2rem',textShadow:'0 0 20px #C8FF00'}}>Z3R0RU135</div>
      <div style={{width:'240px',height:'2px',background:'rgba(200,255,0,.1)',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'100%',background:'linear-gradient(90deg,#C8FF00,#FF2D78)',animation:'loadBar 2.4s ease forwards',borderRadius:'2px'}}/>
      </div>
      <style>{`@keyframes loadBar{from{width:0}to{width:100%}}`}</style>
    </div>
  )
}
export default function Home() { return <App /> }
