import { lazy } from "react";
import Loadable from "../components/Loadable";
import DefaultRoute from "../DefaultRoute/DefaultRoute";
const AuthLogin = Loadable(lazy(() => import("../components/pages/Login")));
const AuthRegister = Loadable(lazy(() => import("../components/pages/Signup")));

const LoginRoutes = {
  path: "/",
  element: <DefaultRoute />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "signup",
      element: <AuthRegister />,
    },
  ],
};

export default LoginRoutes;
