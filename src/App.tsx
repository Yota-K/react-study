import React from "react";
import "./App.css";
import Header from "./components/Header";
import PortalSample from "./components/PortalSample";
import RouteConfig from "./Route/RouteConfig";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RouteConfig />
      <PortalSample />
    </>
  );
};

export default App;
