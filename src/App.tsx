import React from "react";
import "./App.css";
import Header from "./components/Header";
import RouteConfig from "./Route/RouteConfig";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RouteConfig />
    </>
  );
};

export default App;
