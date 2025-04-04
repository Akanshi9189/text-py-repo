import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./Login.css";

const Login = ({ onLoginSuccess, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      onLoginSuccess(); // Redirect to questionnaire
    } catch (error) {
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Welcome back!</h2>  {/* Added this line for the welcome message */}
        <h3>Login</h3> {/* Existing login heading */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>👁️</span>
        </div>
        <button onClick={handleLogin}>Submit</button>
        <button onClick={onSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
