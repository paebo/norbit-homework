import React, { useState, useEffect } from "react";
import "./App.css";
import { CoordinateProvider } from "./components/Map/CoordinateProvider";
import Coordinates from "./components/Map/Coordinates";
import PublicMap from "./components/Map/Map";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <ul id='records'>
          <CoordinateProvider>
            <Coordinates />
          </CoordinateProvider>
        </ul>
      </header>
      <PublicMap />
    </div>
  );
}

export default App;
