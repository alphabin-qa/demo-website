import React from "react";
import Routes from "../src/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
};

export default App;
