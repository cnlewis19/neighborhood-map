import React, { Component } from 'react';
import restaurants from "./restaurants.json";
import MapContainer from "./Components/map.js";

class App extends Component {
  state = {
    lat:  42.8864,
    lon: -78.8784,
    zoom: 10,
    all: restaurants
  }

  render = () => {
    return (
      <div>
        <div>
          <h1> Great Gluten Free in Buffalo NY </h1>
        </div>

        <MapContainer
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all} />
      </div>
    );
  }
}


export default App;
