import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGRkZGRkYW55YSIsImEiOiJjbHZpMG5xMjIwajNzMnZxb2FrbW1wMnh4In0.HCL8keo5WFgvJw5UcyY_9Q';

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

    function successLocation(position) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([-2.24, 53.48]);
    }

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ddddddanya/clvkpsics010801o0f4za4lfj',
        center: center,
        zoom: 15
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });

      map.addControl(directions, 'top-left');
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <div id="map" className="h-full"></div>
    </div>
  );
};

export default Map;
