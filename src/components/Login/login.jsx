import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import { useSession } from "../../context/SessionContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const { setToken } = useSession();
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,roomId}),
      });

      const data = await response.json();
      if (response.ok) {
        //alert(data.message);
        try {
          setToken(data.token); 
        } catch (error) {
          console.error("Error setting token in context:", error);
          alert("Error setting token in context");
        }

        navigate(`/dashboard/${roomId}`);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Login failed");
    }
  };

  const generateroomId = () => {
  
    const uniqueroomId = uuidv4();
    setRoomId(uniqueroomId); 
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomId">Code</label>
          <input
            type="text"
            id="roomId"
            placeholder="Generated unique roomId"
            value={roomId} // Bind input value to the state
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={generateroomId}>
            Generate Code
          </button>
          <span> </span>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
