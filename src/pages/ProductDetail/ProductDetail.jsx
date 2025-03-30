import { Image, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";
import product_detail from "../../assets/images/product_detail.webp";
import product_details_return from "../../assets/images/product_details_return.png";
import product_details_commit from "../../assets/images/product_details_commit.png";
import product_details_transport from "../../assets/images/product_details_transport.png";
import product_details_warranty from "../../assets/images/product_details_warranty.png";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  function onChange(value) {}

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
      <div className={cx("content")}>
        <div className={cx("content-image")}>
          <Image
            width={365}
            height={365}
            src={product_detail}
            alt="product detail"
          />
        </div>
        <div className={cx("content-info")}>
          <h3 className={cx("name")}>
            iPhone 14 Pro Max 512GB Chính hãng VN/A
          </h3>
          <div className={cx("price")}>
            Giá:
            <span>35.690.000₫</span>
          </div>
          <div className={cx("compare-price")}>
            Giá thị trường: <span>35.690.000₫</span>
          </div>
          <div className={cx("status")}>
            Tình trạng: <span>Mới 99%</span>
          </div>
          <div className={cx("gift")}>
            <div>Quà tặng khuyến mãi</div>
            <span>Tặng Sạc cáp nhanh 20w giới hạn trị giá 250k</span>
          </div>
          <div className={cx("count")}>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              size="large"
              onChange={onChange}
            />
          </div>
          <div className={cx("btn")}>
            <button className={cx("btn-add")}>Thêm vào giỏ hàng</button>
            <button className={cx("btn-buy")}>
              Mua ngay <ShoppingCartOutlined className={cx("cart-icon")} />
            </button>
          </div>
        </div>
        <div className={cx("content-config")}>
          <BoxWrapper
            icons={[
              <img
                width="30px"
                height="30px"
                src={product_details_return}
                alt="product details return"
              />,
              <img
                width="30px"
                height="30px"
                src={product_details_commit}
                alt="product details commit"
              />,
              <img
                width="30px"
                height="30px"
                src={product_details_transport}
                alt="product details transport"
              />,
              <img
                width="30px"
                height="30px"
                src={product_details_warranty}
                alt="product details warranty"
              />,
            ]}
            titles={[
              "Miễn phí vận chuyển bán kính 5km",
              "Bảo hành chính hãng toàn quốc",
              "Cam kết chính hãng 100%",
              "1 đổi 1 nếu sản phẩm lỗi",
            ]}
          />
          <BoxWrapper
            icons={["RAM", "ROM", "PIN", "MANUFACTURER", "OS", "SIZE"]}
            titles={["16GB", "128GB", "4000mAh", "Apple", "iOS", "6.7 inch"]}
          />
        </div>
      </div>
      <div className={cx("description")}>
        <h3>Mô tả sản phẩm</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          numquam aut aliquam perferendis ex natus delectus fugiat doloribus
          inventore praesentium optio, accusamus iusto repudiandae assumenda
          ullam ipsum consectetur animi rem voluptatem fugit quia sit sint
          nesciunt unde. Aut excepturi quasi unde omnis vitae soluta
          voluptatibus modi quisquam voluptate ex vel, eligendi hic est ipsam
          beatae tempore, quae eos voluptatem quis fugiat veritatis quas quo
          eum! Eius officiis ad itaque eum! Nisi natus aut nesciunt quod,
          doloremque tenetur provident doloribus vel, harum eos eaque eveniet
          itaque expedita fugit quasi reiciendis laborum? Accusantium corrupti
          iste ab quod rerum assumenda, ducimus quis deserunt unde ipsa porro
          voluptas sit sapiente deleniti? Voluptatem accusantium, saepe, optio
          amet cum provident placeat quisquam rerum cupiditate quaerat officiis!
          Cumque, quisquam facilis provident, minima, earum et voluptatem animi
          esse libero similique ab itaque vel velit perspiciatis quam pariatur
          quia omnis maxime recusandae? Voluptates explicabo voluptas ex totam
          nam cupiditate fugiat sapiente, libero minus labore enim, ullam dolor.
          Accusamus delectus ducimus obcaecati dolor nihil ex? Autem natus dolor
          labore. Cum rerum dolorem molestias, fugiat nemo perspiciatis odio,
          molestiae nesciunt et dolore debitis, commodi ullam laudantium ab!
          Delectus, aspernatur incidunt quia porro id asperiores. Sequi voluptas
          autem ipsa omnis obcaecati tenetur!
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
