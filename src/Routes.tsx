import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Nav from "./component/nav/Nav";

function Routes() {
  return (
    <HashRouter>
      <div className={"container"}>
        <Nav />
        <Route exact path={"/"} component={Home} />
        <Route path={"/beatmaps"} component={Home} />
      </div>
    </HashRouter>
  )
}

export default Routes