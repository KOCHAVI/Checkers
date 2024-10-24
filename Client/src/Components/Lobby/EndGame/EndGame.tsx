import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, LinearProgress, Modal, Typography } from "@mui/material";

import useStyles from "./EndGameStyles";


const YOU_LOST = '!!!!!הפסדת';
const YOU_WON = '!!!!!ניצחת';
const REMATCH = 'משחק חוזר';
const BACK_TO_LOBBY = 'חזרה ללובי';

interface Props {
    isWinner: boolean;
    handleRematch: () => void;
}

const EndGame: React.FC<Props> = (props) => {
    const { isWinner, handleRematch } = props;
    const navigate = useNavigate();
    const classes = useStyles({ isWinner });

    return (
        <>
            <Modal
                open
                className={classes.modal}
            >
                <div className={classes.container}>
                    <Typography className={classes.title}>
                        {isWinner ? YOU_WON : YOU_LOST}
                    </Typography>
                    <Button onClick={handleRematch}>{REMATCH}</Button>
                    <Button onClick={() => navigate('/')}>{BACK_TO_LOBBY}</Button>
                    <LinearProgress color="inherit" />
                </div>
            </Modal>
        </>
    )
};

export default EndGame;
