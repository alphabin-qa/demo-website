import { lazy } from "react";
import Loadable from "../components/Loadable";
import AboutUs from "../components/pages/AboutUs";
import ErrorPage from "../components/ErrorPage";
import Contact from "../components/pages/ContactUs";
import ProductDetail from "../components/pages/ProductDetail";
import MyAccount from "../components/pages/MyAccount";
import Wishlist from "../components/pages/Wishlist";
import AllProducts from "../components/pages/AllProducts";
import Cart from "../components/pages/Cart";
import Checkout from "../components/pages/Checkout";
const Home = Loadable(lazy(() => import("../components/pages/Home")));
const DefaultRoute = Loadable(
  lazy(() => import("../DefaultRoute/DefaultRoute"))
);

const MainRoutes = {
  path: "/",
  element: <DefaultRoute />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "about-us",
      element: <AboutUs />,
    },
    {
      path: "contact-us",
      element: <Contact />,
    },
    {
      path: "products",
      element: <AllProducts />,
    },
    {
      path: "product-detail/:id",
      element: <ProductDetail />,
    },
    {
      path: "account",
      element: <MyAccount />,
    },
    {
      path: "wishlist",
      element: <Wishlist />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "checkout",
      element: <Checkout />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

export default MainRoutes;
