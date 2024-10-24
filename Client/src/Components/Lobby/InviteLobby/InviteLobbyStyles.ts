import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        transform: 'perspective(75em) rotateX(18deg)',
        boxShadow: 'rgba(22, 31, 39, 0.42) 0px 60px 123px -25px, rgba(19, 26, 32, 0.08) 0px 35px 75px -35px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'rgb(213, 220, 226) rgb(213, 220, 226) rgb(184, 194, 204)',
        padding: '10px',
        backgroundColor: 'darkgray',
        textAlign: 'center'
    },
    copyCodeContainer: {
        cursor: 'pointer'
    },
    codeText: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '40px',
            userSelect: 'none'
        }
    },
    codeHeaderText: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '30px',
            userSelect: 'none',
            color: 'black'
        }
    },
    waitForPlayerText: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            fontSize: '20px',
            userSelect: 'none',
            color: 'black'
        }
    }
});

export default useStyles;
