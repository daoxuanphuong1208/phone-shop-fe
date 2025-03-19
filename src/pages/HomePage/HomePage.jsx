import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { SliderComponent as Slider } from "../../components/Slider/Slider";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

import slider_1 from "../../assets/images/slider_1.webp";
import slider_2 from "../../assets/images/slider_2.webp";
import slider_3 from "../../assets/images/slider_3.webp";

import service_1 from "../../assets/images/service_1.webp";
import service_2 from "../../assets/images/service_2.png";
import service_3 from "../../assets/images/service_3.png";
import service_4 from "../../assets/images/service_4.png";
import FrameProduct from "../../components/FrameProduct/FrameProduct";

const cx = classNames.bind(styles);
const HomePage = () => {
  const arrImages = [slider_1, slider_2, slider_3];
  const arrService = [
    {
      src: service_1,
      text1: (
        <>
          Vận chuyển <span>MIỄN PHÍ</span>
        </>
      ),
      text2: (
        <>
          Trong phạm vi <span>5KM</span>
        </>
      ),
    },
    {
      src: service_2,
      text1: (
        <>
          Đổi trả <span>MIỄN PHÍ</span>
        </>
      ),
      text2: (
        <>
          Trong vòng <span>30 NGÀY</span>
        </>
      ),
    },
    {
      src: service_3,
      text1: (
        <>
          Tiến hành <span>THANH TOÁN</span>
        </>
      ),
      text2: (
        <>
          Với nhiều <span>PHƯƠNG THỨC</span>
        </>
      ),
    },
    {
      src: service_4,
      text1: <span>100% HOÀN TIỀN</span>,
      text2: "nếu sản phẩm lỗi",
    },
  ];

  return (
    <main className={cx("wrapper")}>
      <div className="container">
        <Slider arrImages={arrImages} />
        <div className={cx("service")}>
          {arrService.map((image, index) => {
            return (
              <ServiceCard
                image={image.src}
                text1={image.text1}
                text2={image.text2}
                key={index}
              />
            );
          })}
        </div>
        <FrameProduct />
        <FrameProduct />
        <FrameProduct />

        <div>Tin tức</div>
      </div>
    </main>
  );
};

export default HomePage;
