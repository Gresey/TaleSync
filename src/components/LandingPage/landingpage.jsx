import React, { useState } from "react";
import "./landingpage.css";
import LoginForm from "../Login/login";
import SignUpForm from "../Login/signup";

const LandingPage = () => {
  const [view, setView] = useState("login"); 

  const handleLoginClick = () => {
    setView("login");
  };

  const handleSignUpClick = () => {
    setView("signup");
  };

  return (
    <div className="landing-container">
      {/* Left side content */}
      <div className="header-content">
      <h1 style={{ color: 'white' }}>TaleSync</h1>

        <p>A real-time collaborative journaling platform.</p>
        <div className="buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </div>
  
 
      {/* Right side login or sign-up form */}
      <div className="login-container">
        {view === "login" && <LoginForm />}
        {view === "signup" && <SignUpForm />}
      </div>
    </div>
  );
};

export default LandingPage;
