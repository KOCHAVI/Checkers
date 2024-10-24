import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';

import useStyles from './HomeStyles';
import FlyingPiece from './FlyingPiece/FlyingPiece';
import { Direction } from '../../Models/Enums/Direction';
import { characters, generateRandomCode } from '../../Utils/Utils';


const CODE_LENGTH = 4;
const CHECKERS = 'דמקה';
const CREATE_LOBBY = 'צור חדר';
const JOIN_LOBBY = 'הצטרף לחדר';
const LOBBY_CODE_INPUT = 'הזן קוד'
const BOARD_IMAGE_URL = '/Board3D.png';
const VALID_CHARACTERS = /^[A-Za-z0-9]+$/

const Board: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [isJoinLobbyDialogOpen, setIsJoinLobbyDialogOpen] = useState(false);

    const handleCreateGame = () => {
        const code = generateRandomCode();
        navigate(`/${code}`);
    }

    const handleJoinGame = () => {
        setIsJoinLobbyDialogOpen(true);
    }

    const handleClose = () => {
        setIsJoinLobbyDialogOpen(false);
        setLobbyCode('');
    }

    useEffect(() => {
        const listener = (event: ClipboardEvent) => {
            event.clipboardData && setLobbyCode(event.clipboardData.getData("text"));
            event.preventDefault();

            const clipboardData = event.clipboardData?.getData('text');
            const pastedText = clipboardData ? clipboardData : '';

            if (pastedText.length > CODE_LENGTH) {
                alert(`Lobby code cannot exceed ${CODE_LENGTH} characters.`);
                return;
            }

            if (!VALID_CHARACTERS.test(pastedText)) {
                alert('Lobby code can only contain alphanumeric characters.');
                return;
            }

            setLobbyCode(pastedText);
        }
        window.addEventListener("paste", listener);
    
        return () => window.removeEventListener("paste", listener);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const isCapsLockOn = event.getModifierState('CapsLock');
        const isShiftPressed = event.shiftKey;

        if (characters.includes(event.key) && lobbyCode.length < CODE_LENGTH) {
            const keyPressed = (isCapsLockOn || isShiftPressed) ? event.key.toUpperCase() : event.key;
            setLobbyCode(prev => prev + keyPressed);
        }
        else if (event.code === 'Backspace') {
            setLobbyCode(prev => prev.slice(0, -1))
        }

        event.code === 'Enter' && handleJoinGameCode();
    }

    const handleJoinGameCode = () => {
        navigate(`/${lobbyCode}`);
    }

    return (
        <>
            <Modal
                className={classes.modal}
                open={isJoinLobbyDialogOpen}
                onClose={handleClose}
            >
                <div
                    className={classes.codeFieldWrapper}
                    onKeyDown={handleKeyDown}
                >
                    <Typography className={classes.codeInputText}>
                        {LOBBY_CODE_INPUT}
                    </Typography>
                    <div className={classes.codeFieldContainer}>
                        {
                            Array(4).fill(undefined).map((_, index) => 
                                <div key={index} className={classes.codeField}>{lobbyCode[index]}</div>
                            )
                        }
                    </div>
                    <Button
                        className={clsx(classes.joinCreateButton, classes.innerJoinButton)}
                        onClick={handleJoinGameCode}
                    >
                        {JOIN_LOBBY}
                    </Button>
                </div>
            </Modal>
            <div className={classes.container}>
                <Typography className={classes.topHeader} >
                    {CHECKERS}
                </Typography>
                <div className={classes.boardContainer}>
                    <FlyingPiece direction={Direction.UP} />
                    <img
                        src={BOARD_IMAGE_URL}
                        className={classes.boardImage}
                    />
                    <FlyingPiece direction={Direction.DOWN} />
                </div>
                <Button
                    className={clsx(classes.joinCreateButton, classes.outerJoinButton)}
                    onClick={handleCreateGame}
                    disableRipple
                >
                    {CREATE_LOBBY}
                </Button>
                <Button
                    className={clsx(classes.joinCreateButton, classes.outerJoinButton)}
                    onClick={handleJoinGame}
                    disableRipple
                >
                    {JOIN_LOBBY}
                </Button>
            </div>
        </>
    );
};

export default Board;
