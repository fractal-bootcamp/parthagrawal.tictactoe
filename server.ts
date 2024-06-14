import express from "express";
import cors from "cors";
import { useState } from "react";

const app = express();

// add json handling
app.use(express.json());

app.use(cors())

const initialBoard = ['', '', '', '', '', '', '', '', '']


let games: Game[] = [{
    id: '123123', data: {
        board: initialBoard,
        currentPlayer: "X",
        player1: { token: 'X', id: '' },
        player2: { token: 'O', id: '' }
    }
}]

app.get("/", (req, res) => {
    res.send("hello world")
})

function findGame(gameId: string) {
    return games.find((elem) => { return elem.id === gameId })

}

type PlayerToken = 'X' | 'O'

type Game = {
    id: string
    data: {
        board: string[],
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

function switchPlayer(game: Game) {
    if (game.data.currentPlayer === 'X') {
        return game.data.currentPlayer = 'O'
    }
    else {
        return game.data.currentPlayer = 'X'
    }

}
/** 
 * move: {
 *  position
 * }
 */
app.post('/game/:gameId/move', (req, res) => {
    const gameId = req.params.gameId
    const game = findGame(gameId)
    if (game) {
        const token = req.body.playerToken
        const pos = req.body.position

        if (req.body.playerToken === game.data.currentPlayer) {
            game.data.board[pos] = token;
            switchPlayer(game)
            console.log("board: " + game.data.board)
            res.send("board: " + game.data.board + " current player: " + game.data.currentPlayer)


        }
    }
    else {
        return res.status(404).send('Game not found')
    }


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
    const game = findGame(id)
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