import { useMemo } from 'react'

import { useThree } from '@react-three/fiber'
import { useGLTF  } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import Walls from './Walls'
import Dice from './Dice'

import { D6 } from './Dice'


export default function Experience({ dice, total, setTotal }) {

    const [ viewport ] = useThree((state) => [state.viewport])


    const diceGlb = {
        d4: useGLTF('./glb/d4.glb'),
        d6: useGLTF('./glb/d6.glb'),
        d8: useGLTF('./glb/d8.glb'),
        // d10: useGLTF('./glb/d10.glb'),
        d12: useGLTF('./glb/d12.glb'),
        d20: useGLTF('./glb/d20.glb'),
    }

    return (
        <>
            <Physics debug>
                <Walls width={3} height={5} depth={2} viewport={viewport} />
                {
                    dice.map((die) => (
                        <Dice viewport={viewport} sides={die.sides} total={total} setTotal={setTotal} diceGlb={diceGlb} />      
                    ))
                }
            </Physics>
        </>
    )
}