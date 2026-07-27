const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: "http://localhost:2000",

            methods: ["GET","POST"]

        }

    });

    io.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);

        // Trainer & students join session room
        socket.on("joinSession", (sessionId) => {

            socket.join(sessionId);

            console.log("Joined Session:", sessionId);

        });

        // Individual student room
        socket.on("joinStudentRoom", (studentId) => {

            socket.join(studentId);

            console.log("Joined Student Room:", studentId);

        });

        socket.on("disconnect", () => {

            console.log("Client Disconnected:", socket.id);

        });

    });

};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO
};