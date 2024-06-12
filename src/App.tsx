import { useEffect, useState } from 'react'
import './App.css'


type Board = Winner[][]

const initialBoard: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
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

  // tie condition
  // const foundEmpty = b.findIndex(
  //   (r) => {
  //     r.findIndex(
  //       (c) => { c === '' }) === -1
  //   })
  // console.log("foundEmpty: " + foundEmpty)


  let tieFlag = true;
  b.map((element) => {
    if (element.includes('')) {
      console.log('ayo')

      tieFlag = false;
      return;
    }
  })

  if (tieFlag) {
    return {
      outcome: "TIE",
      winner: ""
    }
  }
  else {
    return {
      outcome: null,
      winner: ""
    }

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
  p: Winner
}
const Move = ({ p, board, setBoard, move, rowIndex, mvIndex }: MoveProps) => {

  return (
    <div onClick={() => {
      console.log("click")
      const newBoard = [...board];
      newBoard[rowIndex].splice(mvIndex, 1, p) // QUESTION: ok? 
      setBoard(newBoard)
    }} className='flex min-w-10 bg-green-500 border border-5 items-center justify-center'>
      {board[rowIndex][mvIndex]}
    </div>
  )
}

const Row = ({ p, rowIndex, board, setBoard }: { p: Winner, rowIndex: number, board: Board, setBoard: React.Dispatch<React.SetStateAction<Board>> }) => {
  return (
    <div className='flex gap-3 min-h-10 m-3 border border-5'>
      {/* returns squares for each row */}
      {board[rowIndex].map(
        (moveStr: string, mvIndex: number) => {
          return (<Move p={p} board={board} setBoard={setBoard} move={moveStr} rowIndex={rowIndex} mvIndex={mvIndex} />)
        })}
    </div>
  )
}


const Board = () => {

  const [winState, setWinState] = useState<WinState>({ outcome: null, winner: "" })


  const [board, setBoard] = useState<Board>(initialBoard)
  const [p, setPlayer] = useState<Winner>("O")
  // renders one row of the board

  useEffect(() => {
    console.log("board clicked!")
    p === "O" ? setPlayer("X") : setPlayer("O")
  }, [board])

  useEffect(() => {
    console.log("checking win:")
    setWinState(checkWinCondition(board))
  }, [board])

  return (
    <>
      {board.map((element, index: number) => {
        return (<Row p={p} board={board} setBoard={setBoard} rowIndex={index} />)
      })}

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

function App() {

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
