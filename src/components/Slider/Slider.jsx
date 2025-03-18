import { Image } from "antd";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        right: "10px",
        top: "50%",
        borderRadius: "5px",
        zIndex: "10",
        background: "#ff901c",
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        left: "10px",
        top: "50%",
        borderRadius: "5px",
        zIndex: "10",
        background: "#ff901c",
        color: "#fff !important",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
}

const SliderComponent = (props) => {
  const { arrImages } = props;
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider className={cx("wrapper")} {...settings}>
      {arrImages.map((image, index) => {
        return (
          <Image
            preview={false}
            width="100%"
            height="460px"
            src={image}
            key={index}
            alt={`slider ${index}`}
          />
        );
      })}
    </Slider>
  );
};

export { SliderComponent };
