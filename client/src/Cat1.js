import React, { useState, useEffect } from "react";
import axios from "axios";
import './cat1.css'

function Cat1() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    // Retrieve logged-in user's name from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    if (isq1) {
      const url = searchInput ? `http://localhost:3001/api/cat1?search=${searchInput}` : "http://localhost:3001/api/cat1";
      axios
        .get(url)
        .then((response) => {
          setq1List(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isq1, searchInput]);

  const fnq1 = () => {
    setIsq1(!isq1);
  };

  const addToCart = (productId, quantity) => {
    axios.post("http://localhost:3001/api/cart", {
      product_id: productId,
      quantity: quantity,
      price: q1List.find((product) => product.Product_id === productId).Price,
      name: q1List.find((product) => product.Product_id === productId).Name
    })
    .then((response) => {
      console.log(response);
      alert(`Added ${quantity} of product ${productId} to cart`);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const url = searchInput ? `http://localhost:3001/api/cat1?search=${searchInput}` : "http://localhost:3001/api/cat1";
    axios
      .get(url)
      .then((response) => {
        setq1List(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/customer">Home</a></li>
          <li><a href={`/profile/${username}`}>Profile</a></li>
          <li><a href="/cart">My Cart</a></li>
        </ul>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="text" placeholder="Search products" value={searchInput} onChange={handleSearchInputChange} />
          {/* <button type="button" onClick={handleSearch}>Search</button> */}
          {/* <button onClick={() => { window.location.href = "/cart" }}>View Cart</button> */}
        </form>
      </nav>
      <button id="my-button" type="submit" onClick={fnq1}>
        {isq1 ? "Hide q1" : "Show q1"}
      </button>
      {isq1 && (
        <div className="catalog-container">
          {q1List.map((val) => {
            return (
              <div key={val.Product_id} className="product-card">
                <div className="product-name">{val.Name}</div>
                <div className="product-id">Product ID: {val.Product_id}</div>
                <div className="product-price">Price: {val.Price}</div>
                <div>
                  <label htmlFor={`quantity-${val.Product_id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${val.Product_id}`}
                    name={`quantity-${val.Product_id}`}
                    min="1"
                  />
                  <button onClick={() => addToCart(val.Product_id, document.getElementById(`quantity-${val.Product_id}`).value)}>Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cat1;
