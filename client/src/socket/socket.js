import { io } from "socket.io-client";

const socket = io("http://localhost:2000", {
  autoConnect: false,
});

export default socket;