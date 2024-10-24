import { Piece } from '../Interfaces/Piece'

const startBoard = (player1: string, player2: string): (Piece | undefined)[][] => {
    return Array(8).map(row => 
        Array(8).map(column => {
            if ((row + column) % 2 === 0) {
                return undefined;
            };

            const owner = row < 3
            ? player2
            : row > 4
                ? player1
                : undefined
            const piece: Piece = {
                owner,
                isKing: false,
            };
            
            return piece
        })
    )
}

export default startBoard;
