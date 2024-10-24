import React from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { LinearProgress, Modal, Typography } from "@mui/material";

import useStyles from "./InviteLobbyStyles";


const COPY_THE_CODE = '!העתק קוד חדר';
const WAITING_FOR_PLAYER = 'עכשיו נחכה עד שכבודו יבוא'
const CODE_COPIED_TO_CLIPBOARD = 'הקוד הועתק ללוח';

const InviteLobby: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { lobbyCode } = useParams();
    const classes = useStyles();

    const handleCopyCode = () => {
        navigator.clipboard.writeText(lobbyCode || '');
        enqueueSnackbar(CODE_COPIED_TO_CLIPBOARD, { variant: 'success', autoHideDuration: 3000 });
    };

    return (
        <>
            <Modal
                open
                className={classes.modal}
            >
                <div className={classes.container}>
                    <div
                        className={classes.copyCodeContainer}
                        onClick={handleCopyCode}
                    >
                        <Typography className={classes.codeHeaderText}>
                            {COPY_THE_CODE}
                        </Typography>
                        <Typography className={classes.codeText}>
                            {lobbyCode}
                        </Typography>
                    </div>
                    <Typography className={classes.waitForPlayerText}>
                        {WAITING_FOR_PLAYER}
                    </Typography>
                    <LinearProgress color="inherit" />
                </div>
            </Modal>
        </>
    )
};

export default InviteLobby;
