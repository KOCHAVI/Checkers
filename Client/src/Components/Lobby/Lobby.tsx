import { useAtomValue } from 'jotai';
import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Board from './Board/Board';
import useStyles from './LobbyStyles';
import EndGame from './EndGame/EndGame';
import { SocketAtom } from '../../store';
import InviteLobby from './InviteLobby/InviteLobby';
import { Piece } from '../../Models/Interfaces/Piece';
import { Direction } from '../../Models/Enums/Direction';
import startBoard from '../../Models/Defaults/StartBoard';
import FlyingPiece from '../Home/FlyingPiece/FlyingPiece';


const MY_TURN = 'תורך';
const OPPONENT_TURN = 'תור היריב';
const PLAYER_LEFT = 'היריב עזב את החדר';
const PLAYER_JOINS = 'יריב חדש נכנס לחדר';

const Lobby: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { lobbyCode } = useParams();
    const [selectedPieceLocation, setSelectedPieceLocation] = useState<number[]>([]);
    const [board, setBoard] = useState<(Piece | undefined)[][]>(startBoard('', ''));
    const [possibleMoves, setPossibleMoves] = useState({});
    const [players, setPlayers] = useState<string[]>();
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [mustMoves, setMustMoves] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [winner, setWinner] = useState('');
    const socket = useAtomValue(SocketAtom);
    const expiryTimestamp = new Date();
    expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);

    const {
        seconds: seconds1,
        minutes: minutes1,
        start: start1,
        pause: pause1,
        resume: resume1,
        restart: restart1
    } = useTimer({ expiryTimestamp, onExpire: () => socket.emit('timerExpired', lobbyCode), autoStart: false });
    
    const {
        seconds: seconds2,
        minutes: minutes2,
        start: start2,
        pause: pause2,
        resume: resume2,
        restart: restart2
    } = useTimer({ expiryTimestamp, onExpire: () => {}, autoStart: false });

    useEffect(() => {
        socket.connect();
        
        socket.emit('joinLobby', lobbyCode);

        socket.on('lobbyFull', ({ message }) => {
            enqueueSnackbar(message, { variant: 'error' });
            navigate('/');
        });

        socket.on('board', board => {
            setBoard(board);
        });

        socket.on('players', data => {
            setPlayers(data);
        });

        socket.on('possibleMoves', ({ possibleMoves, mustMoves }) => {
            setPossibleMoves(possibleMoves);
            setMustMoves(mustMoves);
        });

        socket.on('turnChanged', playerId => {
            setIsMyTurn(playerId === socket.id);
            socket.emit('possibleMoves', lobbyCode);
        });

        socket.on('opponentSelect', location => {
            !isMyTurn && setSelectedPieceLocation(location);
        });

        socket.on('winner', winnerSocketId => {
            setWinner(winnerSocketId);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        winner && socket.emit('leaveLobby', lobbyCode);
    }, [winner])

    useEffect(() => {
        if (players?.length === 2) {
            if (isMyTurn) {
                resume1();
                pause2();
            } else {
                resume2();
                pause1();
            }
        }
    }, [isMyTurn]);

    useEffect(() => {
        const expiryTimestamp = new Date();
        expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);
        restart1(expiryTimestamp, false);
        restart2(expiryTimestamp, false);
        if (players && socket.id === players[0]) {
            players?.length === 2
                ? enqueueSnackbar(PLAYER_JOINS, { variant: 'info' })
                : enqueueSnackbar(PLAYER_LEFT, { variant: 'error' });
        }
        if (players?.length === 2) {
            isMyTurn
                ? start1()
                : start2()
        }
    }, [players]);

    const handleRematch = () => {
        socket.emit('joinLobby', lobbyCode);
        setSelectedPieceLocation([]);
        setWinner('');
        setPlayers([socket.id!]);
        setBoard(startBoard('', ''));
        const expiryTimestamp = new Date();
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 15);
        restart1(expiryTimestamp, false);
        restart2(expiryTimestamp, false);
    }
    
    return (
        <div className={classes.container}>
            {
                winner && <EndGame isWinner={winner === socket.id} handleRematch={handleRematch} />
            }
            {
                players?.length === 2
                    ? <Typography className={classes.turnText}>{isMyTurn ? MY_TURN : OPPONENT_TURN}</Typography>
                    : <InviteLobby />
            }
            <Typography className={classes.opponentTimer}>{`${minutes2}:${String(seconds2).padStart(2, '0')}`}</Typography>
            <div className={classes.boardContainer}>
                <FlyingPiece direction={Direction.UP} />
                {
                    <Board
                        board={board}
                        players={players ? players : ['', '']}
                        possibleMoves={possibleMoves}
                        mustMoves={mustMoves}
                        isMyTurn={isMyTurn}
                        selectedPieceLocation={selectedPieceLocation}
                        setSelectedPieceLocation={setSelectedPieceLocation}
                    />
                }
                <FlyingPiece direction={Direction.DOWN}/>
            </div>
            <Typography className={classes.myTimer}>{`${minutes1}:${String(seconds1).padStart(2, '0')}`}</Typography>
        </div>
    )
}

export default Lobby;
