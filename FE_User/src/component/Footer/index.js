import React from "react";
import "./Footer.css";
import logoImage from "../../assets/img/LOGO.png";
import globeIcon from "../../assets/img/globe.png";
import phoneIcon from "../../assets/img/phone.png";
import mailIcon from "../../assets/img/mail.png";


const Footer = () => {
  return (
    <div className="footer" >

      {/* HỖ TRỢ KHÁCH HÀNG */}
      <div className="footer-section">
        <h3>HỖ TRỢ KHÁCH HÀNG</h3>
        <ul>
          <li><a href="/huong-dan-mua-hang">Hướng dẫn mua hàng</a></li>
          <li><a href="/thanh-toan">Thanh toán</a></li>
          <li><a href="/quy-trinh-xu-ly">Quy trình xử lý</a></li>
        </ul>
      </div>


      {/* CÔNG TY */}
      <div className="footer-section-2">
        <h3>CÔNG TY</h3>
        <ul>
          <li><a href="/dieu-khoan">Điều khoản</a></li>
          <li><a href="/chinh-sach">Chính sách</a></li>
          <li><a href="/trach-nhiem">Trách nhiệm</a></li>
        </ul>
      </div>
      

      {/* LOGO */}
      <div className="footer-logo-wrapper">
        <img src={logoImage} alt="Logo" className="footer-logo" />
      </div>


      {/* CONTACT */}
      <div className="footer-contact">
        <a href="https://uniso.vn" className="footer-contact-item" target="_blank" rel="noopener noreferrer">
            <img src={globeIcon} alt="Globe" />
            <span>https://uniso.vn</span>
        </a>
        
        <a href="tel:19896067" className="footer-contact-item">
            <img src={phoneIcon} alt="Phone" />
            <span>1989 6067 (Hotline)</span>
        </a>
        
        <a href="mailto:uniso@gmail.com" className="footer-contact-item">
            <img src={mailIcon} alt="Mail" />
            <span>uniso@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;