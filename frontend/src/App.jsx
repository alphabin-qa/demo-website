import React, { useEffect } from "react";
import Home from "./components/Home";
import Axios from "axios";

const App = () => {
  const fetchData = async () => {
    await Axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email: "alphabin@alphabin.com",
      password: "alphabin",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // return <Home />;
};

export default App;
