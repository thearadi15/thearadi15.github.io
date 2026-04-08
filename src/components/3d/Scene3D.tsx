'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  const count = 2800
  const [pos, col] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    // Acid, plasma, ion, ghost colors
    const palette = [[0.784,1,0],[1,0.176,0.471],[0,0.898,1],[0.482,0.38,1]]
    for (let i = 0; i < count; i++) {
      p[i*3]   = (Math.random()-.5)*220
      p[i*3+1] = (Math.random()-.5)*220
      p[i*3+2] = (Math.random()-.5)*180
      const pc = palette[Math.floor(Math.random()*palette.length)]
      c[i*3]=pc[0]; c[i*3+1]=pc[1]; c[i*3+2]=pc[2]
    }
    return [p,c]
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.018
    ref.current.rotation.x = t * 0.009
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function HexRing({ pos, r, color, speed }: { pos:[number,number,number]; r:number; color:string; speed:number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * speed * .25
    ref.current.rotation.y = t * speed * .15
    ref.current.position.y = pos[1] + Math.sin(t * .4 + pos[0] * .1) * 2.5
  })
  return (
    <mesh ref={ref} position={pos}>
      <icosahedronGeometry args={[r, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
    </mesh>
  )
}

function FloatingTorus({ pos }: { pos:[number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * .12
    ref.current.rotation.z = t * .08
    ref.current.position.y = pos[1] + Math.sin(t*.6)*3
  })
  return (
    <mesh ref={ref} position={pos}>
      <torusGeometry args={[6, 0.06, 8, 90]} />
      <meshBasicMaterial color="#C8FF00" transparent opacity={0.14} />
    </mesh>
  )
}

function CamRig() {
  const { camera } = useThree()
  const mouse = useRef({ x:0, y:0 })
  useEffect(() => {
    const h = (e: MouseEvent) => { mouse.current.x=(e.clientX/window.innerWidth-.5)*2; mouse.current.y=-(e.clientY/window.innerHeight-.5)*2 }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  useFrame(() => {
    camera.position.x += (mouse.current.x * 7 - camera.position.x) * .018
    camera.position.y += (mouse.current.y * 5 - camera.position.y) * .018
    camera.lookAt(0,0,0)
  })
  return null
}

export default function Scene3D() {
  return (
    <div className="r3f-canvas">
      <Canvas camera={{ position:[0,0,42], fov:58 }} gl={{ alpha:true, antialias:true }} style={{ background:'transparent' }}>
        <CamRig />
        <Particles />
        <HexRing pos={[-16,6,-10]} r={5} color="#C8FF00" speed={1} />
        <HexRing pos={[20,-4,-18]} r={8} color="#FF2D78" speed={.7} />
        <HexRing pos={[4,18,-28]}  r={11} color="#7B61FF" speed={.45} />
        <HexRing pos={[-8,-14,-8]} r={4} color="#00E5FF" speed={1.3} />
        <FloatingTorus pos={[14,3,-14]} />
        <FloatingTorus pos={[-18,-8,-20]} />
        <Stars radius={160} depth={60} count={700} factor={2.5} saturation={0} fade speed={0.4} />
      </Canvas>
    </div>
  )
}
