import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
  CoordinateProvider,
  CoordinateContext,
} from "./components/Map/CoordinateProvider";
import Coordinates from "./components/Map/Coordinates";
import PublicMap from "./components/Map/Map";

function App() {
  return (
    <div className='App'>
      <CoordinateProvider>
        <header className='App-header'>
          <ul id='records'>
            <Coordinates />
          </ul>
        </header>
        <PublicMap />
      </CoordinateProvider>
    </div>
  );
}

export default App;
