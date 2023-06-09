import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

import { diceFaces, colors } from "../data/diceFaces"


export default function Dice({viewport, diceGlb, setTotal, sides}) {

    const ref = useRef()

    const [ hasStopped, setHasStopped ] = useState(false)

    const diceMesh = useMemo(() => {
        return diceGlb["d"+sides].nodes["D"+sides]
    }, [diceGlb, sides])

    const xStrength = viewport.width
    const zStrength = viewport.height

    const [initialVelociy, setInitialVelocity] = useState(() => {
        const velocity = new THREE.Vector3()
        velocity.x = Math.random() * xStrength - (xStrength / 2)
        velocity.y = Math.random() * 2 - 1
        velocity.z = Math.random() * zStrength - (zStrength / 2)

        return velocity
    })

    const [initialAngularVelocity, setInitialAngularVelocity] = useState(() => {
        const velocity = new THREE.Vector3()
        velocity.x = Math.random() * 10 - 5
        velocity.y = Math.random() * 10 - 5
        velocity.z = Math.random() * 10 - 5
        return velocity
    }, [])

    useFrame(() => {
        const vel = ref.current.linvel()
        const velVector = new THREE.Vector3(vel.x, vel.y, vel.z)
        if ( ref.current && velVector.length() < 0.01) {
            
            if ( !hasStopped ) {
                const rot = ref.current.rotation()

                let faceValue = 0
                let highestY = -Infinity

                diceFaces["d"+sides].forEach((face, index) => {

                    const facePos = new THREE.Vector3(face[0], face[1], face[2])

                    const localPos = new THREE.Vector3().copy(facePos)
                    localPos.applyQuaternion(rot)


                    if (localPos.y > highestY) {
                        faceValue = index + 1
                        highestY = localPos.y
                    }
                });

                setTotal((prevTotal) => prevTotal + faceValue);
                setHasStopped(true)

                setInitialAngularVelocity(new THREE.Vector3(0, 0, 0))
                setInitialVelocity(new THREE.Vector3(0, 0, 0))
            }
        }
    })


    return (
        <RigidBody 
            ref={ref} 
            type="dynamic"
            colliders="trimesh"
            position={[0, 2, 0]}
            linearVelocity={initialVelociy}
            angularVelocity={initialAngularVelocity}
            friction={0.2}
            >
            <mesh
                geometry={diceMesh.geometry}
                material={diceMesh.material}
                castShadow
                >
            </mesh>

            {/* { 
                // Used for checking face positions
                diceFaces["d"+sides].map((face, index) => (
                    <mesh
                        key={index}
                        position={face}
                        >
                        <boxBufferGeometry args={[0.025, 0.025, 0.025]} />
                        <meshBasicMaterial color={colors[index]} />
                    </mesh>
                ))
            } */}

        </RigidBody>
    )
}