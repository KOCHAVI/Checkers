import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
    },
    boardContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    turnText: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '50px',
        }
    },
    myTimer: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '30px',
        }
    },
    opponentTimer: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '20px',
        }
    }
});

export default useStyles;
