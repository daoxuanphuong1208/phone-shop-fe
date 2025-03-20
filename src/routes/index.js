import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import News from "../pages/News/News";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";

import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

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
    layout: DefaultLayout,
  },

  {
    path: "/news",
    page: News,
    layout: DefaultLayout,
  },
  {
    path: "/contact",
    page: Contact,
    layout: DefaultLayout,
  },
  {
    path: "/cart",
    page: Cart,
    layout: DefaultLayout,
  },
  {
    path: "/search",
    page: SearchPage,
    layout: DefaultLayout,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: DefaultLayout,
  },
];

export default routes;
