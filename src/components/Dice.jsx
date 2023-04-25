import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"


const findClosestFace = (rotation, faces) => {
    let minDistance = Infinity;
    let closestFace;

    const rotationVector = new THREE.Vector3();
    rotationVector.x = rotation.x;
    rotationVector.y = rotation.y;
    rotationVector.z = rotation.z;

    console.log("rotationVector", rotationVector)
  
    for (let i = 0; i < faces.length; i++) {
      const distance = rotationVector.distanceTo(faces[i]);
  
      if (distance < minDistance) {
        minDistance = distance;
        closestFace = i;
      }

      console.log("Data", {
        i:i,
        d:distance,
        f:faces[i],
        m:minDistance,
      })
    }
  
    return closestFace;
  }

export default function Dice({viewport, total, setTotal}) {

    const ref = useRef()

    const [ hasStopped, setHasStopped ] = useState(false)

    const faceRotations = useMemo(() => {        
        return [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, Math.PI, 0),
            new THREE.Vector3(Math.PI / 2, 0, 0),
            new THREE.Vector3(-Math.PI / 2, 0, 0),
            new THREE.Vector3(0, 0, Math.PI / 2),
            new THREE.Vector3(0, 0, -Math.PI / 2)
        ]
    }, [])

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

                const rot = ref.current.rotation()

                const closestFace = findClosestFace(rot, faceRotations)
               
                setTotal((total) => total + (closestFace + 1))

                setHasStopped(true)
            }
        }
    })

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