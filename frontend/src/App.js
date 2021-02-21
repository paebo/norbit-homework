import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
//import WorldMap from "./components/Map.js";

const ENDPOINT = "http://localhost:5001";

function App() {
  const [response, setResponse] = useState();
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("new record", (data) => {
      setResponse([data.lat, data.lon, data.heading]);
    });
  }, []);

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
            <>No data stream</>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
