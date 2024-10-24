const COLUMNS = 8;

const checkEat = (board, player, isFirstPlayer, row, column, isKingForce) => {
    const captureMoves = {};

    const isKing = isKingForce ? isKingForce : board[row][column]?.isKing;
    const nextRowDirection = isFirstPlayer ? -1 : 1;
    const twoSidesDirectionsRows = isKing ? [1, -1] : [nextRowDirection];

    const nextPiecesLocations = [
        column - 1,
        column + 1
    ];

    const nextNextPiecesLocations = [
        column - 2,
        column + 2
    ];
    
    twoSidesDirectionsRows.forEach(directionRow => {
        const nextNextRow = row + (directionRow * 2);
        const isNewRowInRange = nextNextRow < 8 && nextNextRow >= 0;

        if (!isNewRowInRange) { return };

        nextPiecesLocations.forEach((position, index) => {
            const isNewColumnInRange = nextNextPiecesLocations[index] < 8 && nextNextPiecesLocations[index] >= 0;
            if (!isNewColumnInRange) { return };

            const piece = board[row + directionRow][position];

            if (piece === undefined) { return };

            if (piece.owner !== player) {
                const canEat = board[nextNextRow][nextNextPiecesLocations[index]] === undefined;

                if (canEat) {
                    const currentMove = captureMoves[`${row}-${column}`];
                    !!currentMove
                    ? currentMove.push([nextNextRow, nextNextPiecesLocations[index]])
                    : captureMoves[`${row}-${column}`] = [[nextNextRow, nextNextPiecesLocations[index]]]
                }
            };
        });
    })

    return captureMoves;
}

const checkCaptureMoves = (board, player, isFirstPlayer, isKing=undefined) => {
    const captureMoves = {};

    board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (!cell) { return };

            if (cell.owner !== player) { return };

            const currentCaptureMoves = checkEat(board, player, isFirstPlayer, rowIndex, columnIndex, isKing);
            Object.assign(captureMoves, currentCaptureMoves);
        })
    });

    return captureMoves;
};

const checkPossibleMoves = (board, player, isFirstPlayer) => {
    const possibleMoves = {};
    const nextRowDirection = isFirstPlayer ? -1 : 1;
    const twoSidesDirectionsColumns = [1, -1];

    board.flat().forEach((piece, pieceIndex) => {
        if (piece?.owner === player) {
            const pieceRow = Math.floor(pieceIndex / COLUMNS);
            const pieceCol = pieceIndex % COLUMNS;
            const isKing = !!board[pieceRow][pieceCol]?.isKing;
        
            const twoSidesDirectionsRows = isKing ? [1, -1] : [nextRowDirection];
        
            twoSidesDirectionsRows.forEach(directionRow => {
                const newRowDirection = pieceRow + directionRow;
                const isNewRowInRange = newRowDirection < 8 && newRowDirection >= 0;
                
                isNewRowInRange &&
                twoSidesDirectionsColumns.forEach(directionColumn => {
                    const newColumnDirection = pieceCol + directionColumn;
                    const isNewColumnInRange = newColumnDirection < 8 && newColumnDirection >= 0;
                    const isNextLocationClear = board[newRowDirection][newColumnDirection] === undefined;
                    
                    if (isNewColumnInRange && isNextLocationClear) {
                        const currentMove = possibleMoves[`${pieceRow}-${pieceCol}`]
                        !!currentMove
                        ? currentMove.push([newRowDirection, newColumnDirection])
                        : possibleMoves[`${pieceRow}-${pieceCol}`] = [[newRowDirection, newColumnDirection]];
                    };
                });
            });
        }
    });

    return possibleMoves;
};

const movePiece = (board, players, from, to) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    let hasEat = false;

    if (Math.abs(from[0] - to[0]) !== 1) {
        const middleRow = (fromRow + toRow) / 2;
        const middleCol = (fromCol + toCol) / 2;

        board[middleRow][middleCol] = undefined;
        hasEat = true;
    };

    const piece = board[fromRow][fromCol];

    board[fromRow][fromCol] = undefined;
    board[toRow][toCol] = piece;

    checkForKings(board, players, to);

    return hasEat;
};

const checkForKings = (board, players, to) => {
    const [toRow, toCol] = to;
    const owner = board[toRow][toCol].owner;

    if ((owner === players[0] && toRow === 0) || (owner === players[1] && toRow === 7)) {
        board[toRow][toCol].isKing = true;
    }
}

module.exports = {
    checkCaptureMoves,
    checkPossibleMoves,
    movePiece
};
