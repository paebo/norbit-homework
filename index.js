const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
const path = require("path");
const logger = require("./middleware/logger");
require("dotenv").config();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(logger);

//For React
/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/public/index.html"));
});
*/

io.on("connection", (socket) => {
  console.log("connected");

  io.emit("connection", "User connected to your channel");

  socket.on("new record", (data) => {
    console.log(data);
    io.emit("new record", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, console.log(`Server started on port ${PORT}`));
