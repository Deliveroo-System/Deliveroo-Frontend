// src/pages/DriverTracking.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import '../components/DriverAuth.css'; // Fix the import path

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


// Fix for default marker icons in Leaflet
/*delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), 
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
}); 

*/


// Predefined routes for different areas in Colombo
const routes = {
  malabe: [
    [6.9097, 79.9644], // Starting point
    [6.9150, 79.9572],
    [6.9200, 79.9500],
    [6.9250, 79.9450], // Destination
  ],
  athurugiriya: [
    [6.8631, 79.9772],
    [6.8680, 79.9720],
    [6.8730, 79.9670],
    [6.8780, 79.9620],
  ],
  kaduwela: [
    [6.9357, 79.9857],
    [6.9300, 79.9800],
    [6.9250, 79.9750],
    [6.9200, 79.9700],
  ],
  battaramulla: [
    [6.8964, 79.9181],
    [6.9010, 79.9130],
    [6.9060, 79.9080],
    [6.9110, 79.9030],
  ],
  rajagiriya: [
    [6.9067, 79.8947],
    [6.9110, 79.8990],
    [6.9160, 79.9040],
    [6.9210, 79.9090],
  ],
  borella: [
    [6.9304, 79.8798],
    [6.9250, 79.8840],
    [6.9200, 79.8890],
    [6.9150, 79.8940],
  ],
};

const DriverTracking = () => {
  const [currentLocation, setCurrentLocation] = useState([6.9097, 79.9644]); // Default to Malabe starting point
  const [deliveryArea, setDeliveryArea] = useState('malabe');
  const [progress, setProgress] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    // Simulate driver movement
    const interval = setInterval(() => {
      if (progress < routes[deliveryArea].length - 1) {
        setProgress(prev => prev + 1);
        setCurrentLocation(routes[deliveryArea][progress]);
      } else {
        setIsDelivered(true);
        clearInterval(interval);
      }
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [progress, deliveryArea]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Track Your Delivery</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label>Select Delivery Area: </label>
          <select 
            value={deliveryArea} 
            onChange={(e) => {
              setDeliveryArea(e.target.value);
              setProgress(0);
              setCurrentLocation(routes[e.target.value][0]);
              setIsDelivered(false);
            }}
          >
            {Object.keys(routes).map(area => (
              <option key={area} value={area}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ height: '400px', width: '100%', marginBottom: '20px' }}>
          <MapContainer 
            center={currentLocation} 
            zoom={14} 
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLocation}>
              <Popup>Your delivery is here</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>Delivery Status: {isDelivered ? 'Delivered!' : 'On the way...'}</p>
          <div style={{ 
            width: '100%', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '5px',
            margin: '10px 0'
          }}>
            <div 
              style={{ 
                width: `${(progress / (routes[deliveryArea].length - 1)) * 100}%`, 
                height: '20px', 
                backgroundColor: isDelivered ? '#4CAF50' : '#2196F3',
                borderRadius: '5px',
                transition: 'width 0.5s'
              }}
            ></div>
          </div>
          <p>Progress: {Math.round((progress / (routes[deliveryArea].length - 1)) * 100)}%</p>
        </div>
      </div>
    </div>
  );
};

export default DriverTracking;