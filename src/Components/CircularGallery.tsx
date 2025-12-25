"use client";
import React from "react";
import "./CircularGallery.css";


// Replace with your actual images in /public folder or URLs
const images = [
  "/free-wifi.png",
  "/teamwork.png",
  "/bedroom.png",
  "/placeholder.png",
  "/rupees.png",
  "/cleaning.png"
];

export default function AutoScrollGallery() {
  // Duplicate the images for seamless looping
  const loopedImages = [...images, ...images];

  return (
    <div className="gallery-wrapper">
      <div className="gallery-track">
        {loopedImages.map((src, index) => (
          <div key={index} className="gallery-card">
            <img src={src} style={{padding: "20px",}} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
