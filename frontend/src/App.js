import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

const ENDPOINT = "http://localhost:5000";

//const socket = io();

const App = () => {
  const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  socket.on("new record", (data) => {
    setResponse(data);
    window.scrollTo(0, document.body.scrollHeight);
  });
  const [response, setResponse] = useState("");

  useEffect(() => {}, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <ul id='records'></ul>
        <h1> yes {response}</h1>
      </header>
    </div>
  );
};

export default App;
