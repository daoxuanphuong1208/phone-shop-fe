import { Button, Image, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";
import product_details_return from "../../assets/images/product_details_return.png";
import product_details_commit from "../../assets/images/product_details_commit.png";
import product_details_transport from "../../assets/images/product_details_transport.png";
import product_details_warranty from "../../assets/images/product_details_warranty.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  let params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductDetail = async () => {
      const res = await ProductService.getDetailsProduct(params.id);
      setProduct(res?.data);
    };
    getProductDetail();
  }, []);

  const handleQuantity = (type) => {
    setQuantity((prev) => {
      if (type === "increase") {
        return Math.min(prev + 1, product?.countInStock || 1);
      } else {
        return Math.max(prev - 1, 1);
      }
    });
  };

  const onChange = (value) => {
    if (!value) {
      setQuantity(1);
    } else if (value > product?.countInStock) {
      setQuantity(product?.countInStock);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  const onBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
    } else if (quantity > product?.countInStock) {
      setQuantity(product?.countInStock);
    }
  };

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb
        breadcrumFirst={{ label: "Chi tiết sản phẩm" }}
        breadcrumSecond={{ label: product?.name }}
      />
      <div className={cx("content")}>
        <div className={cx("content-image")}>
          <Image
            width={365}
            height={365}
            src={product?.image}
            alt="product detail"
          />
        </div>
        <div className={cx("content-info")}>
          <h3 className={cx("name")}>{product?.name}</h3>
          <div className={cx("price")}>
            Giá:
            <span>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className={cx("compare-price")}>
            Giá thị trường:{" "}
            <span>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className={cx("status")}>
            Tình trạng: <span>Mới 99%</span>
          </div>
          <div className={cx("gift")}>
            <div>Quà tặng khuyến mãi</div>
            <span>Tặng Sạc cáp nhanh 20w giới hạn trị giá 250k</span>
          </div>
          <div className={cx("count")}>
            <div
              className={cx("decrease")}
              onClick={() => handleQuantity("decrease")}
            >
              -
            </div>
            <InputNumber
              className={cx("custom-input-number")}
              min={1}
              max={product?.countInStock}
              value={quantity}
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              controls={false}
            />
            <div
              className={cx("increase")}
              onClick={() => handleQuantity("increase")}
            >
              +
            </div>
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
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
