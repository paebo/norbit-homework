import React, { useState, useEffect, createContext } from "react";
import socketIOClient from "socket.io-client";

export const CoordinateContext = createContext();

const ENDPOINT = "http://localhost:5001";

export function CoordinateProvider(props) {
  const [response, setResponse] = useState();
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("new record", (data) => {
      setResponse({ lat: data.lat, lon: data.lon, heading: data.heading });
    });
  }, []);
  return (
    <CoordinateContext.Provider value={{ response }}>
      {props.children}
    </CoordinateContext.Provider>
  );
}
