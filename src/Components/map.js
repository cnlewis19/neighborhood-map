import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

export class MapContainer extends Component {
  state = {
    map: null,
  }
  mapReady =(props, map) => {
    this.setState({map});
  }
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
      google={this.props.google}
      onReady={this.mapReady}
      zoom={this.props.zoom}
      style={mapStyles}
      initialCenter={{
        lat: 42.8864,
        lng: -78.8784
      }}
    />
  );
}
}

export default GoogleApiWrapper({

  apiKey: API_KEY
})(MapContainer);
