import { useState, useMemo } from 'react'

export default function Interface({ throwingDice, throwDice, clearDice, total, totals, dice }) {

    const [ showTotals, setShowTotals ] = useState(false)

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
            <div className="w-full p-4 flex items-center justify-center">
                <div className='flex space-x-4'>
                    <button 
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('4')}
                        >
                        D4
                    </button>
                    <button
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('6')}
                        >
                        D6
                    </button>
                    <button
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('8')}
                        >
                        D8
                    </button>
                    <button
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('10')}
                        >
                        D10
                    </button>
                    <button
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('12')}
                        >
                        D12
                    </button>
                    <button
                        className={`pointer-events-auto h-12 w-12 ${ throwingDice ? 'bg-gray-400 text-gray-500' : 'bg-gray-800 hover:bg-purple-500 text-white' } rounded-full`}
                        disabled={throwingDice}
                        onClick={() => throwDice('20')}
                        >
                        D20
                    </button>



                </div>
            </div>

            <div className='absolute bottom-0 left-0 p-4 w-full flex justify-between bg-gray-900'>
                <button className='pointer-events-auto p-2 bg-red-700 rounded-lg text-white hover:bg-red-400' onClick={clearDice} disabled={dice.length === 0}>
                    Clear
                </button>


                <div className="relative flex space-x-2">
                    {
                        totals.length > 0 && (
                            <button className="pointer-events-auto bg-gray-600 text-white p-2 rounded-lg hover:bg-purple-500" onClick={() => setShowTotals(!showTotals)}>
                                { showTotals ? 'Hide' : 'Show'} History
                            </button>
                        )
                    }

                    <div className="text-gray-900 rounded-lg p-2 bg-white ">
                        Total: {total}
                    </div>

                    {
                        showTotals && (
                            <div className="absolute bottom-[calc(100%+30px)] right-0 flex items-end flex-col space-y-2">
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
        </div>
    )
}