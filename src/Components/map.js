import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

export class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    infoWindowVisible: false
  }
  mapReady =(props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }
updateMarkers = (locations) => {
  if (!locations)
    return;

  this
    .state
    .markers
    .forEach(marker => marker.setMap(null));

  let markerProps = [];
  let markers = locations.map((location, index) => {
    let mProps = {
      key:index,
      index,
      name: location.name,
      position: location.pos,
      url: location.url
    };
    markerProps.push(mProps);
    let marker = new this.props.google.maps.Marker({
      position: location.pos,
      map: this.state.map,
    });
  })
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
      onClick={this.closeInfoWindow}
    />
  );
}
}

export default GoogleApiWrapper({

  apiKey: API_KEY
})(MapContainer);
