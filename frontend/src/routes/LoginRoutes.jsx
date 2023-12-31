import { lazy } from "react";

import Loadable from "../components/Loadable";
import Layout from "../DefaultRoute/DefaultRoute";
const AuthLogin = Loadable(lazy(() => import("../components/Login")));
const AuthRegister = Loadable(lazy(() => import("../components/Login")));

const LoginRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};

export default LoginRoutes;
