import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

import { diceFaces } from "../data/diceFaces"

// export default function Dice({viewport, sides, total, setTotal, diceGlb}) {

//     return (
//         <D6
//             viewport={viewport}
//             diceGlb={diceGlb}
//             total={total}
//             setTotal={setTotal}
//             sides={20}
//         />
//     )
// }

export default function Dice({viewport, diceGlb, setTotal, sides}) {

    const ref = useRef()

    const [ hasStopped, setHasStopped ] = useState(false)

    const diceMesh = useMemo(() => {
        console.log("diceGlb", diceGlb)
        return diceGlb["d"+sides].nodes["D"+sides]
    }, [diceGlb, sides])

    const xStrength = viewport.width
    const zStrength = viewport.height

    const initialVelociy = useMemo(() => {
        const velocity = new THREE.Vector3()
        velocity.x = Math.random() * xStrength - (xStrength / 2)
        velocity.y = Math.random() * 2 - 1
        velocity.z = Math.random() * zStrength - (zStrength / 2)

        return velocity
    }, [xStrength, zStrength])

    const initialAngularVelocity = useMemo(() => {
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

                console.log("Ref", ref.current)

                const rot = ref.current.rotation()

                console.log("Rotation", rot)

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


                console.log(`Face with highest Y value: ${faceValue}`);
                setTotal((prevTotal) => prevTotal + faceValue);
                setHasStopped(true)
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
            >
            { sides !== 10  && (
                <mesh
                    geometry={diceMesh.geometry}
                    material={diceMesh.material}
                    castShadow
                    >
                </mesh>
            )}

        </RigidBody>
    )
}