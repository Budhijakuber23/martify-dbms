import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post("http://localhost:3001/api/loginC", { username, email, password })
      .then((res) => {
        if (res.data === "success") {
          // Store logged-in user's name in local storage
          localStorage.setItem("username", username);
          navigate("/customer");
        } else {
          setError("Authentication failed");
        }
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };
  
  

  return (
    <div style={{ backgroundColor: "beige", color: "chocolate", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }} /><br /><br />
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }} /><br /><br />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }} /><br /><br />
        <button type="submit" style={{ backgroundColor: "chocolate", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px" }}>Login</button>
        <button type="button" onClick={() => navigate("/sign-up")} style={{ backgroundColor: "chocolate", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Sign up</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default LoginC;
