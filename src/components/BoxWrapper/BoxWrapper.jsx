import classNames from "classnames/bind";
import styles from "./BoxWrapper.module.scss";
const cx = classNames.bind(styles);

const BoxWrapper = () => {
  const a = "a";
  const itemFist = true;
  return (
    <div className={cx("wrapper")}>
      <h4 className={cx("title")}>
        <span>Loại sản phẩm</span>
      </h4>
      <ul className={cx("content")}>
        <li>
          <span>{itemFist && a}</span>
          <span>iPhone</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Samsung</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Xiaomi</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Oppo</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Oppo</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Oppo</span>
        </li>
        <li>
          <span>{itemFist && a}</span>
          <span>Oppo</span>
        </li>
      </ul>
    </div>
  );
};

export default BoxWrapper;
