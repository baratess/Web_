import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const ReviewForm = ({ singleProduct, setSingleProduct }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem("user"); // `user` sadece ID olmalı
        if (!userId) {
          message.error("Kullanıcı ID'si bulunamadı.");
          return;
        }

        const response = await fetch(`${apiUrl}/api/users`);
        if (!response.ok) {
          message.error("Kullanıcı bilgileri alınamadı.");
          return;
        }

        const users = await response.json();
        const currentUser = users.find((user) => user._id === userId);

        if (currentUser) {
          setUserInfo(currentUser);
        } else {
          message.error("Kullanıcı bulunamadı.");
        }
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu.");
      }
    };

    fetchUserInfo();
  }, [apiUrl]);

  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      return message.warning("Puan seçiniz!");
    }

    if (!userInfo) {
      return message.error("Kullanıcı bilgileri geçersiz.");
    }

    const formData = {
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          rating: parseInt(rating),
          user: userInfo._id,
        },
      ],
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/products/${singleProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        message.error("Bir şeyler yanlış gitti.");
        return;
      }

      const data = await response.json();
      setSingleProduct(data);
      setReview("");
      setRating(0);
      message.success("Yorum başarıyla eklendi.");
    } catch (error) {
      console.log(error);
      message.error("Bir şeyler yanlış gitti.");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <a
              key={star}
              href="#"
              className={`star ${rating === star && "active"}`}
              onClick={(e) => handleRatingChange(e, star)}
            >
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`bi bi-star${i < star ? "-fill" : ""}`}
                ></i>
              ))}
            </a>
          ))}
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          required
        ></textarea>
      </div>
      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  singleProduct: PropTypes.object.isRequired,
  setSingleProduct: PropTypes.func.isRequired,
};

export default ReviewForm;
