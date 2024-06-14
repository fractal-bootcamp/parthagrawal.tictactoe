import express from "express";
import cors from "cors";
import { useState } from "react";

const app = express();

// add json handling
app.use(express.json());

app.use(cors())

let games = [{
    id: '123123', data: {
        board: [],
        currentPlayer: "X",
        player1: { token: 'X', id: '' },
        player2: { token: 'O', id: '' }
    }
}]

app.get("/", (req, res) => {
    res.send("hello world")
})

app.post('/game/:gameId/move', (req, res) => {
    const gameId = req.params.gameId
    const game = games.find((elem) => { return elem.id === gameId })

    if (req.body.playerToken === game?.data.currentPlayer) {

    }

})

const initialBoard = ['', '', '', '', '', '', '', '', '']

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
    const game = games.find((elem) => { return elem.id === id })
    console.log("game found: " + game)

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