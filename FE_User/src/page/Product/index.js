import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import ColorPicker from "../../component/ColorPicker";
import Rating from "../../component/Rating";

/* 4 SẢN PHẨM MẪU */
import product1 from "../../assets/img/product1.png";
import product2 from "../../assets/img/product2.png";
import product3 from "../../assets/img/product3.png";
import product4 from "../../assets/img/product4.png";

const productList = {
  1: {
    name: "Áo khoác thể thao",
    image: [product1, product4, product3],
    price: "258.000 VNĐ",
    oldPrice: "400.000 VNĐ",
    sold: 12,
    stock: 30,
    liked: 18,
    shipping: true,
    rating: 4.2,
    description: "Chất liệu thun lạnh, thoáng mát, phù hợp thể thao.",
    store: "Tata_Club"
  },
  2: {
    name: "Giày thể thao",
    image: [product2, product1, product4],
    price: "350.000 VNĐ",
    oldPrice: "500.000 VNĐ",
    sold: 8,
    stock: 50,
    liked: 25,
    shipping: true,
    rating: 4.0,
    description: "Thiết kế năng động, êm ái, chống trượt tốt.",
    store: "Shoes_VN"
  },
  3: {
    name: "Áo thun",
    image: [product3, product2, product1],
    price: "150.000 VNĐ",
    oldPrice: "250.000 VNĐ",
    sold: 23,
    stock: 100,
    liked: 15,
    shipping: true,
    rating: 4.2,
    description: "Áo thun cổ tròn, chất liệu cotton co giãn thoải mái.",
    store: "Tata_Club"
  },
  4: {
    name: "Túi xách",
    image: [product4, product3, product2],
    price: "500.000 VNĐ",
    oldPrice: "750.000 VNĐ",
    sold: 5,
    stock: 20,
    liked: 9,
    shipping: true,
    rating: 4.8,
    description: "Túi thời trang phù hợp đi học, đi chơi.",
    store: "BagZone"
  },
};

