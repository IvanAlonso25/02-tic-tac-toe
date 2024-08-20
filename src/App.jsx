import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import {Square} from './components/Square.jsx'
import {TURNS} from './constants.js'
import {checkWinnerFrom, checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal.jsx'
import {Board} from './components/Board.jsx'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    // Ponemos todos los valores como en el principio Array(9).fill(null), Turno X y sin ganador
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // No actualizamos la posición si ya tiene algo
    if(board[index] || winner) return
    // Los ... hacen una copia del array para no modificar los datos
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisamos si hay un ganador cada vez que actualizamos el board
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateBoard={updateBoard}/>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
