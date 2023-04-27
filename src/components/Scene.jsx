import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

import { useState } from 'react'

import Experience from './Experience'
import Interface from './Interface'

export default function Scene() {

    const [ dice, setDice ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ throwingDice, setThrowingDice ] = useState(false)
    const [ totals, setTotals ] = useState([])

    const throwDice = (sides) => {
        setDice([...dice, {
            id: Date.now(),
            sides: sides,
        }])
        // Prevent the user from throwing multiple dice at once.
        setThrowingDice(true)
        setTimeout(() => {
            setThrowingDice(false)
        }, 1000)
    }

    const clearDice = () => {
        setTotals([...totals, {
            total: total,
            dice: dice,
        }])
        setDice([])
        setTotal(0)
    }


    return (
        <>
            <div className="h-[calc(100%-70px)]">
                <Canvas
                    camera={{ position: [0, 10, 0], fov: 50 }}
                    shadows
                    >
                    <directionalLight 
                        castShadow 
                        position={ [ 1, 2, 0.5 ] } 
                        intensity={ 0.75 } 
                        shadow-normalBias={ 0.04 }
                        shadow-camera-top={ 10 }
                        shadow-camera-right={ 10 }
                        shadow-camera-bottom={ - 10 }
                        shadow-camera-left={ - 10 }
                        />
                    <Environment preset={'apartment'} />
                    {/* <OrbitControls /> */}

                    <EffectComposer>
                        <Bloom intensity={0.8} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                        <Vignette eskil={false} offset={0.1} darkness={0.7} />
                    </EffectComposer>

                    <Experience dice={dice} total={total} setTotal={setTotal} />
                </Canvas>
            </div>

            <Interface 
                    throwingDice={throwingDice}
                    throwDice={throwDice}
                    clearDice={clearDice}
                    dice={dice}
                    total={total}
                    totals={totals}
                    />
        </>
    )
}

