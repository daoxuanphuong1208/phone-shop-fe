import { Breadcrumb } from "antd";

const Cart = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: "Trang chủ",
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: "An Application",
          },
        ]}
      />
    </div>
  );
};

export default Cart;
