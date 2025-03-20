import img_404 from "../../assets/images/eror-404.webp";
import classNames from "classnames/bind";
import styles from "./NotFoundPage.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const cx = classNames.bind(styles);

const NotFoundPage = () => {
  return (
    <div className={cx("wrapper")}>
      <Breadcrumb />
      <div className={cx("content")}>
        <div className={cx("title")}>404</div>
        <img src={img_404} alt="404" />
        <span>Chúng tôi không thể tìm thấy trang bạn yêu cầu.</span>
        <button>QUAY LẠI TRANG CHỦ</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
