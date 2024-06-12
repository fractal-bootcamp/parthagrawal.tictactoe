import { checkWinCondition } from "./src/App"

const testBoard = [
    ['X', '', ''],
    ['X', 'X', 'O'],
    ['X', '', '']
]

const winState = checkWinCondition(testBoard)

console.log(winState)
