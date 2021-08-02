import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Home from "./pages/Home";

function Routes() {
  return (
    <HashRouter>
      <Route exact path={"/"} component={Home} />
      <Route path={"/beatmaps"} component={Home} />
    </HashRouter>
  )
}

export default Routes