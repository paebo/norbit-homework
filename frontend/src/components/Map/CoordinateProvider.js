import React, { useState, useEffect, createContext } from "react";
import socketIOClient from "socket.io-client";

export const CoordinateContext = createContext();

const ENDPOINT = "http://localhost:5001";

export function CoordinateProvider(props) {
  const [response, setResponse] = useState();
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("new record", (data) => {
      setResponse([data.lat, data.lon, data.heading]);
    });
  }, []);
  return (
    <CoordinateContext.Provider value={{ response, setResponse }}>
      {props.children}
    </CoordinateContext.Provider>
  );
}
