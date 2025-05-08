import { Outlet } from "react-router-dom";
import Navigation from "../component/Navigation";
import "./Layout.css";
import Footer from "../component/Footer";
import { useState } from "react";

const Layout = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="layout-container">
            <Navigation 
                setProducts={setProducts}
                setFilteredProducts={setFilteredProducts}
                setSelectedCategory={setSelectedCategory}
            />
            <main className="main-content">
                <Outlet context={{ products, setProducts, filteredProducts, setFilteredProducts, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }}/>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;