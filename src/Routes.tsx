import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import Beatmaps from "./component/beatmaps/Beatmaps";
import BeatmapDetails from "./component/beatmapDetails/BeatmapDetails";

function Routes() {
  return (
    <HashRouter>
      <div className={"container"}>
        <Nav />
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/beatmaps"} component={Beatmaps} />
        <Route path={"/beatmaps/:beatmapId"} component={BeatmapDetails} />
      </div>
    </HashRouter>
  )
}

export default Routes