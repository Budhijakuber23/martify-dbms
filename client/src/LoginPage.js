import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (role) {
      case "customer":
        navigate("/loginC");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "analyst":
        navigate("/analyst");
        break;
      default:
        break;
    }
  };

  return (
    <div className="cent">
      <form onSubmit={handleSubmit}>
        
        <label>
          <text className="text"><h3>Select your role : </h3></text>
          <select value={role} onChange={handleRoleChange}>
            <option value="">Login as?</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
          </select>
          <button type="submit" className="btn">Login</button>
        </label>
        <br />
      </form>
    </div>
  );
};

export default LoginPage;
