import clsx from 'clsx';
import { Direction } from '../../../Models/Enums/Direction';
import useStyles from './FlyingPieceStyles';


const BLACK_PIECE_MODEL_URL = '/Black3D.png';
const WHITE_PIECE_MODEL_URL = '/White3D.png';

interface Props {
    direction: Direction;
}

const FlyingPiece: React.FC<Props> = (props) => {
    const { direction } = props;
    const classes = useStyles();

    return (
        <img
            className={clsx(classes.img, direction === Direction.UP ? classes.upAndDown : classes.downAndUp)}
            src={direction === Direction.UP ? BLACK_PIECE_MODEL_URL : WHITE_PIECE_MODEL_URL}
        />
    )
};

export default FlyingPiece;
