const startBoard = (player1, player2) => {
    return Array(8).fill(null).map((_, row) => 
        Array(8).fill(null).map((_, column) => {
            if ((row + column) % 2 === 0) {
                return undefined;
            };

            if (row === 3 || row === 4) { 
                return undefined;
            };

            const owner = row < 3
            ? player2
            : row > 4
                ? player1
                : undefined
            const piece = {
                owner,
                isKing: false,
            };
            
            return piece
        })
    )
};

module.exports = {
    startBoard
};
