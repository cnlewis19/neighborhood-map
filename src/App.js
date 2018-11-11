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

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  toggleList = () => {
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  render = () => {
    return (
      <div>
        <div>
        <button onClick={this.toggleList} className="togglebutton">
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
          locations={this.state.filtered} />

          <List
            locations= {this.state.filtered}
            open = {this.state.open}
            toggleList ={this.toggleList}
            filterLocations={this.updateQuery} />
      </div>
    );
  }
}


export default App;
