import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import Beatmaps from "./component/beatmaps/Beatmaps";

function Routes() {
  return (
    <HashRouter>
      <div className={"container"}>
        <Nav />
        <Route exact path={"/"} component={Home} />
        <Route path={"/beatmaps"} component={Beatmaps} />
      </div>
    </HashRouter>
  )
}

export default Routes