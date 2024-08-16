import { useContext } from "react"
import { GameContext } from "./context/gameContext"

export default function App () {

    const { currentGame, setCurrentGame, ticTacToe, currentWinner, resetGame } = useContext(GameContext)
    const isWinner = (rowIndex, colIndex) => {
        return currentWinner.line.some(([r, c]) => r === rowIndex && c === colIndex)
    }
    return (
        <>
            <div className="box">
            <div className="game">
            { currentGame.map((row, rowIndex) => (
                <div key={rowIndex} className="ttt-row">
                    { row.map((col, colIndex) => (
                        <span key={colIndex} className={`ttt-col ${isWinner(rowIndex, colIndex) ? 'winner' : ''}`}
                        onClick={() => ticTacToe(rowIndex, colIndex)}>{col}</span>
                    ))}
                </div>
            ))}
        </div>
        {currentWinner.letter && (
                <div className="won-container">
                    <h3> Winner: {currentWinner.letter}</h3>
                    <button className="reset-btn" onClick={resetGame}> Play Again </button>
                </div>
        )}
            </div>
        </>
    )
}