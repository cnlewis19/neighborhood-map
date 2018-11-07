import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
}
const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

export class MapContainer extends Component {
  render() {
    return (
      <Map
      google={this.props.google}
      zoom={11}
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
