import { Send } from "express"

export type PlayerToken = "X" | "O"

export type Game = {
    id: string
    data: {
        board: string[][],
        currentPlayer: PlayerToken,
        player1: {
            token: PlayerToken,
            id: string
        }
        player2: {
            token: PlayerToken,
            id: string
        }
    }
}


const GameService = (games: Game[]) => {


    return {
        findGame: (gameId: string) => {
            return games.find((elem) => { return elem.id === gameId })
        },

        makeMove: (game: Game, token: PlayerToken, r: number, c: number) => {


            if (game) {


                console.log(game.id, token, r, c)
                console.log(game.data.currentPlayer)
                const board = game.data.board

                if (token === game.data.currentPlayer) {
                    console.log('before:' + board, 'row' + r, 'col' + c)
                    board[r][c] = token;
                    console.log('after:' + board)

                    GameService(games).switchPlayer(game)
                    console.log("switched player")
                    console.log("board: " + game.data.board)
                    return {
                        "status": 200,
                        "data": {

                            "board": game.data.board, "currentPlayer": game.data.currentPlayer
                            , "output": "successful move"
                        },
                    }
                }
                else {
                    return { "status": 403, "output": "It's not your move!" }
                }
            }
            return { "status": 404, "output": 'Game not found' }

        },
        switchPlayer: (game: Game) => {
            if (game.data.currentPlayer === 'X') {
                return game.data.currentPlayer = 'O'
            }
            else {
                return game.data.currentPlayer = 'X'
            }
        },
    }
}

export default GameService;