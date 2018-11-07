import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
      }
      </script>

    );
  }
}

export default Map;
