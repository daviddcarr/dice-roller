import { useState, useMemo } from 'react'

export default function Interface({ throwingDice, throwDice, clearDice, total, totals, dice }) {

    const [ showTotals, setShowTotals ] = useState(false)
    const [ showClearWarning, setShowClearWarning ] = useState(false)

    const availableDice = useMemo(() => {
        return [
            4, 6, 8, 10, 12, 20
        ]
    }, [])

    const calculateDiceRolls = (dice) => {
        let diceCounts = {
            4: 0,
            6: 0,
            8: 0,
            10: 0,
            12: 0,
            20: 0,
        }

        dice.forEach((die) => {
            diceCounts[die.sides]++
        })

        let diceString = ''

        for (const [key, value] of Object.entries(diceCounts)) {
            if (value > 0) {
                diceString += `${value}D${key} `
            }
        }

        return diceString
    }

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Info Bar */}
            <div className='absolute top-0 left-0 p-2 w-full flex justify-between bg-gray-900'>
                <button className='pointer-events-auto px-2 py-1 bg-red-700 rounded-lg text-white hover:bg-red-400' onClick={() => {setShowClearWarning(!showClearWarning)}} disabled={dice.length === 0}>
                    Clear
                </button>


                <div className="relative flex space-x-2">
                    {
                        totals.length > 0 && (
                            <button className="pointer-events-auto bg-gray-600 text-white px-2 py-1 rounded-lg hover:bg-purple-500" onClick={() => setShowTotals(!showTotals)}>
                                { showTotals ? 'Hide' : 'Show'} History
                            </button>
                        )
                    }

                    <div className="text-gray-900 rounded-lg px-2 py-1 bg-white ">
                        Total: {total}
                    </div>

                    {
                        showTotals && (
                            <div className="absolute top-[calc(100%+20px)] right-0 flex items-end flex-col-reverse gap-2">
                                {
                                    totals.map((total, index) => {

                                        const diceString = calculateDiceRolls(total.dice)

                                        return (
                                            <div key={index} className="w-max bg-gray-800 py-1 px-4 rounded-full text-white tracking-wider">
                                                { diceString }- Total: {total.total}
                                            </div>

                                        )
                                    })
                                }

                            </div>
                        )
                    }
                </div>
            </div>

            {/* Clear Warning */}
            { showClearWarning && (
                <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 rounded-lg py-4 px-8 text-center">
                    <h2 className="text-white text-2xl">Are You Sure?</h2>
                    <p className="text-gray-300 text-md max-w-xs">This will clear all dice from the board, but your total will be saved in the history.</p>
                    <div className="flex space-x-2 w-full justify-center mt-4">
                        <button className="pointer-events-auto bg-red-700 text-white px-4 py-1 rounded-lg hover:bg-red-400" onClick={() => { clearDice(); setShowClearWarning(false) }}>
                            Yes
                        </button>
                        <button className="pointer-events-auto bg-gray-600 text-white px-4 py-1 rounded-lg hover:bg-purple-500" onClick={() => setShowClearWarning(false)}>
                            No
                        </button>
                    </div>
                </div>
            )}


            {/* Dice Button Row */}
            <div className="absolute w-full bottom-0 p-4 flex items-center justify-center z-20">
                <div className='flex space-x-1 md:space-x-4'>
                    {
                        availableDice.map((die, index) => (
                            <button 
                                className={`pointer-events-auto h-12 h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                                disabled={throwingDice}
                                onClick={() => throwDice(die)}
                                key={index}
                                >
                                D{die}
                            </button>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}