import HomePage from "../pages/HomePage/HomePage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import SearchPage from "../pages/SearchPage/SearchPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import News from "../pages/News/News";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import AdminPage from "../pages/AdminPage/AdminPage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import MyOrder from "../pages/MyOrder/MyOrder";

import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

const routes = [
  {
    path: "/",
    page: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "/type",
    page: TypeProductPage,
    layout: DefaultLayout,
  },
  {
    path: "/checkout",
    page: CheckOutPage,
  },
  {
    path: "/order-success",
    page: OrderSuccess,
  },
  {
    path: "/my-order",
    page: MyOrder,
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
    path: "/product-details/:id",
    page: ProductDetail,
    layout: DefaultLayout,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    layout: DefaultLayout,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    layout: DefaultLayout,
  },
  {
    path: "/profile",
    page: Profile,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isPrivate: true,
  },
  {
    path: "/reset-password",
    page: ResetPassword,
    layout: DefaultLayout,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: DefaultLayout,
  },
];

export default routes;
