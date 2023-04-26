import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


export default function Walls({ viewport }) {

    const width = viewport.width
    const height = viewport.height
    const depth = 1

    const groundGlb = useGLTF('./glb/ground.glb')
    const wallGlb = useGLTF('./glb/wall.glb')

    const ground = useMemo(() => {
        return groundGlb.nodes.Ground
    }, [groundGlb])

    const wall = useMemo(() => {
        return wallGlb.nodes.Wall
    }, [wallGlb])

    return (
        <RigidBody type="fixed">
            {/*Top Mesh */}
            <mesh 
                receiveShadow 
                position={[0, -depth, height / 2]}
                geometry={wall.geometry}
                material={wall.material}
                >
            </mesh>

            {/* Bottom Mesh */}
            <mesh 
                receiveShadow 
                position={[0, -depth , -height / 2]}
                geometry={wall.geometry}
                material={wall.material}
                >
            </mesh>

            {/* Left Mesh */}
            <mesh 
                receiveShadow 
                position={[-width / 2, -depth, 0]}
                rotation={[0, Math.PI / 2, 0]}
                geometry={wall.geometry}
                material={wall.material}
                >

            </mesh>

            {/* Right Mesh */}
            <mesh 
                receiveShadow 
                position={[width / 2, -depth, 0]}
                rotation={[0, Math.PI / 2, 0]}
                geometry={wall.geometry}
                material={wall.material} 
                >

            </mesh>

            {/* Floor Mesh */}
            <mesh 
                geometry={ground.geometry}
                material={ground.material}
                position={[0, -depth, 0]} 
                receiveShadow
                >
            </mesh>
        </RigidBody>
    )

}