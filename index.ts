import { checkWinCondition } from "./src/App"
import { Winner } from "./src/App"

const testBoard = [
    ['O', '', 'O'],
    ['', 'O', ''],
    ['X', '', 'O']
] satisfies Winner[][]

const winState = checkWinCondition(testBoard)

console.log(winState)
