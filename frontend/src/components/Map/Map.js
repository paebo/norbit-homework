import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlSourceOSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Style, Circle as Circ, Fill } from "ol/style";
import { fromLonLat, transform } from "ol/proj";
import { CoordinateContext } from "./CoordinateProvider";
class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.szeged = fromLonLat([20.1414, 46.253]);

    this.state = { center: this.szeged, zoom: 6, coordinates: [] };

    this.features = [];

    this.point = new Point(this.szeged);

    this.feat = new Feature(this.point);

    this.features.push(this.feat);

    this.draw = null;

    this.toggle = false;

    this.raster = [
      new OlLayerTile({
        source: new OlSourceOSM(),
      }),
    ];

    this.source = new VectorSource({ features: this.features });

    this.vector = new OlLayerVector({
      source: this.source,
      style: new Style({
        image: new Circ({
          radius: 3,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });

    this.olmap = new OlMap({
      target: null,
      layers: this.raster,
      view: new OlView({
        center: this.szeged,
        zoom: this.state.zoom,
      }),
    });
    this.olmap.addLayer(this.vector);
  }

  static contextType = CoordinateContext;

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
    this.drawPoint();
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

  addInteraction() {
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
  }

  drawPoint() {
    if (this.context.response) {
      const { lat, lon } = this.context.response;
      console.log(this.state, this.features, lon, lat);
      this.state.coordinates = fromLonLat([lon, lat]);
      let point = new Point(fromLonLat([lon, lat]));
      let feat = new Feature(point);
      this.source.addFeature(feat);
    }
  }

  render() {
    this.updateMap(); // Update map on render?*/
    return (
      <div id='map' style={{ width: "100%", height: "500px" }}>
        <button onClick={(e) => this.userAction()}>Zoom to marking</button>
        <button onClick={(e) => this.addInteraction()}>draw on click</button>
        <button onClick={(e) => this.drawPoint()}>draw on click</button>
      </div>
    );
  }
}

export default PublicMap;
