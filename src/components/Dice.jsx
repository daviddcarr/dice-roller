import { useMemo, useRef } from "react"
import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"

export default function Dice() {

    const ref = useRef()

    const initialVelociy = useMemo(() => {
        const velocity = new THREE.Vector3()
        velocity.x = Math.random() * 10 - 5
        velocity.y = Math.random() * 2 - 1
        velocity.z = Math.random() * 10 - 5
        return velocity
    }, [])

    const initialAngularVelocity = useMemo(() => {
        const velocity = new THREE.Vector3()
        velocity.x = Math.random() * 10 - 5
        velocity.y = Math.random() * 10 - 5
        velocity.z = Math.random() * 10 - 5
        return velocity
    }, [])

    return (
        <RigidBody 
            ref={ref} 
            type="dynamic"
            position={[0, 2, 0]}
            linearVelocity={initialVelociy}
            angularVelocity={initialAngularVelocity}
            >
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'#ff0000'} />
            </mesh>
        </RigidBody>
    )

}