import useStyles from "./PieceStyles";
import { getImageFromInfo } from "../../../../Utils/Utils";


interface Props {
    isFirstPlayer: boolean;
    isKing: boolean;
    setSelectedPieceLocation: () => void;
    isMyTurn: boolean;
    isHighlighted: boolean;
    isRotated: boolean;
}

const Piece: React.FC<Props> = (props) => {
    const { isKing, isFirstPlayer, setSelectedPieceLocation, isMyTurn, isHighlighted, isRotated } = props;
    const classes = useStyles({ isHighlighted, isRotated });

    const handlePieceClick = () => {
        isMyTurn && setSelectedPieceLocation();
    }

    return (
        <div className={classes.container}>
            <img
                className={classes.imgPiece}
                src={getImageFromInfo(isFirstPlayer, isKing)}
                onClick={handlePieceClick}
            />
        </div>
    );
};

export default Piece;
