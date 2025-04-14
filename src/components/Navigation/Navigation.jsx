import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import * as CategoriesService from "../../services/CategoriesService";

import styles from "./Navigation.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/slides/productSlice";
const cx = classNames.bind(styles);

const Navigation = () => {
  //state
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoriesService.getAllCategories();
        if (res?.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Lỗi fetch danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  const items = categories?.map((category) => ({
    key: category?._id,
    label: category?.name,
  }));

  //handle
  const onClick = ({ key }) => {
    dispatch(searchProduct(key));
    navigate("/type");
  };

  return (
    <nav className={cx("nav")}>
      <ul className={cx("nav-list")}>
        <li onClick={() => navigate("/")} className={cx("nav-item")}>
          Trang chủ
        </li>
        <li className={cx("nav-item")}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a
              onClick={() => {
                dispatch(searchProduct(""));
                navigate("/type");
              }}
            >
              Sản phẩm <DownOutlined />
            </a>
          </Dropdown>
        </li>
        <li onClick={() => navigate("/news")} className={cx("nav-item")}>
          Tin tức
        </li>
        <li onClick={() => navigate("/contact")} className={cx("nav-item")}>
          Liên hệ
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
