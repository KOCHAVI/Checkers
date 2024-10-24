import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    img: {
        width: '7.5%',
        userSelect: 'none'
    },
    upAndDown: {
        animation: `$UpAndDown 4s linear infinite`
    },
    downAndUp: {
        animation: `$DownAndUp 4s linear infinite`
    },
    '@keyframes UpAndDown': {
        '0%, 100%': {
            transform: 'translateY(-50px) rotate(-15deg) scale(1)'
        },
        '50%': {
            transform: 'translateY(-200px) rotate(15deg) scale(1.1)'
        }
    },
    '@keyframes DownAndUp': {
        '0%, 100%': {
            transform: 'translateY(50px) rotate(15deg) scale(1)'
        },
        '50%': {
            transform: 'translateY(200px) rotate(-15deg) scale(1.1)'
        }
    },
});

export default useStyles;
