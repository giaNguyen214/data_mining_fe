import { CiSearch, CiShoppingCart, CiUser} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import logoImage from '../../assets/img/LOGO.png';
import axios from 'axios';

const Navigation = ({ setProducts, setFilteredProducts, setSelectedCategory }) => {
  const navigate = useNavigate(); // HÀM ĐIỀU HƯỚNG.
  const [searchTerm, setSearchTerm] = useState(""); {/* HÀM XỬ LÝ Ô TÌM KIẾM. */}

  const handleSearch = async (keyword) => {
    try {
      const res = await axios.get('http://localhost:3001/users/search', {
        params: { query: keyword },
      });
      const data = res.data;

      if (data && data.products) {
        setProducts(data.products);
      }
      else {
        const fakeProducts = [
          {
            product_brand: "Test Brand",
            product_id: 999001,
            product_image: "https://via.placeholder.com/280x280?text=Fake+Book+1",
            product_name: "Cuốn Sách Bí Ẩn Không Tồn Tại - Tác giả Ảo",
            product_price: 123000,
            product_type: "Sách Ảo"
          },
          {
            product_brand: "Fake Wear",
            product_id: 999002,
            product_image: "https://via.placeholder.com/280x280?text=Fake+Glasses",
            product_name: "Kính Ảo Chống Ánh Sáng Mặt Trăng",
            product_price: 99000,
            product_type: "Phụ kiện Ảo"
          },
          {
            product_brand: "Dream Co.",
            product_id: 999003,
            product_image: "https://via.placeholder.com/280x280?text=Fake+Hat",
            product_name: "Nón Lưỡi Trai Bay Lên Trời",
            product_price: 45000,
            product_type: "Phụ kiện Ảo"
          }
        ];
        setProducts(fakeProducts);
      }
    } catch (error) {
      console.error("Search error:", error);
      const fallbackFakeProducts = [
        {
          product_brand: "Emergency Brand",
          product_id: 999004,
          product_image: "https://via.placeholder.com/280x280?text=Error+Fallback",
          product_name: "Sản phẩm dự phòng khi lỗi API",
          product_price: 111000,
          product_type: "Khẩn cấp"
        }
      ];
      setProducts(fallbackFakeProducts);
    }
    navigate('/');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

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
          onKeyDown={handleSearchKeyDown}
        />
        <button onClick={() => handleSearch(searchTerm)}>Tìm kiếm</button>
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