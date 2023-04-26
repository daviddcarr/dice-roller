import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import Walls from './Walls'
import Dice from './Dice'


export default function Experience({ dice, total, setTotal }) {

    const [ viewport ] = useThree((state) => [state.viewport])



    return (
        <>
            <Physics>
                <Walls width={3} height={5} depth={2} viewport={viewport} />
                {
                    dice.map((die) => (
                        <Dice key={die.id} sides={die.sides} viewport={viewport} total={total} setTotal={setTotal} />
                    ))
                }
            </Physics>
        </>
    )
}