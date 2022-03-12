import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "../components/Page";
import Home from "./Home";
import UseStatePage from "./useStatePage";
import UseEffectPage from "./useEffectPage";
import UseReducerAndUseContextPage from "./useReduceerAndUseContextPage";

const RouteConfig: React.FC = () => {
  const title = "React勉強会";

  return (
    <Routes>
      <Route path="/" element={<Page title={title} component={<Home />} />} />
      <Route
        path="use-state"
        element={
          <Page
            title={`useStateについて|${title}`}
            component={<UseStatePage />}
          />
        }
      />
      <Route
        path="use-effect"
        element={
          <Page
            title={`useEffectについて|${title}`}
            component={<UseEffectPage />}
          />
        }
      />
      <Route
        path="use-reducer-and-use-context"
        element={
          <Page
            title={`useReducer・useContextについて|${title}`}
            component={<UseReducerAndUseContextPage />}
          />
        }
      />
    </Routes>
  );
};

export default RouteConfig;
