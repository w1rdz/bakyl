import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import io from 'socket.io-client';

import Navigation from '../navigation/Navigation';
import "./style.css"
import gazel from '../img/bakyl.png';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapWithMarkers = () => {
    const [cars, setCars] = useState([]);
    const [notif, setNotif] = useState([]);
    const [socket, setSocket] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:2000/", {
            reconnectionAttempts: 5,
            timeout: 10000,
        });

        socket.on('GET_CARS', (data) => {
            setCars(data);
        });

        socket.on('GET_NOTIFICATIONS', (data) => {
            setNotif(data);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setCoordinates(prevCoordinates => [...prevCoordinates, ...cars.map(car => ({ lng: parseFloat(car.lng), lat: parseFloat(car.lat) }))]);
    }, [cars]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGRkZGRkYW55YSIsImEiOiJjbHZpMG5xMjIwajNzMnZxb2FrbW1wMnh4In0.HCL8keo5WFgvJw5UcyY_9Q';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [76.9567793, 52.2498683],
            zoom: 12
        });

        if (!map) return;
        
        // Создаем маркеры для каждой машины
        coordinates.forEach((coordinate) => {
            const newMarker = document.createElement('div');
            newMarker.className = 'custom-marker';
            newMarker.style.backgroundImage =  `url(${gazel})`;
            newMarker.style.width = '40px';
            newMarker.style.height = '40px';
            const marker = new mapboxgl.Marker(newMarker)
                .setLngLat([coordinate.lng, coordinate.lat])
                .addTo(map);
        });

        return () => {
            map.remove();
        };
    }, [coordinates]);

    return (
      <div className="">  <div className="absolute top-0 bottom-0 w-full h-screen overflow-hidden">
      <Navigation />
    
      <div id="map" className="absolute top-16 bottom-0 w-full h-full overflow-hidden" />
  </div></div>
    
    );
};

export default MapWithMarkers;
