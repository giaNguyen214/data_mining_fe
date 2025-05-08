import React, { useState, useEffect } from 'react'; 
import './Rating.css';
import { useParams } from 'react-router-dom';


/* DANH SÁCH 10 MẪU ĐÁNH GIÁ. */
const sampleReviews = [
  { name: 'abc', rating: 4, time: '30/04/2025 12:57:00', content: 'Sản phẩm đẹp, đúng mô tả!' },
  { name: 'xyz', rating: 5, time: '01/05/2025 09:12:00', content: 'Rất hài lòng, sẽ mua tiếp.' },
  { name: 'linh', rating: 4, time: '02/05/2025 15:30:00', content: 'Đóng gói đẹp, chất lượng ổn.' },
  { name: 'an', rating: 4, time: '03/05/2025 08:45:00', content: 'Giá hợp lý, giao hàng nhanh.' },
  { name: 'mai', rating: 4, time: '04/05/2025 11:20:00', content: 'Màu sắc giống hình, rất thích!' },
  { name: 'hung', rating: 5, time: '05/05/2025 10:10:00', content: 'Tốt hơn mong đợi!' },
  { name: 'ngoc', rating: 3, time: '06/05/2025 14:40:00', content: 'Ổn nhưng giao hàng hơi lâu.' },
  { name: 'khoa', rating: 5, time: '07/05/2025 08:00:00', content: 'Dịch vụ tuyệt vời!' },
  { name: 'anh', rating: 4, time: '08/05/2025 13:15:00', content: 'Chất lượng như mô tả.' },
  { name: 'phuong', rating: 5, time: '09/05/2025 09:30:00', content: 'Sẽ giới thiệu bạn bè.' },
];

const Rating = () => {
  const { id } = useParams(); // LẤY ID SẢN PHẨM TỪ URL.
  const [reviews, setReviews] = useState(sampleReviews); // DANH SÁCH ĐÁNH GIÁ.
  const [visibleCount, setVisibleCount] = useState(5); // SỐ LƯỢNG HIỂN THỊ BAN ĐẦU.
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // {/* FETCH API ĐỂ LẤY RATING. */}
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await fetch(`https://api.example.com/products/${id}/reviews`);
  //       if (!response.ok) {
  //         throw new Error('Không thể tải đánh giá');
  //       }
  //       const data = await response.json();
  //       setReviews(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchReviews();
  // }, [id]);  

  {/* HÀM TÍNH TRUNG BÌNH SỐ SAO. */}
  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  {/* HÀM CUỘN TRANG. */}
  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
    if (bottom && visibleCount < reviews.length) {
      setVisibleCount(prev => Math.min(prev + 5, reviews.length));
    }
  };

  {/* CÀI ĐẶT VÀ DỌN DẸP SCROLL. */}
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  // if (loading) return <div className="rating-wrapper">Đang tải đánh giá...</div>;
  // if (error) return <div className="rating-wrapper">Lỗi: {error}</div>;


  return (
    <div className="rating-wrapper">

      {/* TỔNG HỢP ĐÁNH GIÁ */}
      <div className="rating-title">ĐÁNH GIÁ</div>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={i <= Math.round(averageRating) ? 'star-filled' : 'star-empty'}>
            {i <= Math.round(averageRating) ? '★' : '☆'}
          </span>
        ))}
      </div>
      <div className="rating-score">{averageRating}/5.0</div>
      <div className="rating-count">({reviews.length} đánh giá)</div>


      {/* MỖI ĐÁNH GIÁ */}
      {reviews.slice(0, visibleCount).map((review, index) => (
        <div className="review-card" key={index}>
          <div className="avatar"></div>
          <div className="review-name">{review.name}</div>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={i <= review.rating ? 'star-small-filled' : 'star-small-empty'} >
                {i <= review.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
          <div className="review-time">{review.time}</div>
          <div className="review-content">{review.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Rating;