import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import HeaderOnly from "../layouts/HeaderOnly/HeaderOnly";

const routes = [
  {
    path: "/",
    page: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "/product",
    page: ProductPage,
    layout: DefaultLayout,
  },
  {
    path: "/order",
    page: OrderPage,
    layout: HeaderOnly,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];

export default routes;
