import { useState } from 'react'
import './App.css'


type Board = Winner[][]

const initialBoard: Board = [
  ['X', '', ''],
  ['', 'X', 'O'],
  ['', '', 'X']
]

export type Winner = "X" | "O" | "";

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: Winner;
}


export const checkWinCondition = (b: typeof initialBoard): WinState => {
  // check rows for equivalence
  // check columns for equivalence
  // check diagonals for equivalence

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    const winner: Winner = checkRow(b[rowIndex])
    if (winner) {
      return { outcome: !!winner ? "WIN" : null, winner: winner }
    }
  }

  for (let c = 0; c < 3; c++) {
    const winner: Winner = checkColumn([b[0][c], b[1][c], b[2][c]])
    if (winner) {

      return { outcome: !!winner ? "WIN" : null, winner: winner }
    }
  }
  const diag1Winner: Winner = checkDiagonalOne([b[0][0], b[1][1], b[2][2]])
  if (diag1Winner) {
    return { outcome: !!diag1Winner ? "WIN" : null, winner: diag1Winner }
  }

  const diag2Winner: Winner = checkDiagonalTwo([b[2][0], b[1][1], b[0][2]])
  if (diag2Winner) {
    return { outcome: !!diag2Winner ? "WIN" : null, winner: diag2Winner }
  }

  function checkRow(row: Winner[]): Winner {
    const winner = row.reduce((prev, curr) => {
      if (prev === "") {
        return "";
      }
      if (prev === curr) {
        return curr
      }
      return "";
    })
    return winner;

    // return X O or null

  }

  function checkColumn(col: Winner[]): Winner {
    const winner: Winner = col.reduce((prev, curr) => {
      if (prev === "") {
        return "";
      }
      if (prev === curr) {
        return curr
      }
      return "";
    })
    return winner;

  }

  function checkDiagonalOne(diag: Winner[]): Winner {
    const winner: Winner = diag.reduce((prev, curr) => {
      if (prev === "") {
        return "";
      }
      if (prev === curr) {
        return curr
      }
      return "";
    })
    return winner;

  }
  function checkDiagonalTwo(diag: Winner[]): Winner {
    const winner: Winner = diag.reduce((prev, curr) => {
      if (prev === "") {
        return "";
      }
      if (prev === curr) {
        return curr
      }
      return "";
    })
    return winner;

  }

  return {
    outcome: null,
    winner: ""
  }
  // write a function to check one row, and then map through
  // all the rows

  //const winner = checkRow(b[0])


  // x o
  // win, tie, or neither
  // who won? (X/O/null)

}

type MoveProps = {
  board: Board
  setBoard: React.Dispatch<React.SetStateAction<Board>>
  move: string
  rowIndex: number
  mvIndex: number
}
const Move = ({ board, setBoard, move, rowIndex, mvIndex }: MoveProps) => {

  return (
    <div onClick={() => {
      console.log("click")
      debugger;
      const newBoard = [...board];
      newBoard[rowIndex].splice(mvIndex, 1, "X") // QUESTION: ok? 
      setBoard(newBoard)
    }} className='flex min-w-10 bg-green-500 border border-5 items-center justify-center'>
      {board[rowIndex][mvIndex]}
    </div>
  )
}

const Row = ({ rowIndex, board, setBoard }: { rowIndex: number, board: Board, setBoard: React.Dispatch<React.SetStateAction<Board>> }) => {
  return (
    <div className='flex gap-3 min-h-10 m-3 border border-5'>
      {/* returns squares for each row */}
      {board[rowIndex].map(
        (moveStr: string, mvIndex: number) => {
          return (<Move board={board} setBoard={setBoard} move={moveStr} rowIndex={rowIndex} mvIndex={mvIndex} />)
        })}
    </div>
  )
}


const Board = () => {

  const [board, setBoard] = useState<Board>(initialBoard)

  // renders one row of the board

  return (
    <>
      {board.map((element, index: number) => {
        return (<Row board={board} setBoard={setBoard} rowIndex={index} />)
      })}

    </>
  )



}

function App() {
  const [winState, setWinState] = useState<WinState>({ outcome: null, winner: "" })

  // pass the board row
  // render the board element

  return (
    <>

      Insert Tic Tac Toe Here
      <Board />
      <button onClick={() => setWinState(checkWinCondition(initialBoard))}>Check Win</button>
      <p>
        Outcome: {winState.outcome}
      </p>
      <p>
        Winner: {winState.winner}
      </p>
    </>
  )
}

export default App
