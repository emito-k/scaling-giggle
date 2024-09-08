const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("custom-event", (number, string, obj) => {
    console.log(number);
    console.log(string);
    console.log(obj);
  });

  socket.on("send-message", (data) => {
    console.log(data);

    if (data.room) {
      socket.to(data.room).emit("receive-message", data);
    } else {
      socket.broadcast.emit("receive-message", data);
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });
});
