import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'


export default function Walls({ viewport }) {

    const width = viewport.width
    const height = viewport.height
    const depth = 1

    return (
        <RigidBody type="fixed">
            {/*Top Mesh */}
            <mesh receiveShadow position={[0, -depth / 2, height / 2]}>
                <boxGeometry args={[width, 10, 0.5]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Bottom Mesh */}
            <mesh receiveShadow position={[0, -depth / 2, -height / 2]}>
                <boxGeometry args={[width, 10, 0.5]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Left Mesh */}
            <mesh receiveShadow position={[-width / 2, -depth / 2, 0]}>
                <boxGeometry args={[0.5, 10, height]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Right Mesh */}
            <mesh receiveShadow position={[width / 2, -depth / 2, 0]}>
                <boxGeometry args={[0.5, 10, height]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Floor Mesh */}
            <mesh position={[0, -depth, 0]} receiveShadow>
                <boxGeometry args={[width, 0.5, height]} />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </RigidBody>
    )

}