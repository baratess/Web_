import PropTypes from "prop-types";

const ReviewItem = ({ reviewItem }) => {
  const { review, user } = reviewItem;
  const { text, createdAt, rating } = review;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(createdAt).toLocaleDateString(
    "tr-TR",
    options
  );

  return (
    <li className="comment-item">
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: rating }, (_, index) => (
            <li key={`filled-${index}`}>
              <i className="bi bi-star-fill"></i>
            </li>
          ))}
          {Array.from({ length: 5 - rating }, (_, index) => (
            <li key={`empty-${index}`}>
              <i className="bi bi-star"></i>
            </li>
          ))}
        </ul>
        <div className="comment-meta">
          <strong> {user.username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  reviewItem: PropTypes.object,
};
