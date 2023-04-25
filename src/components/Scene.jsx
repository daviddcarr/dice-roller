import { Canvas } from '@react-three/fiber'
import { Environment} from '@react-three/drei'

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
                >
                <ambientLight intensity={0.5} />
                <Environment preset={'city'} />
                {/* <OrbitControls /> */}

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

