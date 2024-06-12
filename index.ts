import { checkWinCondition } from "./src/App"

const testBoard = [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['', '', '']
]

const winState = checkWinCondition(testBoard)

console.log(winState)
