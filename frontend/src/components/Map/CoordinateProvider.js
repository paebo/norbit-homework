import React, { useState, useEffect, createContext } from "react";
import socketIOClient from "socket.io-client";

export const CoordinateContext = createContext();

const ENDPOINT = "http://localhost:5001";

export function CoordinateProvider(props) {
  const [records, setRecords] = useState();
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("new record", (data) => {
      setRecords({ lat: data.lat, lon: data.lon, heading: data.heading });
    });
  }, []);

  return (
    <CoordinateContext.Provider value={{ records }}>
      {props.children}
    </CoordinateContext.Provider>
  );
}
