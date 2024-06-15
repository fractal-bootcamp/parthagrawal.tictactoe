
export type PlayerToken = "X" | "O" | ""
export type WinState = {
    outcome: "WIN" | "TIE" | null;
    winner: PlayerToken;
}

const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

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

        checkWinCondition: (game: Game): WinState => {
            // check rows for equivalence
            // check columns for equivalence
            // check diagonals for equivalence

            const b = game.data.board

            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                const winner: PlayerToken = checkRow(b[rowIndex] as PlayerToken[])
                if (winner) {
                    return { outcome: !!winner ? "WIN" : null, winner: winner }
                }
            }

            for (let c = 0; c < 3; c++) {
                const winner: PlayerToken = checkColumn([b[0][c], b[1][c], b[2][c]] as PlayerToken[])
                if (winner) {

                    return { outcome: !!winner ? "WIN" : null, winner: winner }
                }
            }
            const diag1Winner: PlayerToken = checkDiagonalOne([b[0][0], b[1][1], b[2][2]] as PlayerToken[])
            if (diag1Winner) {
                return { outcome: !!diag1Winner ? "WIN" : null, winner: diag1Winner }
            }

            const diag2Winner: PlayerToken = checkDiagonalTwo([b[2][0], b[1][1], b[0][2]] as PlayerToken[])
            if (diag2Winner) {
                return { outcome: !!diag2Winner ? "WIN" : null, winner: diag2Winner }
            }

            function checkRow(row: PlayerToken[]): PlayerToken {
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

            function checkColumn(col: PlayerToken[]): PlayerToken {
                const winner: PlayerToken = col.reduce((prev, curr) => {
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

            function checkDiagonalOne(diag: PlayerToken[]): PlayerToken {
                const winner: PlayerToken = diag.reduce((prev, curr) => {
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
            function checkDiagonalTwo(diag: PlayerToken[]): PlayerToken {
                const winner: PlayerToken = diag.reduce((prev, curr) => {
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

        },

        resetGame: (game: Game) => {
            game.data.board = structuredClone(initialBoard)
        }



    }
}

export default GameService;