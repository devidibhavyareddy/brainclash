import { io } from "socket.io-client";

const socket = io("https://brainclash-1.onrender.com", {
    autoConnect: false,
});

export default socket;
