import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './customer.css'
import {BsFillCartCheckFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Cart from "./Cart";

function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search`);
    // perform search functionality
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    navigate(`/${event.target.value}`);
    // perform category functionality
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="customer-page">
      <div className="customer-page__filters">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
          <option value="category4">Category 4</option>
          <option value="category5">Category 5</option>
        </select>
        <div className="customer-page__filters__search">
          <form onSubmit={handleSearch}>
            <div className="customer-page__filters__search-input">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <i className="fa fa-check customer-page__filters__search-icon"></i>
            </div>
          </form>
        </div>
      </div>
      <div className="cart">
        customer cart
        <Link to="/cart"><BsFillCartCheckFill /></Link>
        
      </div>
      {/* more basic functionalities */}
    </div>
  );
}

export default CustomerPage;
