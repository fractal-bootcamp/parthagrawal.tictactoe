import { useState } from 'react'
import './App.css'

const reactBoard = [
  ['O', '', ''],
  ['', '', ''],
  ['', '', '']
]

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: "X" | "O" | null;
}


export const checkWinCondition = (b: typeof reactBoard): WinState => {
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
  return (reactBoard[0].map(renderMove))


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
