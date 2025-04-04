import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Signup.css";

const Signup = ({ onBack, onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(""); // New state for age
  const [gender, setGender] = useState(""); // New state for gender
  const [error, setError] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false); // To track if the age/gender form is completed

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save the user's email, username, age, and gender to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        age,
        gender,
      });
      alert("Signup successful! Redirecting...");
      onSignupSuccess();
    } catch (err) {
      setError("Signup failed! " + err.message);
    }
  };

  const handleAgeGenderSubmit = () => {
    if (!age || !gender) {
      setError("Please fill out both age and gender.");
      return;
    }
    setIsFormComplete(true);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {!isFormComplete ? (
        // Form to collect username, email, password, confirm password
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      ) : (
        // Form to collect age and gender after signup
        <div className="age-gender-form">
          <h3>Please provide your age and gender</h3>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button className="signup-btn" onClick={handleAgeGenderSubmit}>Submit</button>
        </div>
      )}
      <button className="back-btn" onClick={onBack}>Back</button>
    </div>
  );
};

export default Signup;
