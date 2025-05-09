import { Outlet } from "react-router-dom";
import Navigation from "../component/Navigation";
import "./Layout.css";
import Footer from "../component/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (keyword) => {
        // const res = await axios.get('http://localhost:3001/users/search', {
        //     params: { query: keyword },
        // });
        // const data = res.data.sort(() => Math.random() - 0.5);
    
        if (!keyword || keyword.trim() === "") {
            return;
        }

        try {
            const data = null;

            if (data && data.products && false) {
                setProducts(data.products);
            } else {
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
                const shuffledData = fakeProducts.sort(() => Math.random() - 0.5);
                setProducts(shuffledData);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API tìm kiếm:", error);
    
            const fallbackFakeProducts = [
                {
                    product_brand: "Fallback Brand",
                    product_id: 999005,
                    product_image: "https://via.placeholder.com/280x280?text=Fallback+Product",
                    product_name: "Sản phẩm fallback do lỗi xảy ra",
                    product_price: 99000,
                    product_type: "Khẩn cấp"
                }
            ];
            setProducts(fallbackFakeProducts);
        }
        navigate('/');
    };

    return (
        <div className="layout-container">
            <Navigation 
                setProducts={setProducts}
                setFilteredProducts={setFilteredProducts}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            <main className="main-content">
                <Outlet context={{ products, setProducts, filteredProducts, setFilteredProducts, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, handleSearch }}/>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;