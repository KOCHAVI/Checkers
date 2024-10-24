import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";

import useStyles from "./ClearPieceBlockStyles";
import { SocketAtom } from "../../../../store";
import { getImageFromInfo } from "../../../../Utils/Utils";


interface Props {
    isHighlighted: boolean;
    selectedPieceLocation: number[];
    setSelectedPieceLocation: React.Dispatch<React.SetStateAction<number[]>>;
    rowIndex: number;
    columnIndex: number;
    isMyTurn: boolean;
    isFirstPlayer: boolean;
    isKing: boolean;
}

const ClearPieceBlock: React.FC<Props> = (props) => {
    const { isHighlighted, selectedPieceLocation, rowIndex, columnIndex, setSelectedPieceLocation, isMyTurn, isFirstPlayer, isKing } = props;
    const classes = useStyles({ isHighlighted, isFirstPlayer, isKing });
    const socket = useAtomValue(SocketAtom);
    const { lobbyCode } = useParams();
    
    const handleMoveClick = () => {
        if (isMyTurn && selectedPieceLocation && isHighlighted) {
            socket.emit('makeMove', { lobbyCode, from: selectedPieceLocation, to: [rowIndex, columnIndex]});
            setSelectedPieceLocation([]);
        }
    }

    return (
        isHighlighted
        ? <img
            src={getImageFromInfo(isFirstPlayer, isKing)}
            className={classes.container}
            onClick={handleMoveClick}
        />
        : <div className={classes.container}/>
    );
};

export default ClearPieceBlock;
