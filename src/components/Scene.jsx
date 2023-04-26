import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'

import { useState } from 'react'

import Experience from './Experience'

export default function Scene() {

    const [ dice, setDice ] = useState([])
    const [ total, setTotal ] = useState(0)

    const throwDice = () => {

        const newDice = {
            id: Date.now(),
            type: 'D6',
        }

        setDice([...dice, newDice])
    }

    return (
        <>
            <Canvas
                camera={{ position: [0, 10, 0], fov: 50 }}
                shadows
                >
                <directionalLight 
                    castShadow 
                    position={ [ 0, 2, 1 ] } 
                    intensity={ 1 } 
                    shadow-normalBias={ 0.04 } // This setting fixes the shadow acne problem when multiple objects are casting shadows on each other.
                    shadow-camera-top={ 10 }
                    shadow-camera-right={ 10 }
                    shadow-camera-bottom={ - 10 }
                    shadow-camera-left={ - 10 }
                    />
                <Environment preset={'city'} />
                <OrbitControls />

                <Experience dice={dice} total={total} setTotal={setTotal} />
            </Canvas>

            <div className="absolute inset-0  pointer-events-none">
                <div className="w-full p-4 flex items-center justify-between">
                    <button 
                        className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                        onClick={throwDice}
                        >
                        Throw Dice
                    </button>
                    <div className="text-gray-900 rounded-lg p-2 bg-white">
                        Total: {total}
                    </div>
                </div>
            </div>
        </>
    )
}

