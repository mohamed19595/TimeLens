import * as React from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useSelector } from "react-redux";


// Map to store assigned colors
const featureColors = new Map();

// Function to generate a random color
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to assign colors uniquely, with default grey for null or undefined names
const getColor = (id) => {
  if (!id) {
    return "#808080"; // Default grey color for null or undefined IDs
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
  color: "white",
  fillOpacity: 0.7,
});

export default function App({ data }) {
  const time = useSelector((state) => state.time.value);
  const videoFeedUrl = "http://127.0.0.1:5000/video_feed";
  const cursorPosition = useRef({ lat: 0, lng: 0 });

  const onEachFeature = (feature, layer) => {
    const name =
      feature.properties?.NAME ||
      "No empire existed in this location during this time.";

    let popupContent = `
      <strong> ${name}</strong><br/>
      <span class="loader"></span>
    `;

    // Bind the initial popup
    layer.bindPopup(popupContent);

    // Add mousemove event to capture cursor position
    layer.on("mousemove", (event) => {
      cursorPosition.current = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      };
    });

    // Trigger fetch only on popup open (optional)
    layer.on("popupopen", () => {
      const postData = {
        lat: cursorPosition.current.lat,
        lng: cursorPosition.current.lng,
        time: time,
      };

      fetch("http://127.0.0.1:5000/setup_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send POST data");
          }
          return response.json(); // Optional if backend returns something
        })
        .then(() => {
          const popupContent = `
            <strong> ${name}</strong><br/>
            <div style="position: relative; width: 100%; height: 300px;">
              <span class="loader" 
                    style="position: absolute; top: 40%; left: 40%; transform: translate(-50%, -50%); z-index: 1;">
              </span>
              <iframe id="videoFrame" 
                      src="${videoFeedUrl}" 
                      style="width: 100%; height: 100%; border: none; display: none;" 
                      allow="autoplay">
              </iframe>
            </div>
          `;

          layer.getPopup().setContent(popupContent);

          // Get reference to the iframe and loader
          const iframe = document.getElementById("videoFrame");
          const loader = iframe.previousElementSibling; // This refers to the loader span

          // Simulate iframe loading state
          setTimeout(() => {
            iframe.style.display = "block"; // Show the iframe
            loader.style.display = "none"; // Hide the loader
          }, 15000); // Adjust 3000ms (3 seconds) if you expect a longer or shorter load time
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
          popupContent = `
            <strong> ${name}</strong><br/>
            <p>Failed to initialize the video feed.</p>
          `;
          layer.getPopup().setContent(popupContent);
        });
    });
  };

  return (
    <>
      <MapContainer
        center={[25, 0]}
        zoom={2}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg" />
        <GeoJSON
          data={data}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </>
  );
}