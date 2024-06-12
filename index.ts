import { checkWinCondition } from "./src/App"

const testBoard = [
    ['O', '', 'O'],
    ['', 'O', ''],
    ['X', '', 'O']
]

const winState = checkWinCondition(testBoard)

console.log(winState)
