import { makeStyles } from '@mui/styles';


interface Props {
    isFirstPlayer: boolean;
}

const useStyles = makeStyles({
    container: (props: Props) => ({
        width: 'min-content',
        padding: '48px',
        display: 'grid',
        gridTemplateRows: 'repeat(8, 66px)',
        gridTemplateColumns: 'repeat(8, 66px)',
        gap: '0',
        transform: !props.isFirstPlayer ? 'rotate(180deg)' : 'unset',
        backgroundImage: 'url(/CheckersBoard.jpg)',
        boxShadow: '20px 20px 30px rgba(150, 150, 150, 0.3)',
    }),
});

export default useStyles;