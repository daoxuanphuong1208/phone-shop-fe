import { Image } from "antd";
import classNames from "classnames/bind";
import styles from "./ServiceCard.module.scss";
const cx = classNames.bind(styles);

const ServiceCard = (props) => {
  const { image, text1, text2 } = props;
  return (
    <div className={cx("wrapper")}>
      <Image
        className={cx("image")}
        src={image}
        alt="service"
        preview={false}
        width={36}
        height={36}
      />
      <div className={cx("text-content")}>
        <div>{text1}</div>
        <div>{text2}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
