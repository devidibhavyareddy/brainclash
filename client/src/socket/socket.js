import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "https://brainclash-lc8g.onrender.com", {
    autoConnect: false,
});

export default socket;