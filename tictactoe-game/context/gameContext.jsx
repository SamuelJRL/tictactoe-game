import { createContext, useEffect, useState } from "react";

export const GameContext = createContext({})

export function GameContextProvider ({children}) {

    const [currentPlayer, setCurrentPlayer] = useState("X") 

    const [currentGame, setCurrentGame] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
        ]
    )

    useEffect(() => {
        checkWinner()
    }, [currentGame])

    const  winningLines = [
    // horizontal
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // vertical
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonais
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
    ]

    const [currentWinner, setCurrentWinner] = useState(
        {letter: "", line: []}
    )

    const checkWinner = () => {
        for (const line of winningLines) {
            const [a, b, c] = line
            const [rowA, colA] = a
            const [rowB, colB] = b
            const [rowC, colC] = c

            if (currentGame[rowA][colA] !== "") {
                if (currentGame[rowA][colA] === currentGame[rowB][colB] && currentGame[rowA][colA] === currentGame[rowC][colC]) {
                    setCurrentWinner({letter: currentGame[rowA][colA], line: [a, b, c]})
                    return
                }
            }
            checkDraw()
        }
    }

    const checkDraw = () => {
        const drawGame = currentGame.every(row => row.every(cell => cell !== ""))

        if (drawGame && currentWinner.letter === "") {
            setCurrentWinner({letter: "Draw", line: []})
        }
    }

    const ticTacToe = (rowIndex, colIndex) => {
        setCurrentGame(currentGame => {
            const newCurrentGame = currentGame.map(row => row.slice())
            if (newCurrentGame[rowIndex][colIndex] === '' && currentWinner.letter === "") {
                newCurrentGame[rowIndex][colIndex] = currentPlayer
                setCurrentPlayer(prevPlayer => prevPlayer === "X" ? "O" : "X")
            }
            return newCurrentGame
         })
         checkWinner()
    }

    const resetGame = () => {
        setCurrentGame([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
            ]
        )
        setCurrentWinner({letter: "", line: []})
        setCurrentPlayer("X")
    }

    const game = {
        currentGame,
        setCurrentGame,
        ticTacToe,
        currentWinner,
        resetGame
    }

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider> 
    )
}

