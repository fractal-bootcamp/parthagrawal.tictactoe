import { useEffect, useState } from 'react'
import './App.css'
import { PlayerToken } from '../gameService';


type Board = Move[][]

const initialBoard: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

export type Move = "X" | "O" | "";

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: Move;
}


export const checkWinCondition = (b: typeof initialBoard): WinState => {
  // check rows for equivalence
  // check columns for equivalence
  // check diagonals for equivalence

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    const winner: Move = checkRow(b[rowIndex])
    if (winner) {
      return { outcome: !!winner ? "WIN" : null, winner: winner }
    }
  }

  for (let c = 0; c < 3; c++) {
    const winner: Move = checkColumn([b[0][c], b[1][c], b[2][c]])
    if (winner) {

      return { outcome: !!winner ? "WIN" : null, winner: winner }
    }
  }
  const diag1Winner: Move = checkDiagonalOne([b[0][0], b[1][1], b[2][2]])
  if (diag1Winner) {
    return { outcome: !!diag1Winner ? "WIN" : null, winner: diag1Winner }
  }

  const diag2Winner: Move = checkDiagonalTwo([b[2][0], b[1][1], b[0][2]])
  if (diag2Winner) {
    return { outcome: !!diag2Winner ? "WIN" : null, winner: diag2Winner }
  }

  function checkRow(row: Move[]): Move {
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

  function checkColumn(col: Move[]): Move {
    const winner: Move = col.reduce((prev, curr) => {
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

  function checkDiagonalOne(diag: Move[]): Move {
    const winner: Move = diag.reduce((prev, curr) => {
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
  function checkDiagonalTwo(diag: Move[]): Move {
    const winner: Move = diag.reduce((prev, curr) => {
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
  rowIndex: number
  mvIndex: number
  myToken: PlayerToken
}

const GAME_ID = 123123
const myToken: PlayerToken = "O"

/** TODO
 * allow user to specify game id and select from a lobby
 * select playertoken dynamically (randomly) and pass to 
 * @param param0 
 * @returns 
 */

const Move = ({ myToken, rowIndex, mvIndex }: MoveProps) => {

  const [move, setMove] = useState<Move>("")
  const [step, setStep] = useState(0)

  // create a clock that does a get request of the board
  // every 1s. then it hits the state hook to setMove based on
  // whatever it retrieves at that index


  const getMoveFromServer = async () => {
    const response = await fetch(`http://localhost:4000/game/${GAME_ID}`)
    const jsonResponse = await response.json()
    const serverBoard = jsonResponse.game.data.board
    // console.log("ayo", serverBoard)
    // console.log("ayo step", step)

    setMove(serverBoard[rowIndex][mvIndex])


  }
  useEffect(() => {
    //if(win ===null )
    console.log('in useeffect')
    getMoveFromServer()
    setTimeout(() => setStep(step + 1), 500)

  }, [step])

  /**
   * implement a hook that calls the server x
   */

  return (
    <button onClick={async () => {
      console.log(GAME_ID)
      const response = await fetch(`http://localhost:4000/game/${GAME_ID}/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "playerToken": myToken,
          "position": {
            "row": rowIndex,
            "column": mvIndex
          }
        })

      })
      const jsonResponse = await response.json()
      console.log("hey")
      console.log(jsonResponse)
      setMove(jsonResponse.board[rowIndex][mvIndex])

    }} className='flex w-10 h-10 bg-slate-400  items-center justify-center'>
      {/* NEED TO SHIFT THIS TO DISPLAY THE RESPONSE */}
      {move}
    </button>
  )
}




const Row = ({ myToken, rowIndex, board, setBoard }: { myToken: PlayerToken, rowIndex: number, board: Board, setBoard: React.Dispatch<React.SetStateAction<Board>> }) => {
  return (
    <div className='flex gap-3 min-h-10 m-3 '>
      {/* returns squares for each row */}
      {board[rowIndex].map(
        (_moveStr: string, mvIndex: number) => {
          return (<Move myToken={myToken} board={board} setBoard={setBoard} rowIndex={rowIndex} mvIndex={mvIndex} />)
        })}
    </div>
  )
}



const Board = () => {

  const [winState, setWinState] = useState<WinState>({ outcome: null, winner: "" })

  const [myToken, setToken] = useState<PlayerToken>('X')

  const [board, setBoard] = useState<Board>(structuredClone(initialBoard))
  const [p, setPlayer] = useState<Move>("O")
  // renders one row of the board

  // useEffect(() => {
  //   console.log("board clicked!")
  //   p === "O" ? setPlayer("X") : setPlayer("O")
  // }, [board])

  // useEffect(() => {
  //   console.log("checking win:")
  //   setWinState(checkWinCondition(board))
  // }, [board])

  return (
    <>
      <button onClick={() => {
        setToken('X');
      }}>
        Select X
      </button>
      <button onClick={() => {
        setToken('O');
      }}>
        Select O
      </button>
      {board.map((_element, index: number) => {
        return (<Row myToken={myToken} board={board} setBoard={setBoard} rowIndex={index} />)
      })}

      <button onClick={() => { setBoard(structuredClone(initialBoard)) }}>Restart</button >
      <p>
        Outcome: {winState.outcome}
      </p>
      <p>
        Winner: {winState.winner}
      </p>
      <p>
        Current token: {myToken}
      </p>

      <button onClick={async () => {
        const resp = await fetch("http://localhost:4000/game/123123")
        console.log(await resp.json())
      }}>
        get board
      </button >

    </>
  )



}

function App() {


  return (
    <>


      <Board />

    </>
  )
}

export default App
