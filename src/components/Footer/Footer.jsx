import { FacebookFilled } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-items")}>
        <h2 className={cx("title")}>Thông tin chung</h2>
        <div className={cx("content")}>
          <p>
            Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mạng lại giá
            trị tốt nhất
          </p>
          <div className={cx("title-highlight")}>
            Địa chỉ:{" "}
            <span className={cx("sub-highlight")}>
              10-12, Hồ Tùng Mậu, P. Mai Dịch, Q. Cầu Giấy, Tp. Hà Nội
            </span>
          </div>
          <div className={cx("title-highlight")}>
            Điện thoại: <span className={cx("sub-highlight")}>1900 6750</span>
          </div>
          <div className={cx("title-highlight")}>
            Email:{" "}
            <span className={cx("sub-highlight")}>support@duyminh.vn</span>
          </div>
        </div>
      </div>
      <div className={cx("footer-items")}>
        <h2 className={cx("title")}>Nội dung</h2>
        <ul className={cx("content")}>
          <li>
            <a href="/">Trang chủ</a>
          </li>
          <li>
            <a href="/product">Sản phẩm</a>
          </li>
          <li>
            <a href="/news">Tin tức</a>
          </li>
          <li>
            <a href="/contact">Liên hệ</a>
          </li>
        </ul>
      </div>
      <div className={cx("footer-items")}>
        <h2 className={cx("title")}>Theo dõi chúng tôi</h2>
        <div className={cx("content")}>
          <FacebookFilled className={cx("icon-facebook")} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
