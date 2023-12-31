import Layout from "../layout/Layout";
import { lazy } from "react";
import Loadable from "../components/Loadable";
const Home = Loadable(lazy(() => import("../components/Home")));

const HomeRoutes = {
  path: "/",
  element: <Home />,
};

export default HomeRoutes;
