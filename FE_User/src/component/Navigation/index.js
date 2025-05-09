import { CiSearch, CiShoppingCart, CiUser} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import logoImage from '../../assets/img/LOGO.png';
import axios from 'axios';

const Navigation = ({ setProducts, setFilteredProducts, setSelectedCategory, searchTerm, setSearchTerm, handleSearch }) => {
  const navigate = useNavigate(); // HÀM ĐIỀU HƯỚNG.

  return (
    <nav className="navigation">

      {/* LOGO - NÚT HOME. */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>


      {/* THANH TÌM KIẾM. */}
      <div className="search-bar">
        <div className="search-icon"><CiSearch size={24} /></div>
        <input
          type="text"
          className="search-input"
          placeholder="Hãy nhập thông tin sản phẩm mong muốn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onKeyDown={handleSearchKeyDown}
        />
        <button className="search-button" onClick={() => handleSearch(searchTerm)}>Tìm kiếm</button>
      </div>


      {/* GIỎ HÀNG - AVATAR. */}
      <div className="trailing-icons">
        <div className="icon-btn" onClick={() => navigate("/cart")}><CiShoppingCart size={28} className="bold-icon" /></div>
        <div className="icon-btn" onClick={() => navigate("/profile")}><CiUser size={28} className="bold-icon" /></div>
      </div>
    </nav>
  );
};

export default Navigation;