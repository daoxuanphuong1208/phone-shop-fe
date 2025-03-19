import classNames from "classnames/bind";
import styles from "./News.module.scss";

import news_1 from "../../assets/images/news_1.webp";

const cx = classNames.bind(styles);
const News = () => {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("image")} src={news_1} alt="news" />
      <h3 className={cx("title")}>
        Chi tiết dung lượng pin của điện thoại iPhone 15 Series
      </h3>
      <div className={cx("time")}>
        <div>
          Đăng bởi: <span className={cx("author")}>Duy Minh Mobile</span>
        </div>
        <span className={cx("date")}>06/10/2023</span>
      </div>
    </div>
  );
};

export default News;