const Product = () => {
  const { id } = useParams(); // LẤY ID TỪ URL.
  const [product, setProduct] = useState(null); // LƯU TRỮ DỮ LIỆU SẢN PHẨM TỪ API.
  const [loading, setLoading] = useState(true); // TRẠNG THÁI TẢI DỮ LIỆU.
  const [error, setError] = useState(null); // LỖI NẾU CÓ.
  const [formRq, setFormRq] = useState({color: ""}); // KHỞI TẠO TRẠNG THÁI CHỌN MÀU SẢN PHẨM.
  const [currentIndex, setCurrentIndex] = useState(0); // KHỞI TẠO CHỈ SỐ ẢNH HIỆN TẠI.
  {/* FETCH DỮ LIỆU SẢN PHẨM TỪ API */}
  useEffect(() => {
  const fetchProductData = async () => {
    try {
      const data = productList[id]; // LẤY DỮ LIỆU TỪ DANH SÁCH MẪU
      if (!data) throw new Error("Không tìm thấy sản phẩm mẫu");
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
    fetchProductData();
  }, [id]);

  {/* ĐANG TẢI SẢN PHẨM HOẶC IN RA LỖI KHÔNG CÓ SẢN PHẨM*/}
  if (loading) {
    return <div className="product-detail">Đang tải dữ liệu...</div>;
  }
  if (error) {
    return <div className="product-detail">Lỗi: {error}</div>;
  }

  const thumbnails = product?.image || []; // LẤY MẢNG ẢNH CỦA SẢN PHẨM.

  {/* CẬP NHẬT MÀU SẢN PHẨM TRONG TRẠNG THÁI */}
  const handleChange = (e) => {
    setFormRq(prev => ({
      ...prev,
      color: e.target.value,
    }));
  };

  {/* CHUYỂN ĐẾN ẢNH TIẾP THEO HOẶC QUAY LẠI ẢNH TRƯỚC TRONG MẢNG "thumbnails" */}
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % thumbnails.length);
  };
  const handleBack = () => {
    setCurrentIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length);
  };

  if (!product) {
    return <div className="product-detail">Không tìm thấy sản phẩm.</div>;
  }

  {/* CHUYỂN CHUỖI GIÁ THÀNH SỐ THỰC */}
  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^\d]/g, ""));
  };
  
  {/* TÍNH TỶ LỆ % GIẢM GIÁ GIỮA GIÁ CŨ VÀ GIÁ MỚI */}
  const calculateDiscount = (oldPriceStr, newPriceStr) => {
    const oldPrice = parsePrice(oldPriceStr);
    const newPrice = parsePrice(newPriceStr);
    if (oldPrice && newPrice && oldPrice > newPrice) {
      const discount = ((oldPrice - newPrice) / oldPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };
  
  return (
    <div className="body-bg">

      {/* HÌNH ẢNH SẢN PHẨM */}
      <div className="product-image-2">
        <img src={thumbnails[currentIndex]} alt={`product-${currentIndex}`} />
      </div>

      <div className="thumbnail thumb1" onClick={() => setCurrentIndex(0)}>
        <img src={thumbnails[0]} alt="thumb1" />
      </div>
      <div className="thumbnail thumb2" onClick={() => setCurrentIndex(1)}>
        <img src={thumbnails[1]} alt="thumb2" />
      </div>
      <div className="thumbnail thumb3" onClick={() => setCurrentIndex(2)}>
        <img src={thumbnails[2]} alt="thumb3" />
      </div>

      <div className="btn-next" onClick={handleNext}>
        <div className="icon">▶</div>
      </div>
      <div className="btn-back" onClick={handleBack}>
        <div className="icon rotated">▶</div>
      </div>

      {/* TÊN SẢN PHẨM - GIÁ CẢ */}
      <div className="product-info">
        <div className="title">{product.name}</div>
        <div className="price">{product.price}</div>
        <div className="old-price">{product.oldPrice}</div>
        <div className="discount-rate">({calculateDiscount(product.oldPrice, product.price)}% OFF)</div>
        <div className="line"></div>
      </div>


      {/* THÔNG TIN BÁN HÀNG */}
      <div className="sold"><span style={{ color: '#355F2E', fontStyle: 'italic' }}>Đã bán:</span> {product.sold}</div>
      <div className="stock"><span style={{ color: '#355F2E', fontStyle: 'italic' }}>Hiện có:</span> {product.stock}</div>
      <div className="likes"><span style={{ color: '#355F2E', fontStyle: 'italic' }}>Số lượng yêu thích:</span> {product.liked}</div>
      <div className="shipping">{product.shipping ? "Có hỗ trợ giao hàng!" : "Không hỗ trợ giao hàng"}</div>
      <div className="store-label">
        <svg className="shopping-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7 4V2h10v2h3a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3zM7 5V4h10v1h3v14H4V5h3zM7 6h10v14H7V6z"></path>
        </svg>
      </div>
      <div className="store-name"><span style={{ color: '#355F2E', fontStyle: 'italic' }}>Cửa hàng:</span> {product.store}</div>
     

      {/* THÔNG TIN SẢN PHẨM */}
      <div className="line-2"></div>
      <div className="container--3p__component--field">
        <ColorPicker selectedColor={formRq.color} handleChange={handleChange}/>
      </div>
      <div className="product-extra-info">
        <div className="extra-item"><span style={{ color: '#355F2E'}}>Thương hiệu:</span> {product.brand || "Chưa cập nhật"}</div>
        <div className="extra-item"><span style={{ color: '#355F2E'}}>Trạng thái:</span> {product.status || "Còn hàng"}</div>
        <div className="extra-item"><span style={{ color: '#355F2E'}}>Quà tặng kèm:</span> {product.gift || "Không có"}</div>
        <div className="extra-item"><span style={{ color: '#355F2E'}}>Gói khuyến mãi:</span> {product.promotion || "Không có"}</div>
        <div className="extra-item"><span style={{ color: '#355F2E'}}>Thông tin quảng cáo:</span> {product.ads || "Không có"}</div>
      </div>


      {/* THÊM GIỎ HÀNG */}
      <div className="add-to-cart">Thêm giỏ hàng</div>


      {/* ĐÁNH GIÁ */}
      <div className="line-3"></div>
      <div className="rating-section">
        <Rating />
      </div>
    </div>
  );
};

export default Product;