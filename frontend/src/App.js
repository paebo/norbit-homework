import React from "react";
import "./App.css";
import { CoordinateProvider } from "./components/Map/CoordinateProvider";
import Coordinates from "./components/Map/Coordinates";
import WorldMap from "./components/Map/Map";

function App() {
  return (
    <div className='App'>
      <CoordinateProvider>
        <header className='App-header'>
          <ul id='records'>
            <Coordinates />
          </ul>
        </header>
        <WorldMap />
      </CoordinateProvider>
    </div>
  );
}

export default App;
