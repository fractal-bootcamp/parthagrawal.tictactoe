import { useState } from 'react'
import './App.css'


const testBoard = [
  ['', '', ''],
  ['', '', 'O'],
  ['', '', 'X']
] satisfies Winner[][]

export type Winner = "X" | "O" | "";

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: Winner;
}


export const checkWinCondition = (b: typeof testBoard): WinState => {
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
  move: string
}
const Move = ({ move }: MoveProps) => {
  return (
    <div className='flex min-w-10 bg-green-500 border border-5 items-center justify-center'>
      {move}
    </div>
  )
}

const Row = ({ idx }: { idx: number }) => {
  return (
    <div className='flex gap-3 min-h-10 m-3 border border-5'>
      {/* returns squares for each row */}
      {testBoard[idx].map(
        (moveStr: string) => {
          return (<Move move={moveStr} />)
        })}
    </div>
  )
}


const Board = () => {

  // renders one row of the board

  return (
    <>
      <Row idx={0} />
      <Row idx={1} />
      <Row idx={2} />

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
      <button onClick={() => setWinState(checkWinCondition(testBoard))}>Check Win</button>
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
