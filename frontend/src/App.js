import React from "react";
import "./App.css";
import { CoordinateProvider } from "./components/Map/CoordinateProvider";
import Coordinates from "./components/Map/Coordinates";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className='App'>
      <CoordinateProvider>
        <header className='App-header'>
          <ul id='records'>
            <Coordinates />
          </ul>
        </header>
        <Map />
      </CoordinateProvider>
    </div>
  );
}

export default App;
