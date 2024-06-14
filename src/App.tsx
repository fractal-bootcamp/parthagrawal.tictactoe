import { useEffect, useState } from 'react'
import './App.css'
import GameService, { PlayerToken, WinState } from '../gameService';


type Board = Move[][]

const initialBoard: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

export type Move = "X" | "O" | "";





type MoveProps = {
  board: Board
  setBoard: React.Dispatch<React.SetStateAction<Board>>
  rowIndex: number
  mvIndex: number
  myToken: PlayerToken
  winState: WinState
}

const GAME_ID = 123123
const myToken: PlayerToken = "O"

/** TODO
 * allow user to specify game id and select from a lobby
 * select playertoken dynamically (randomly) and pass to 
 * @param param0 
 * @returns 
 */

const Move = ({ winState, myToken, rowIndex, mvIndex }: MoveProps) => {

  const [move, setMove] = useState<Move>("")
  const [step, setStep] = useState(0)
  const [forbidden, setForbidden] = useState(false)

  const goodColor = '#a1a1aa'
  const forbiddenColor = '#f87171'

  // create a clock that does a get request of the board
  // every 1s. then it hits the state hook to setMove based on
  // whatever it retrieves at that index


  const getMoveFromServer = async () => {
    setForbidden(false)
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
    if (winState.outcome === null) {
      getMoveFromServer()
      setTimeout(() => setStep(step + 1), 500)
    }
    console.log(winState)

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

      if (response.status === 403 || 404) {
        setForbidden(true)
      }


      console.log(forbidden)

      const jsonResponse = await response.json()
      console.log("hey")
      console.log(jsonResponse)

      setMove(jsonResponse.board[rowIndex][mvIndex])


    }} className='flex w-10 h-10 items-center justify-center' style={{ 'backgroundColor': forbidden ? forbiddenColor : goodColor }}>
      {/* NEED TO SHIFT THIS TO DISPLAY THE RESPONSE */}
      {move}
    </button >
  )
}




const Row = ({ winState, myToken, rowIndex, board, setBoard }: { winState: WinState, myToken: PlayerToken, rowIndex: number, board: Board, setBoard: React.Dispatch<React.SetStateAction<Board>> }) => {
  return (
    <div className='flex gap-3 min-h-10 m-3 '>
      {/* returns squares for each row */}
      {board[rowIndex].map(
        (_moveStr: string, mvIndex: number) => {
          return (<Move winState={winState} myToken={myToken} board={board} setBoard={setBoard} rowIndex={rowIndex} mvIndex={mvIndex} />)
        })}
    </div>
  )
}



const Board = () => {


  const [myToken, setToken] = useState<PlayerToken>('X')
  const [winState, setWinState] = useState<WinState>({ outcome: null, winner: "" })


  const [winStep, setWinStep] = useState(0)
  const [board, setBoard] = useState<Board>(structuredClone(initialBoard))


  const checkWinClock = async () => {

    const winResponse = await fetch(`http://localhost:4000/game/${GAME_ID}/checkWin`)
    setWinState(await winResponse.json())

  }

  useEffect(() => {
    if (winState.outcome === null) {
      checkWinClock()
      setTimeout(() => setWinStep(winStep + 1), 500)
    }
    console.log(winState)

  }, [winStep])


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
        return (<Row winState={winState} myToken={myToken} board={board} setBoard={setBoard} rowIndex={index} />)
      })}

      <button onClick={() => { setBoard(structuredClone(initialBoard)) }}>Restart</button >
      <p>
        Outcome: {winState.outcome}
      </p>
      <p>
        Winner: {winState.winner}
      </p>
      <p>
        My token: {myToken}
      </p>



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
