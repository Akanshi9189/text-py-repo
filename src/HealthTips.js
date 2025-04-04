import React from "react";
import "./HealthTips.css";

const HealthTips = ({ onBack }) => {
  return (
    <div className="health-tips-container">
      <h3>Health Tips</h3>
      <ul>
        <li>Stay hydrated by drinking at least 8 glasses of water daily.</li>
        <li>Exercise regularly to maintain a healthy body.</li>
        <li>Get enough sleep to boost your immune system.</li>
        <li>Eat a balanced diet with plenty of fruits and vegetables.</li>
      </ul>
      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default HealthTips;
