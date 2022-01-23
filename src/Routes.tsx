import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import BeatmapDetailsContainer from "./component/beatmapDetails/BeatmapDetailsContainer";
import BeatmapsContainer from "./component/beatmaps/BeatmapsContainer";
import {ViewMode} from "./models/Types";

interface RoutesProps {
  viewMode: ViewMode
}

function Routes({ viewMode }: RoutesProps) {
  return (
    <HashRouter>
      <div className={"container"}>
        <Nav />
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/beatmaps"} component={() => <BeatmapsContainer viewMode={viewMode} />} />
        <Route path={"/beatmaps/:beatmapId"} component={BeatmapDetailsContainer} />
      </div>
    </HashRouter>
  )
}

export default Routes