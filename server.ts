import express, { RequestHandler } from "express";
import cors from "cors";
import { useState } from "react";

import GameService, { Game, PlayerToken } from "./gameService"

const app = express();

// add json handling
app.use(express.json());

app.use(cors())

// const initialBoard = ['', '', '', '', '', '', '', '', '']

const initialBoard = [
    ['', '', '',],
    ['', '', '',],
    ['', '', '',]
]

let games: Game[] = [{
    id: '123123', data: {
        board: initialBoard,
        currentPlayer: "X",
        player1: { token: 'X', id: '' },
        player2: { token: 'O', id: '' }
    }
}]


type Position = {
    row: number,
    column: number

}

app.get("/", (req, res) => {
    res.send("hello world")
})

const verifyMove: RequestHandler = (req, res, next) => {
    const pos = req.body.position;

    if (isNaN(pos.row) || isNaN(pos.column)) {
        return res.status(400).json({ error: "Expecting row and col in position argument." })
    }

    next();
}

/** 
 * move: {
 *  position
 * }
 */
app.post('/game/:gameId/move', verifyMove, (req, res) => {
    // console.log(req)
    const gameId = req.params.gameId
    const game = GameService(games).findGame(gameId)

    if (!game) {
        return res.status(404).send('Game not found')
    }

    // controller (actions) sends data to the service (calculations)

    // more functional to parse request in controller or the service?


    const token: PlayerToken = req.body.playerToken

    const { row }: Position = req.body.position
    const { column }: Position = req.body.position

    // console.log("token:" + token)
    // console.log("body:" + JSON.stringify(req.body))

    const response = GameService(games).makeMove(game, token, row, column)

    res.status(response.status).json(response.data)

})

app.get('/game/:gameId/checkWin', (req, res) => {
    const gameId = req.params.gameId
    const game = GameService(games).findGame(gameId)

    if (game) {
        res.json(GameService(games).checkWinCondition(game))
    }


})

app.get('/game/:gameId/reset', (req, res) => {
    console.log('reset hit')

    const gameId = req.params.gameId
    const game = GameService(games).findGame(gameId)
    if (game) res.send(GameService(games).resetGame(game));

})
app.get('/game/:gameId', (req, res) => {

    // make game serverside first, so you can play the game via curl commands
    // get the game state
    // make a move

    // render the game state
    // game state (current player, board, player 1 and player 2)
    // get the game state repeatedly (both players)
    // only the player whose move it is should be able to successfully send a move
    //      server-side validation.
    //      client-side validation ('you're not the current player')
    // render the game at the id 
    const id = req.params.gameId;
    const game = GameService(games).findGame(id)

    /**
     * App.tsx
     * 
     * const getGame = async (id: string)     
     * const response  await fetch (`${serverPath}/game/${id})
     * const json = await response.json()
     * return json
     * 
     * 
     * gameid = "wejfow"
     * 
     * makeAMove is a post request. send a json.stringified index (position of the play) 
     * 
     */
    /**
     * Get the old board,
     * set the board to the player
     * setboard to the new board (state hook)
     * toggle player
     * 
     * const newBoard = game.board
     * const player = game.currentPlayer
     * newBoard[index] = player
     * game.currentPlayer = player === "X" ? "O" : "X"
     */

    if (!game) {
        return res.status(404).send('Game not found')
    }
    res.json({ game: game })
})
app.listen(4000, () => {
    console.log("listening on port http://localhost:4000")
})