import classNames from "classnames/bind";
import styles from "./BoxWrapper.module.scss";
const cx = classNames.bind(styles);

const BoxWrapper = (props) => {
  const { icons, titles } = props;

  const itemFist = true;
  return (
    <div className={cx("wrapper")}>
      <h4 className={cx("title")}>
        <span>Loại sản phẩm</span>
      </h4>
      <ul className={cx("content")}>
        {titles.map((title, index) => (
          <li className={cx("wrapper-item")} key={index}>
            <span>{icons && icons[index]}</span>
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoxWrapper;
