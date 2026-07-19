import React from "react";
import buildingSketch from "../assets/building-sketch.png";

/**
 * Renders the school's real hand-drawn building illustration.
 * Kept as its own component (same name/props as before) so Home.jsx
 * doesn't need to change how it's used.
 */
export default function BuildingSketch({ className = "" }) {
  return (
    <img
      src={buildingSketch}
      alt="Illustrated sketch of the school building"
      className={`building-sketch ${className}`}
    />
  );
}