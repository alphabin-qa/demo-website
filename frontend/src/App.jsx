import React, { useEffect } from "react";
import Routes from "../src/routes";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a redirect parameter in the URL
    const query = new URLSearchParams(window.location.search);
    const redirectPath = query.get("redirect");

    // If we have a redirect path, navigate to it
    if (redirectPath) {
      navigate(redirectPath);
      // Clean up the URL
      window.history.replaceState(null, "", redirectPath);
    }
  }, [navigate]);

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
};

export default App;
