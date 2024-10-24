import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';

import Piece from './Piece/Piece';
import useStyles from './BoardStyles';
import { SocketAtom } from '../../../store';
import ClearPieceBlock from './ClearPieceBlock/ClearPieceBlock';
import { Piece as PieceModel } from '../../../Models/Interfaces/Piece';


interface Props {
    board: (PieceModel | undefined)[][];
    players: string[];
    possibleMoves: { [key: string]: number[][] };
    mustMoves: { [key: string]: number[][] };
    isMyTurn: boolean;
    selectedPieceLocation: number[];
    setSelectedPieceLocation: React.Dispatch<React.SetStateAction<number[]>>;
}

const arrayExists = (arrayOfArrays: number[][], targetArray: number[]) => {
    return arrayOfArrays.some(arr => 
        arr.length === targetArray.length && arr.every((value, index) => value === targetArray[index])
    );
};

const Board: React.FC<Props> = (props) => {
    const { board, players, possibleMoves, mustMoves, isMyTurn, selectedPieceLocation, setSelectedPieceLocation } = props;
    const socket = useAtomValue(SocketAtom);
    const { lobbyCode } = useParams();
    const isFirstPlayer = socket.id === players[0];
    const classes = useStyles({ isFirstPlayer })
    const currentPossibleMoves = possibleMoves[`${selectedPieceLocation[0]}-${selectedPieceLocation[1]}`];
    const currentMustMoves = mustMoves[`${selectedPieceLocation[0]}-${selectedPieceLocation[1]}`];

    const handleSetSelectedLocation = (location: number[]) => {
        const isValid = Object.keys(mustMoves).length !== 0
        ? mustMoves[`${location[0]}-${location[1]}`]
        : possibleMoves[`${location[0]}-${location[1]}`]
        
        if (isValid) {
            setSelectedPieceLocation(location);
            socket.emit('opponentSelect', { lobbyCode, location });
        };
    }

    return (
        <div className={classes.container}>
            {
                board.map((row: (PieceModel | undefined)[], rowIndex: number) => 
                    row.map((cell: PieceModel | undefined, columnIndex: number) => {
                        if (cell) {
                            const isMustMove = !!mustMoves[`${rowIndex}-${columnIndex}`];
                            const isSelected = selectedPieceLocation[0] === rowIndex && selectedPieceLocation[1] === columnIndex;
                            const isHighlighted = (isMustMove && isMyTurn ) || (isSelected);
                            return <Piece
                                isFirstPlayer={cell.owner === players[0]}
                                isRotated={isFirstPlayer}
                                isKing={cell.isKing}
                                setSelectedPieceLocation={() => handleSetSelectedLocation([rowIndex, columnIndex])}
                                isMyTurn={isMyTurn}
                                isHighlighted={isHighlighted}
                            />
                        } else {
                            const isKing = selectedPieceLocation.length !== 0 && !!board[selectedPieceLocation[0]][selectedPieceLocation[1]]?.isKing;
                            const isHighlighted = Object.keys(mustMoves).length !== 0
                            ? currentMustMoves
                                && arrayExists(currentMustMoves, [rowIndex, columnIndex])
                            : currentPossibleMoves
                                && arrayExists(currentPossibleMoves, [rowIndex, columnIndex])
                            return <ClearPieceBlock
                                isHighlighted={isHighlighted}
                                selectedPieceLocation={selectedPieceLocation}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                setSelectedPieceLocation={setSelectedPieceLocation}
                                isMyTurn={isMyTurn}
                                isFirstPlayer={isFirstPlayer}
                                isKing={isKing}
                            />
                        }
                    })
            )}
        </div>
    );
};

export default Board;
