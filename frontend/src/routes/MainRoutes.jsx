import { lazy } from "react";
import Loadable from "../components/Loadable";
import AboutUs from "../components/AboutUs";
import ErrorPage from "../components/ErrorPage";
import Contact from "../components/Contact";
import ProductDetail from "../components/ProductDetail";
import MyAccount from "../components/MyAccount";
const Home = Loadable(lazy(() => import("../components/Home")));
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
      path: "product-detail/:id",
      element: <ProductDetail />,
    },
    {
      path: "account",
      element: <MyAccount />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

export default MainRoutes;
