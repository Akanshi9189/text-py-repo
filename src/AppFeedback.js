import React, { useState } from "react";
import "./AppFeedback.css"; // Ensure you have this CSS file

const AppFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback Submitted!\nRating: ${rating} Stars\nMessage: ${feedback}`);
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="feedback-container">
      <h2>App Feedback</h2>
      <p>Rate your experience:</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? "selected" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="What improvements would you like?"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button className="submit-feedback" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default AppFeedback;
