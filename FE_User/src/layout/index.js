import { Outlet } from "react-router-dom";
import Navigation from "../component/Navigation";
import "./Layout.css";
import Footer from "../component/Footer";

const Layout = () => {
    return (
        <div className="layout-container">
            <Navigation />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;