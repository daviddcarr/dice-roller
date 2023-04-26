import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'

import { useState } from 'react'

import Experience from './Experience'

export default function Scene() {

    const [ dice, setDice ] = useState([])
    const [ total, setTotal ] = useState(0)

    const throwD4 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '4',
        }])
    }

    const throwD6 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '6',
        }])
    }

    const throwD8 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '8',
        }])
    }

    const throwD10 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '10',
        }])
    }

    const throwD12 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '12',
        }])
    }

    const throwD20 = () => {
        setDice([...dice, {
            id: Date.now(),
            sides: '20',
        }])
    }

    const clearDice = () => {
        setDice([])
        setTotal(0)
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
                {/* <OrbitControls /> */}

                <Experience dice={dice} total={total} setTotal={setTotal} />
            </Canvas>

            <div className="absolute inset-0  pointer-events-none">
                <div className="w-full p-4 flex items-center justify-between">
                    <div className='flex space-x-4'>
                        <button 
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD4}
                            >
                            D4
                        </button>
                        <button
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD6}
                            >
                            D6
                        </button>
                        <button
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD8}
                            >
                            D8
                        </button>
                        <button
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD10}
                            >
                            D10
                        </button>
                        <button
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD12}
                            >
                            D12
                        </button>
                        <button
                            className="pointer-events-auto p-2 bg-gray-800 rounded-lg text-white hover:bg-purple-500"
                            onClick={throwD20}
                            >
                            D20
                        </button>



                    </div>
                </div>

                <div className='absolute bottom-0 left-0 p-4 text-gray-900 w-full flex justify-between'>
                    <button className='pointer-events-auto p-2 bg-red-400 rounded-lg text-white hover:bg-purple-500' onClick={clearDice}>
                        Clear
                    </button>


                    <div className="text-gray-900 rounded-lg p-2 bg-white">
                        Total: {total}
                    </div>
                </div>
            </div>
        </>
    )
}

