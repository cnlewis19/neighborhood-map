import React, { Component } from 'react';
import restaurants from "./restaurants.json";
import './App.css';
import MapContainer from "./Components/map.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import List from './Components/list.js';

library.add(faBars)


class App extends Component {
  state = {
    lat:  42.8864,
    lng: -78.8784,
    zoom: 10,
    all: restaurants
  }

  toggleList = () => {
    this.setState({
      open: !this.state.open
    });
  }
  render = () => {
    return (
      <div>
        <div>
        <button onClick={this.toggleList} class="togglebutton">
            <FontAwesomeIcon icon="bars" />
          </button>
          <h1> Great Gluten Free in Buffalo NY </h1>
        </div>

        <MapContainer
          role="application"
          aria-label="map"
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.all} />

          <List
            locations= {this.state.all}
            open = {this.state.open}
            toggleList ={this.toggleList} />
      </div>
    );
  }
}


export default App;
