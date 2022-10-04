import React, {useEffect} from "react";
import {Outlet, Route, Routes} from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import BeatmapsContainer from "./component/beatmaps/BeatmapsContainer";
import {BeatmapPage, UserContext, ViewMode} from "./models/Types";
import Login from "./component/login/Login";
import {CONFIG} from "./Settings";

export const osuUrl = `https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=${CONFIG.osu_id}&redirect_uri=${CONFIG.osu_redirect}&scope=identify public`

interface RoutesProps {
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  userContext: UserContext | undefined
  setUserContext: (value: (UserContext | ((val: UserContext) => UserContext) | undefined)) => void
}

function AppRoutes({viewMode, setViewMode, userContext, setUserContext}: RoutesProps) {
  const Layout = () => {
    return (
      <>
        <Nav userContext={userContext} />
        <Outlet />
        <div className={"footer"} />
      </>
    )
  }

  function RequireAuth({children}: { children: JSX.Element }) {
    useEffect(() => {
      if (!userContext || !userContext.user) {
        window.location.href = osuUrl
      }
    }, [])

    return children;
  }

  return (
    <div className={"container"}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home userContext={userContext}/>}/>
          <Route path="/login" element={<Login userContext={userContext} setUserContext={setUserContext}/>}/>
          <Route path="/beatmaps" element={
            <RequireAuth>
              <BeatmapsContainer viewMode={viewMode} setViewMode={setViewMode} userContext={userContext} page={"PENDING"} />
            </RequireAuth>
          }/>
          <Route path="/graveyard" element={
            <RequireAuth>
              <BeatmapsContainer viewMode={viewMode} setViewMode={setViewMode} userContext={userContext} page={"GRAVEYARD"} />
            </RequireAuth>
          }/>
          <Route path="/ranked" element={
            <RequireAuth>
              <BeatmapsContainer viewMode={viewMode} setViewMode={setViewMode} userContext={userContext} page={"RANKED"} />
            </RequireAuth>
          }/>
          <Route path="*" element={<div>TODO : NOT FOUND</div>}/>
        </Route>
      </Routes>

    </div>
  )
}

export default AppRoutes