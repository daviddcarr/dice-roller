import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'


export default function Walls() {

    const [ viewport ] = useThree((state) => [state.viewport])

    const width = viewport.width
    const height = viewport.height
    const depth = 1

    return (
        <RigidBody type="fixed">
            {/*Top Mesh */}
            <mesh position={[0, -depth / 2, height / 2]}>
                <boxGeometry args={[width, depth, 0.5]} />
                <meshStandardMaterial color={'#ff0000'} />
            </mesh>

            {/* Bottom Mesh */}
            <mesh position={[0, -depth / 2, -height / 2]}>
                <boxGeometry args={[width, depth, 0.5]} />
                <meshStandardMaterial color={'#ff00ff'} />
            </mesh>

            {/* Left Mesh */}
            <mesh position={[-width / 2, -depth / 2, 0]}>
                <boxGeometry args={[0.5, depth, height]} />
                <meshStandardMaterial color={'#00ff00'} />
            </mesh>

            {/* Right Mesh */}
            <mesh position={[width / 2, -depth / 2, 0]}>
                <boxGeometry args={[0.5, depth, height]} />
                <meshStandardMaterial color={'#0000ff'} />
            </mesh>

            {/* Floor Mesh */}
            <mesh position={[0, -depth, 0]}>
                <boxGeometry args={[width, 0.5, height]} />
                <meshStandardMaterial color={'#00ffff'} />
            </mesh>
        </RigidBody>
    )

}