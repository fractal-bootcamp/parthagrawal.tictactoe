import { checkWinCondition } from "./src/App"
import { Winner } from "./src/App"

export const myBoard = [
    ['O', '', 'O'],
    ['', 'O', ''],
    ['X', '', 'O']
] satisfies Winner[][]

const winState = checkWinCondition(myBoard)

console.log(winState)
