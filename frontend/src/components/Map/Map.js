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

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.szeged = fromLonLat([20.1414, 46.253]);

    this.state = { center: this.szeged, zoom: 6 };

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
          radius: 5,
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

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
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
  }

  userAction() {
    this.setState({
      center: transform([this.state.center], "EPSG:4326", "EPSG:3857"),
      zoom: 5,
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
    console.log(this.state, this.features);
    let point = new Point(fromLonLat([19, 40]));
    let feat = new Feature(point);
    this.source.addFeature(feat);
  }

  render() {
    this.updateMap(); // Update map on render?*/
    return (
      <div id='map' style={{ width: "100%", height: "500px" }}>
        <button onClick={(e) => this.userAction()}>setState on click</button>
        <button onClick={(e) => this.addInteraction()}>draw on click</button>
        <button onClick={(e) => this.drawPoint()}>draw on click</button>
      </div>
    );
  }
}

export default PublicMap;
