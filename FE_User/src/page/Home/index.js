import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useOutletContext } from "react-router-dom";
import axios from 'axios';

// BANNER
import banner1 from "../../assets/img/Banner1.png";
import banner2 from "../../assets/img/Banner2.png";
import banner3 from "../../assets/img/Banner3.png";
// CATEGORY
import category1 from "../../assets/img/cate1.png";
import category3 from "../../assets/img/cate3.png";
import category4 from "../../assets/img/cate4.png";
import category5 from "../../assets/img/cate5.png";
import category7 from "../../assets/img/cate7.png";
import category9 from "../../assets/img/cate9.png";
import category10 from "../../assets/img/cate10.png";
// PRODUCT
import product4 from "../../assets/img/product4.png";
import product3 from "../../assets/img/product3.png";
import product2 from "../../assets/img/product2.png";
import product1 from "../../assets/img/product1.png";


const Home = () => {
    const navigate = useNavigate(); // HÀM ĐIỀU HƯỚNG.
    const [banners, setBanners] = useState([banner1, banner2, banner3]); // HÀM TRẠNG THÁI BANNER.

    const handleCategoryFilter = (categoryName) => {
        setSelectedCategory(categoryName);
        const filtered = products.filter(p => p.category === categoryName);
        setFilteredProducts(filtered);
    };

    const {
        products, setProducts,
        filteredProducts, setFilteredProducts,
        selectedCategory, setSelectedCategory,
        searchTerm, setSearchTerm,
        handleSearch
    } = useOutletContext();
      
    {/* HÀM DANH MỤC. */}
    const categories = [
        { name: "Thời trang nữ", image: category1, link: "/products/thoi-trang-nu" },
        { name: "Giày - Dép nữ", image: category3, link: "/products/giay-nu" },
        { name: "Điện Thoại - Máy Tính Bảng", image: category4, link: "/products/thiet-bi-di-dong" },
        { name: "Phụ kiện thời trang", image: category5, link: "/products/sac-dep" },
        { name: "Thời trang nam", image: category7, link: "/products/thoi-trang-nam" },
        { name: "Giày - Dép nam", image: category9, link: "/products/giay-nam" },
        { name: "Nhà sách Tiki", image: category10, link: "/products/nha-sach-online" },
    ];

    const [page, setPage] = useState(1); // HÀM TRANG TRẠNG THÁI.
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false); //HÀM TRẠNG THÁI NÚT CUỘN LÊN ĐẦU TRANG.


    {/* HÀM FETCH API. */}
    const fetchProducts = async (pageNumber) => {
        setIsLoading(true);
        try {
            const res = await fetch(`https://ea46-2403-e200-16d-c177-a50a-6fef-b48d-afd9.ngrok-free.app/users/sort&page=${pageNumber}`);
            const data = await res.json();
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setProducts(prev => pageNumber === 1 ? data : [...prev, ...data]);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setProducts([]);
        fetchProducts(1);
    }, [searchTerm]);
           

    {/* HÀM HIỆU ỨNG CHO BANNER. */}
    useEffect(() => {
        const interval = setInterval(() => {
            setBanners(([first, second, third]) => [second, third, first]);
        }, 5000);

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight - 100 && !isLoading && hasMore) {
                fetchProducts(page);
            }

            setShowScrollToTop(scrollTop > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            clearInterval(interval);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page, isLoading, hasMore]);
    
    const [leftBanner, rightTop, rightBottom] = banners; // HÀM PHÂN CHIA BANNER.


    return (
        <div className="home-container">

            {/* CÁC BANNER */}
            <div className="banner-container">
                <div className="banner-left" style={{ backgroundImage: `url(${leftBanner})` }}></div>
                <div className="banner-column">
                    <div className="banner-right" style={{ backgroundImage: `url(${rightTop})` }}></div>
                    <div className="banner-right" style={{ backgroundImage: `url(${rightBottom})` }}></div>
                </div>
            </div>

            {/* DANH MỤC SẢN PHẨM */}
            <div className="category-container">
                <div className="category-grid">
                    {categories.map((cate, index) => (
                        <div
                            key={index}
                            className="category-item"
                            onClick={() => handleCategoryFilter(cate.name)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="category-image">
                                <img src={cate.image} alt={cate.name} />
                            </div>
                            <div className="category-name" title={cate.name}>{cate.name}</div>
                        </div>
                    ))}
                </div>
            </div>


            {/* GỢI Ý SẢN PHẨM */}
            <div className="suggestion-container">
                <div className="rectangle3">
                    <div className="suggestion-text">GỢI Ý HÔM NAY</div>
                </div>
            </div>

            {/* NÚT GỌI API KHÁC ĐỂ SẮP XẾP KHÁC */}
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <button className="alt-sort-button" onClick={() => handleSearch(searchTerm)}>
                    🔄 Lựa chọn khác
                </button>
            </div>

     
            {/* DANH SÁCH CÁC SẢN PHẨM */}
            <div className="product-container">
            {products.length > 0 ? (
                <div className="product-grid">
                {products.map(product => (
                    <div key={product.product_id} className="product-item">
                    <div className="product_image">
                        <img src={product.product_image} alt={product.product_name} />
                    </div>
                    <div className="product-name">{product.product_name}</div>
                    <div className="product-price">{product.product_price.toLocaleString()}₫</div>
                </div>
            ))}
            </div>
            ) : (
                <p>Không tìm thấy sản phẩm phù hợp.</p>
            )}
            </div>



            {/* NÚT CUỘN LÊN */}
            {showScrollToTop && (
                <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    ⬆️ Về đầu trang
                </button>
            )}
        </div>
    );
};

export default Home;