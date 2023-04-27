import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'

import { useState } from 'react'

import Experience from './Experience'

export default function Scene() {

    const [ dice, setDice ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ throwingDice, setThrowingDice ] = useState(false)

    const throwDice = (sides) => {
        setDice([...dice, {
            id: Date.now(),
            sides: sides,
        }])
        setThrowingDice(true)
        // set timeout to false after 1 second
        setTimeout(() => {
            setThrowingDice(false)
        }, 1000)
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
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('4')}
                            >
                            D4
                        </button>
                        <button
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('6')}
                            >
                            D6
                        </button>
                        <button
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('8')}
                            >
                            D8
                        </button>
                        <button
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('10')}
                            >
                            D10
                        </button>
                        <button
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('12')}
                            >
                            D12
                        </button>
                        <button
                            className={`pointer-events-auto p-2 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-lg`}
                            disabled={throwingDice}
                            onClick={() => throwDice('20')}
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

