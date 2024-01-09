import { lazy } from "react";
import Loadable from "../components/Loadable";
const AuthLogin = Loadable(lazy(() => import("../components/pages/Login")));
const AuthRegister = Loadable(lazy(() => import("../components/pages/Signup")));

const LoginRoutes = {
  path: "/",
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
