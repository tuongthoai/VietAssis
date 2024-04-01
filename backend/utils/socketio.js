const { Server } = require("socket.io");
const http = require("http");

let io;

const createIo = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("join", (msg) => {
      socket.join(msg.split(`|`));
    });
    socket.on("disconnect", () => {
      const rooms = io.sockets.adapter.sids.get(socket.id);
      for (const room in rooms) {
        socket.leave(room);
      }
    });
  });

  io.on("ping", () => {
    console.log("test");
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized yet");
  }
  return io;
};

module.exports = { createIo, getIo };
