import React, { useState } from "react";
import "./UserDetails.css";

const UserDetails = ({ onSubmit }) => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthYear = parseInt(dob.year, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (!gender) {
      alert("Please select your gender.");
      return;
    }

    if (!dob.day || !dob.month || !dob.year) {
      alert("Please enter a valid date of birth.");
      return;
    }

    if (age < 18) {
      alert("You must be at least 18 years old to use Medicine Reminder.");
      return;
    }

    alert("Details submitted successfully!");
    onSubmit();
  };

  return (
    <div className="user-details-container">
      <div className="user-details-content">
        <h2>Personal Information</h2>

        {/* Gender Box */}
        <div className="details-box">
          <h3>Gender</h3>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        {/* DOB Box */}
        <div className="details-box">
          <h3>Date of Birth</h3>
          <div className="dob-fields">
            <input
              type="number"
              placeholder="Day"
              min="1"
              max="31"
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
            />
            <input
              type="number"
              placeholder="Month"
              min="1"
              max="12"
              value={dob.month}
              onChange={(e) => setDob({ ...dob, month: e.target.value })}
            />
            <input
              type="number"
              placeholder="Year"
              min="1900"
              max={new Date().getFullYear()}
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
            />
          </div>
          <p className="age-warning">You must be at least 18 years old to use Medicine Reminder.</p>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default UserDetails;
