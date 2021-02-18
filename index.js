const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("Greeting", "Hello!");
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, console.log(`Server started on port ${PORT}`));
