import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadores para ver si X u O ganaron
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    return null
}

export const checkEndGame = (newBoard) => {
    // Si hay un ganador o si no hay espacios vacíos, se termina el juego
    return newBoard.every((square) => square) || checkWinnerFrom(newBoard)
}