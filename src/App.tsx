import { useState } from 'react'
import './App.css'

const reactBoard = [
  ['X', 'O', ''],
  ['', '', ''],
  ['', '', '']
] satisfies Winner[][]

export type Winner = "X" | "O" | "";

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: Winner;
}


export const checkWinCondition = (b: typeof reactBoard): WinState => {
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

function renderMove(move: string, idx: number) {
  if (move === "X") {
    return (<div>X</div>)
  }
  if (move === "O") {
    return (<div>O</div>)
  }
  if (move === "") {
    return (<div>space</div>)
  }

}

const Board = () => {

  // renders one row of the board

  return (
    <>
      {/* row */}
      <div className='flex gap-3'>
        {reactBoard[0].map(renderMove)}
      </div>
      {/* row */}
      <div className='flex gap-3'>
        {reactBoard[1].map(renderMove)}
      </div>
      {/* row */}
      <div className='flex gap-3'>
        {reactBoard[2].map(renderMove)}
      </div>
    </>
  )



}

function App() {
  const [count, setCount] = useState(0)

  // pass the board row
  // render the board element

  return (
    <>

      Insert Tic Tac Toe Here
      <Board />
    </>
  )
}

export default App
