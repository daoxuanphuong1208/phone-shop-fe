import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { SliderComponent as Slider } from "../../components/Slider/Slider";

import slider_1 from "../../assets/images/slider_1.webp";
import slider_2 from "../../assets/images/slider_2.webp";
import slider_3 from "../../assets/images/slider_3.webp";

const cx = classNames.bind(styles);
const HomePage = () => {
  return (
    <main className={cx("wrapper", "container")}>
      <Slider arrImages={[slider_1, slider_2, slider_3]} />
    </main>
  );
};

export default HomePage;
