import { Canvas } from '@react-three/fiber'
import { Environment} from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { useState } from 'react'

import Walls from './Walls'
import Dice from './Dice'

export default function Scene() {

    const [ dice, setDice ] = useState([])

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

                <Physics>
                    <Walls width={3} height={5} depth={2} />
                    {
                        dice.map((die) => (
                            <Dice key={die.id} type={die.type} />
                        ))
                    }
                </Physics>
            </Canvas>

            <div className="absolute inset-0 p-4 pointer-events-none">
                <button 
                    className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                    onClick={throwDice}
                    >
                    Throw Dice
                </button>
            </div>
        </>
    )
}

