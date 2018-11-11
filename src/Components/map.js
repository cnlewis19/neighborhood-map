import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import NoMap from './nomap.js';


const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`;
const FS_CLIENT = "ARL2CGYF24WU5MERFCYSFMAKZF3GVK1DSQAJQ1Z43TYLQNZP";
const FS_SECRET = "BM4WXXIOGG4ZDXZK0D2KHYQ5TX31ZCV01V3NJ2WWYRIV2HSM";
const FS_VERSION = "20180323";

export class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    infoWindowVisible: false
  }


  mapReady = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }
//Allows for filtering on map when searching
  componentWillReceiveProps = (props) => {
         this.setState({firstDrop: false});
         if (this.state.markers.length !== props.locations.length) {
             this.closeInfoWindow();
             this.updateMarkers(props.locations);
             this.setState({activeMarker: null});

             return;
         }

         if (!props.selectedIndex || (this.state.activeMarker &&
             (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
             this.closeInfoWindow();
         }

         if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
             return;
         };
         this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
     }

closeInfoWindow = () => {
  this.state.activeMarker && this
    .state
    .activeMarker
    .setAnimation(null);
  this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
}
getRestaurantInfo = (props, data) => {
  return data
    .response
    .venues
    .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
}
//Sets infowindow specifications
onMarkerClick = (props, marker, e) => {
  this.closeInfoWindow();
  let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
  let headers = new Headers();
  let request = new Request(url, {
    method: 'GET',
    headers
  });

  let activeMarkerProps;
  fetch(request)
    .then(response => response.json())
    .then(result => {

      let restaurant = this.getRestaurantInfo(props, result);
      activeMarkerProps = {
        ...props,
        foursquare: restaurant[0]
      };

      if (activeMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
          fetch(url)
              .then(response => response.json())
              .then(result => {
                  activeMarkerProps = {
                      ...activeMarkerProps,
                      images: result.response.photos
                  };
                  if (this.state.activeMarker)
                      this.state.activeMarker.setAnimation(null);
                  marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                  this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
              })
      } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
      }
  })
}

//Sets markers and their specs
updateMarkers = (locations) => {
  if (!locations)
    return;

  this
    .state
    .markers
    .forEach(marker => marker.setMap(null));

  let markerProps = [];
  let markers = locations.map((location, index) => {
    let individualMarkerProps = {
      key:index,
      index,
      name: location.name,
      street: location.street,
      city: location.city,
      state: location.state,
      zip: location.zip,
      position: location.pos,
      url: location.url
    };
    markerProps.push(individualMarkerProps);
    let animation = this.props.google.maps.Animation.DROP;
    let marker = new this.props.google.maps.Marker({
      position: location.pos,
      map: this.state.map,
      animation
    });
    marker.addListener('click', () => {
      this.onMarkerClick(individualMarkerProps, marker, null);
    });
    return marker;
  })
  this.setState({markers, markerProps});
}
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    let activeProps = this.state.activeMarkerProps;
    return (
      <Map
      role="application"
      aria-label="map"
      google={this.props.google}
      onReady={this.mapReady}
      zoom={this.props.zoom}
      style={mapStyles}
      initialCenter={{
        lat: 42.8864,
        lng: -78.8784
      }}
      onClick={this.closeInfoWindow}>
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.closeInfoWindow}>
              <div>
                  <h3>{activeProps && activeProps.name}</h3>
                  <p>{activeProps && activeProps.street} </p>
                  <p> {activeProps && activeProps.city}, {activeProps && activeProps.state} </p>
                  <p> {activeProps && activeProps.zip} </p>
                  {activeProps && activeProps.url
                      ? (
                          <a href={activeProps.url}>See website</a>
                      )
                      : ""}
                  {activeProps && activeProps.images
                      ? (
                          <div><img
                              alt={activeProps.name + "  picture"}
                              src={activeProps.images.items[0].prefix + "100x100" + activeProps.images.items[0].suffix}/>
                              <p>Image courtesy of Foursquare</p>
                          </div>
                      )
                      : ""
                  }
              </div>
          </InfoWindow>
      </Map>
  )
}
}

export default GoogleApiWrapper({

  apiKey: API_KEY, LoadingContainer:NoMap
})(MapContainer);
