import { useState } from 'react'
import './App.css'

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: "X" | "O" | null;
}


export const checkWinCondition = (b: typeof board): WinState => {
  // check rows for equivalence
  // check columns for equivalence
  // check diagonals for equivalence

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    const winner = checkRow(b[rowIndex])
    if (winner) {
      return { outcome: !!winner ? "WIN" : null, winner: winner }

    }
  }

  function checkRow(row: string[]) {
    const winner = row.reduce((prev, curr) => {
      if (prev === "") {
        return null;
      }
      if (prev === curr) {
        return curr
      }
      return null;
    })
    return winner;

    // return X O or null

  }

  return {
    outcome: null,
    winner: null
  }
  // write a function to check one row, and then map through
  // all the rows

  //const winner = checkRow(b[0])


  // x o
  // win, tie, or neither
  // who won? (X/O/null)

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      Insert Tic Tac Toe Here
    </>
  )
}

export default App
