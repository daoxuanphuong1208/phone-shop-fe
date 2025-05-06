import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { useEffect, useState } from "react";

import { SliderComponent as Slider } from "../../components/Slider/Slider";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import FrameProduct from "../../components/FrameProduct/FrameProduct";

import service_1 from "../../assets/images/service_1.webp";
import service_2 from "../../assets/images/service_2.png";
import service_3 from "../../assets/images/service_3.png";
import service_4 from "../../assets/images/service_4.png";
import * as CategoriesService from "../../services/CategoriesService";
import * as SliderService from "../../services/SliderService";

const cx = classNames.bind(styles);

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [resCategories, resSliders] = await Promise.all([
          CategoriesService.getAllCategories(),
          SliderService.getAllSliders(),
        ]);

        if (resCategories?.data) {
          setCategories(resCategories.data);
          setTotalCategory(
            resCategories.totalCategory || resCategories.data.length
          );
        }

        if (resSliders?.data) {
          setSliders(resSliders.data);
        }
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

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
        {sliders.some((s) => s.status) && <Slider arrImages={sliders} />}
        <div className={cx("service")}>
          {arrService.map((image, index) => (
            <ServiceCard
              key={index}
              image={image.src}
              text1={image.text1}
              text2={image.text2}
            />
          ))}
        </div>
        {totalCategory > 0 &&
          categories.map((item, index) => {
            return (
              <FrameProduct
                key={index}
                title={item.name}
                categoryId={item._id}
              />
            );
          })}
        {/* <div className={cx("news-wrap")}>
          <h1 className={cx("news")}>Tin tức</h1>
          <hr />
          <div className={cx("news-list")}>
            <News />
            <News />
            <News />
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default HomePage;
