import React from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import proj from "ol/proj";
import styled from "styled-components";

const MapDiv = styled.div`
  width: 40%;
  height: 25%;
`;

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [19, 47],
    zoom: 6,
  }),
});

function WorldMap() {
  return <MapDiv id='map'></MapDiv>;
}

export default WorldMap;
