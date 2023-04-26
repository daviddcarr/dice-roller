import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function D10() {

    const gltf = useGLTF('./glb/d100.glb')

    const test = useMemo(() => {
        console.log(gltf)

        return gltf
    }, [gltf])

    return (
        <group position={[0, 2, 0]}>
            <primitive object={gltf.scene} />
        </group>
    )
}