const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
const path = require("path");
const logger = require("./middleware/logger");
const db = require("./queries");

require("dotenv").config();

app.use(logger);

//Body parser for future development
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.sendFile(path.join(__dirname, "/frontend/public/index.html"));
});

app.get("/records", db.getRecords);
//app.get("/records/:id", db.getRecords);

io.on("connection", (socket) => {
  console.log("connected");

  io.emit("connection", "User connected to your channel");

  socket.on("new record", (data) => {
    io.emit("new record", data);
    if (data) {
      db.saveRecord(data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));
