const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("connected");

  io.emit("connection", "User connected to your channel");

  socket.on("new record", (msg) => {
    console.log(msg);
    io.emit("new record", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, console.log(`Server started on port ${PORT}`));
