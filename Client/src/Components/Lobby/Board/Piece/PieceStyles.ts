import { makeStyles } from '@mui/styles';


interface Props {
    isHighlighted: boolean;
    isRotated: boolean;
}

const useStyles = makeStyles({
    container: {
        position: 'relative',
        userSelect: 'none'
    },
    imgPiece: ({ isHighlighted, isRotated }: Props) => ({
        position: 'absolute',
        width: '100%',
        aspectRatio: '1/1',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${isRotated ? 0 : 180}deg)`,
        borderRadius: '100%',
        border: isHighlighted ? '5px solid rgba(255, 155, 155, 0.6)' : '',        
    }),
});

export default useStyles;
