import classNames from "classnames/bind";
import styles from "./StarRating.module.scss";

const cx = classNames.bind(styles);

const StarRating = ({ rating }) => {
  return (
    <div className={cx("star-rating")}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? cx("star", "filled") : cx("star")}
        >
          ★
        </span>
      ))}
    </div>
  );
};
export default StarRating;
