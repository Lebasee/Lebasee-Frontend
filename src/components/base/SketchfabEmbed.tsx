import React from "react";

const SketchfabEmbed: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        title=""
        src="https://sketchfab.com/models/278d5d98c5f1471e81596e5d14e2a31e/embed"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen // Replaces mozallowfullscreen and webkitallowfullscreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default SketchfabEmbed;