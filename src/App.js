import React, { Component } from 'react';
import locations from "./restaurants.json";
import './App.css';
import MapContainer from "./Components/map.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import List from './Components/list.js';

//Adds the icon for the list function to be called later
library.add(faBars)


class App extends Component {
  //Sets initial map specs
  state = {
    lat:  42.8864,
    lng: -78.8784,
    zoom: 10,
    all: locations,
    filtered: null,
    open: false,
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

  //Search Procdures are covered in the next three functions
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

  clickSearch = (index) => {
    this.setState({selectedIndex: index, open: !this.state.open})
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
          locations={this.state.filtered}
          selectedIndex= {this.state.selectedIndex}
          clickSearch={this.clickSearch}/>

          <List
            locations= {this.state.filtered}
            open = {this.state.open}
            toggleList ={this.toggleList}
            filterLocations={this.updateQuery}
            clickSearch={this.clickSearch} />
      </div>
    );
  }
}


export default App;
