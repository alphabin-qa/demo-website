import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./Layout"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import {Home, Login} from "./components/AllComponents";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="" element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
);
