import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import WorldMap from "./components/Map.js";

const ENDPOINT = "http://localhost:5001";

//const socket = io();

function App() {
  const [response, setResponse] = useState();
  const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket", "flashsocket"],
  });

  useEffect(() => {
    socket.on("new record", (data) => {
      setResponse([data.lat, data.lon, data.heading]);
    });
  }, [response]);

  return (
    <div className='App'>
      <header className='App-header'>
        <ul id='records'>
          {response ? (
            <>
              <li>{response[0]}</li>
              <li>{response[1]}</li>
              <li>{response[2]}</li>
            </>
          ) : (
            <>
              <li>no data</li>
            </>
          )}
        </ul>
        <WorldMap />
      </header>
    </div>
  );
}

export default App;
