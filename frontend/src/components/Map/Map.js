import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSMSource from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Style, Circle, Fill } from "ol/style";
import { fromLonLat } from "ol/proj";
import { CoordinateContext } from "./CoordinateProvider";
class WorldMap extends Component {
  constructor(props) {
    super(props);

    this.BUDAPEST = fromLonLat([19.0414, 47.4979]);

    this.state = { center: this.BUDAPEST, zoom: 6, coordinates: [] };

    this.features = [];

    this.draw = null;

    this.toggle = false;

    this.tileLayer = [
      new TileLayer({
        source: new OSMSource(),
      }),
    ];

    this.source = new VectorSource({ features: this.features });

    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });

    this.olmap = new Map({
      target: null,
      layers: this.tileLayer,
      view: new View({
        center: this.BUDAPEST,
        zoom: this.state.zoom,
      }),
    });
    this.olmap.addLayer(this.vectorLayer);
  }

  static contextType = CoordinateContext;

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
    //this.drawLine();
    this.drawLine();
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({
      center: this.state.coordinates,
      zoom: 20,
    });
  }

  //
  /*addInteraction() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      const value = "Point";
      this.draw = new Draw({
        source: this.source,
        type: value,
      });
      this.olmap.addInteraction(this.draw);
    } else {
      this.olmap.removeInteraction(this.draw);
    }
  }*/

  drawLine() {
    if (this.context.records) {
      //if (this.source.getFeatures().length < 1) {
      const { lat, lon } = this.context.records;
      console.log(this.state, this.features, lon, lat);
      this.state.coordinates = fromLonLat([lon, lat]);
      let point = new Point(fromLonLat([lon, lat]));
      let feat = new Feature(point);
      this.source.addFeature(feat);
      //}
    }
  }

  drawPoint() {
    if (this.context.records) {
      const { lat, lon } = this.context.records;
      if (this.source.getFeatures().length > 0) {
        this.source
          .getFeatures()[0]
          .getGeometry()
          .setCoordinates([fromLonLat([lon, lat])]);
      } else {
        let point = new Point(fromLonLat([lon, lat]));
        let feat = new Feature(point);
        this.source.addFeature(feat);
      }
    }
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id='map' style={{ width: "100%", height: "500px" }}>
        <button onClick={() => this.userAction()}>Zoom to marking</button>
      </div>
    );
  }
}

export default WorldMap;
