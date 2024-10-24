import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '19px',
        userSelect: 'none',
        'WebkitUserSelect': 'none'
    },
    topHeader: {
        '&.MuiTypography-root': {
            fontSize: '100px',
            fontFamily: 'Rubik Doodle Shadow',
        }
    },
    codeInputText: {
        paddingBottom: '30px',
        '&.MuiTypography-root': {
            fontSize: '40px',
            fontFamily: 'Rubik Doodle Shadow',
        }
    },
    boardImage: {
        width: '50%',
    },
    joinCreateButton: {
        '&.MuiButtonBase-root': {
            fontFamily: 'Rubik Doodle Shadow',
            color: 'white',
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
                color: 'red',
                background: 'none',
                boxShadow: 'rgba(255, 255, 255, .4) 2px 8px 8px -5px',
                transform: 'translate3d(0, 3px, 0)'
            }
        },
    },
    outerJoinButton: {
        '&.MuiButtonBase-root': {
            fontSize: '40px',
        },
    },
    innerJoinButton: {
        '&.MuiButtonBase-root': {
            marginTop: '15px',
            fontSize: '25px',
            boxShadow: 'rgba(0, 0, 0, .2) 15px 28px 25px -18px',
            '&:hover': {
                boxShadow: 'rgba(0, 0, 0, .4) 2px 8px 8px -5px',
            }
        },
    },
    boardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    codeFieldWrapper: {
        transform: 'perspective(75em) rotateX(18deg)',
        boxShadow: 'rgba(22, 31, 39, 0.42) 0px 60px 123px -25px, rgba(19, 26, 32, 0.08) 0px 35px 75px -35px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'rgb(213, 220, 226) rgb(213, 220, 226) rgb(184, 194, 204)',
        padding: '10px',
        backgroundColor: 'darkgray',
        textAlign: 'center'
    },
    codeFieldContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '75px',
        gap: '30px',
    },
    codeField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white',
        borderRadius: '10px',
        padding: '5px',
        width: '25px',
        textAlign: 'center',
        fontSize: '2.5rem',
        fontFamily: 'Rubik Doodle Shadow'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default useStyles;
