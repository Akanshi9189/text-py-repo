import React from "react";
import "./LandingPage.css";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="content">
        <h2>Join millions of people already taking control of their meds</h2>
        <button onClick={onGetStarted}>GET STARTED</button>
        <p>
          Already have an account? <span onClick={onGetStarted}>Log In</span>
        </p>
        <small>
          By proceeding, you agree to our <b>Terms</b> and that you have read our <b>Privacy Policy</b>.
        </small>
      </div>
    </div>
  );
};

export default LandingPage;
