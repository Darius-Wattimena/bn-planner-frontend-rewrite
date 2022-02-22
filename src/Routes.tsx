import React from "react";
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import { Routes as ReactRoutes } from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import BeatmapsContainer from "./component/beatmaps/BeatmapsContainer";
import {UserContext, ViewMode} from "./models/Types";
import Login from "./component/login/Login";
import {CONFIG} from "./Settings";

export const osuUrl = `https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=${CONFIG.osu_id}&redirect_uri=${CONFIG.osu_redirect}&response_type=code&scope=identify public`

interface RoutesProps {
  viewMode: ViewMode,
  userContext?: UserContext
}

function Routes({ viewMode, userContext }: RoutesProps) {
  function RequireAuth({ children }: { children: JSX.Element }) {

    if (!userContext || !userContext.user) {
      return <Navigate to={osuUrl} />
      /* return <Navigate to="/login" state={{ from: location }} replace />; */
    }

    return children;
  }

  return (
    <div className={"container"}>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="beatmaps" element={
              <RequireAuth>
                <BeatmapsContainer viewMode={viewMode} />
              </RequireAuth>
            } />
          </Route>
        </ReactRoutes>
      </BrowserRouter>
    </div>
  )
}



export default Routes