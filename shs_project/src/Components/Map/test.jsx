import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet for direct control
import 'leaflet/dist/leaflet.css';
import './Map.css';

const center = [40.63463151377654, -97.89969605983609];

// Map to store assigned colors
const featureColors = new Map();

// Function to generate a random color
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to assign colors uniquely, with default grey for null or undefined names
const getColor = (id) => {
  if (!id) {
    return '#808080'; // Default grey color for null or undefined IDs
  }
  if (!featureColors.has(id)) {
    featureColors.set(id, generateRandomColor());
  }
  return featureColors.get(id);
};

// Function to style each GeoJSON feature
const styleFeature = (feature) => ({
  fillColor: getColor(feature.properties?.NAME || feature.id), // Use grey for null/undefined NAME
  weight: 1,
  opacity: 1,
  color: 'white',
  fillOpacity: 0.7,
});

const onEachFeature = (feature, layer) => {
  const name = feature.properties?.NAME || 'No empire existed in this location during this time.';

  // Create a popup element
  const popupContent = <strong>${name}</strong>;
  const popup = L.popup({
    offset: [0, -10], // Adjust offset to align better with mouse position
    closeButton: false, // Hide the close button
    autoPan: false, // Prevent auto-panning to the popup
  });

  // Bind hover events
  layer.on({
    mouseover: (e) => {
      popup.setLatLng(e.latlng).setContent(popupContent).openOn(e.target._map); // Attach popup to map
    },
    mouseout: () => {
      e.target._map.closePopup(); // Close the popup when the cursor leaves
    },
  });
};

export default function App({ data }) {
  useEffect(() => {
    // Debugging line to see when data changes
    console.log('Data updated:', data);
  }, [data]);

  return (
    <MapContainer center={center} zoom={2} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        url="https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg"
        attribution='Map tiles by <a href="https://stamen.com/">Stamen Design</a>, <a href="https://openstreetmap.org/">OpenStreetMap</a>'
      />
      {data && <GeoJSON data={data} style={styleFeature} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
}