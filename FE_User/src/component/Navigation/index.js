import { CiSearch, CiShoppingCart, CiUser} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import logoImage from '../../assets/img/LOGO.png';


const Navigation = ({ setProducts, setFilteredProducts, setSelectedCategory }) => {
  const navigate = useNavigate(); // HÀM ĐIỀU HƯỚNG.
  
  const [searchTerm, setSearchTerm] = useState("");
  console.log (searchTerm);
  



  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
        console.log(searchTerm);
        // const res = await fetch(`https://ea46-2403-e200-16d-c177-a50a-6fef-b48d-afd9.ngrok-free.app/users/search?query=${encodeURIComponent(`"${searchTerm}"`)}`);
        const res = await fetch(`https://ea46-2403-e200-16d-c177-a50a-6fef-b48d-afd9.ngrok-free.app/users/search?query=${encodeURIComponent(`"${searchTerm}"`)}`, {
          method: 'GET',
          // credentials: 'include', // Nếu không dùng cookie/session, bỏ dòng này
          headers: {
            'Content-Type': 'application/json'
          }
        })
      
        console.log("res: ", res)
        


        const raw = await res.text()
        console.log(raw)

        const data = await res.json();
        const top20 = data.slice(0, 20);
        setProducts(top20);
        setFilteredProducts(top20);
        setSelectedCategory(null); 
        window.scrollTo({ top: 500, behavior: "smooth" });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
        <button onClick={handleSearch}>Tìm kiếm</button>
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