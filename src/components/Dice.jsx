import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

export default function Dice({viewport, sides, total, setTotal, diceGlb}) {

    return (
        <D6
            viewport={viewport}
            diceGlb={diceGlb}
            total={total}
            setTotal={setTotal}
        />
    )
}

export function D6({viewport, diceGlb, total, setTotal}) {

    const ref = useRef()

    const [ hasStopped, setHasStopped ] = useState(false)

    const diceMesh = useMemo(() => {
        console.log("diceGlb", diceGlb)
        return diceGlb["d6"].nodes["D6"]
    }, [diceGlb])

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
            // Check which face is up and add dice number to total
            if ( !hasStopped ) {

                console.log("Ref", ref.current)

                const rot = ref.current.rotation()

                console.log("Rotation", rot)

                let faceValue = 0
                let highestY = -Infinity

                ghostObjects.forEach((ghostObject, index) => {
                    console.log("Ghost Object", ghostObject.position)

                    const localPos = new THREE.Vector3().copy(ghostObject.position)
                    localPos.applyQuaternion(rot)

                    console.log("Local Position", localPos)

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


    const facePosition = useMemo(() => {
        return [
            [0.25, 0, 0],  // 1
            [0, 0, -0.25], // 2
            [0, 0.25, 0],  // 3
            [0, -0.25, 0], // 4
            [0, 0, 0.25], // 5
            [-0.25, 0, 0] //  6
            ]
    }, [])

    const ghostObjects = useMemo(() => {
        return facePosition.map((position, index) => {
            const ghostObject = new THREE.Object3D();
            ghostObject.name = `face_${index + 1}`;
            ghostObject.position.set(...position);
            ghostObject.rotation.set(0, 0, 0);
            ghostObject.updateMatrix();

            return ghostObject;
        });
      }, [facePosition]);


    return (
        <RigidBody 
            ref={ref} 
            type="dynamic"
            colliders="trimesh"
            position={[0, 2, 0]}
            linearVelocity={initialVelociy}
            angularVelocity={initialAngularVelocity}
            >
            <mesh
                geometry={diceMesh.geometry}
                material={diceMesh.material}
                castShadow
                >
            </mesh>

            {ghostObjects.map((ghostObject, index) => (
                <primitive
                key={index}
                object={ghostObject}
                />
            ))}

        </RigidBody>
    )
}