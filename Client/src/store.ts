import { atom } from "jotai";
import { io } from "socket.io-client";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST_URL;
const PORT = import.meta.env.VITE_SERVER_PORT;
const socket = io(`${SERVER_HOST}:${PORT}`);

export const SocketAtom = atom(socket);