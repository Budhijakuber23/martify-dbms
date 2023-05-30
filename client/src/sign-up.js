import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/sign-up", { username, email, password, address })
      .then((res) => {
        if (res.data === "success") {
          navigate("/loginC");
        } else {
          setError("Sign up failed");
        }
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  return (
    <div style={{ backgroundColor: "beige", color: "chocolate", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }}
        /><br /><br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }}
        /><br /><br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }}
        /><br /><br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ backgroundColor: "cream", color: "chocolate", padding: "5px", borderRadius: "5px", border: "none", marginBottom: "10px" }}
        /><br /><br />
        <button type="submit" style={{ backgroundColor: "chocolate", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Sign Up</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default SignUp;
