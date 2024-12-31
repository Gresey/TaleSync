import React from "react";
import "./login.css";

const LoginForm = () => {
  const handleGenerateCode = () => {
    // Logic to generate a code can go here
    console.log("Generate Code button clicked");
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input type="text" id="code" placeholder="Enter the code" />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleGenerateCode}>
            Generate Code
          </button>
          <span>   </span>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
