import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './cat1.css'

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      axios.get(`http://localhost:3001/api/users/${username}`)
        .then((response) => {
          setUser(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [username]);
  
    return (
      <div>
        <nav>
        <ul>
          <li><a href="/customer">Home</a></li>
          <li><a href={`/profile/${username}`}>Profile</a></li>
          <li><a href="/cart">My Cart</a></li>
        </ul>
      </nav>
        {user && (
          <div>
            <h1>{user.Name}'s Profile</h1>
            <h5 style={{ color: 'black', margin:'20px' }}>Name: {user.Name}</h5>
            <h5 style={{ color: 'black', margin:'20px' }}>Email: {user.Email}</h5>
            <h5 style={{ color: 'black', margin:'20px' }}>Address: {user.Address}</h5>
            {/* Add more user information here */}
          </div>
        )}
      </div>
    );
  }
  
  export default Profile;
  