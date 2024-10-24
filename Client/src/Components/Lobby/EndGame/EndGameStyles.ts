import { makeStyles } from '@mui/styles';


interface Props {
    isWinner: boolean;
}

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: ({ isWinner }: Props) => ({
        transform: 'perspective(75em) rotateX(18deg)',
        boxShadow: 'rgba(22, 31, 39, 0.42) 0px 60px 123px -25px, rgba(19, 26, 32, 0.08) 0px 35px 75px -35px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'rgb(213, 220, 226) rgb(213, 220, 226) rgb(184, 194, 204)',
        padding: '10px',
        backgroundColor: isWinner ? 'green' : 'red',
        textAlign: 'center'
    }),
    title: {
        '&.MuiTypography-root': {
            fontFamily: 'Rubik Doodle Shadow',
            userSelect: 'none',
            fontSize: '40px',
            color: 'white'
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
    },
    joinCreateButton: {
        '&.MuiButtonBase-root': {
            fontFamily: 'Rubik Doodle Shadow',
            color: 'white',
            fontSize: '25px',
            boxShadow: 'rgba(255, 255, 255, .2) 15px 28px 25px -18px',
            transition: '235ms ease-in-out',
            cursor: 'pointer',
            touchAction: 'manipulation',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderBottomLeftRadius: '15px 255px',
            borderBottomRightRadius: '225px 15px',
            borderTopLeftRadius: '255px 15px',
            borderTopRightRadius: '15px 225px',
            '&:hover': {
                background: 'none',
                boxShadow: 'rgba(255, 255, 255, .4) 2px 8px 8px -5px',
                transform: 'translate3d(0, 3px, 0)'
            }
        },
    },
    redButton: {
        '&:hover': {
            color: 'red'
        }
    },
    greenButton: {
        '&:hover': {
            color: 'green'
        }
    }
});

export default useStyles;
