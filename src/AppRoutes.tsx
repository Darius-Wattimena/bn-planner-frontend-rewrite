import React, {useEffect} from "react";
import {Outlet, Route, Routes} from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import BeatmapsContainer from "./component/beatmaps/BeatmapsContainer";
import {UserContext, ViewMode} from "./models/Types";
import Login from "./component/login/Login";
import {CONFIG} from "./Settings";
import Admin from "./component/admin/Admin";

export const osuUrl = `https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=${CONFIG.osu_id}&redirect_uri=${CONFIG.osu_redirect}&scope=identify public`

interface RoutesProps {
  viewMode: ViewMode
  userContext: UserContext | undefined
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | undefined>>
}

function AppRoutes({viewMode, userContext, setUserContext}: RoutesProps) {
  const Layout = () => {
    return (
      <>
        <Nav userContext={userContext} setUserContext={setUserContext} />
        <div>
          <Outlet />
          <div className={"footer"} />
        </div>
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
              <BeatmapsContainer viewMode={viewMode} userContext={userContext} page={"PENDING"} />
            </RequireAuth>
          }/>
          <Route path="/graveyard" element={
            <RequireAuth>
              <BeatmapsContainer viewMode={viewMode} userContext={userContext} page={"GRAVEYARD"} />
            </RequireAuth>
          }/>
          <Route path="/ranked" element={
            <RequireAuth>
              <BeatmapsContainer viewMode={viewMode} userContext={userContext} page={"RANKED"} />
            </RequireAuth>
          }/>
          <Route path="/admin" element={
            <RequireAuth>
              <Admin userContext={userContext} />
            </RequireAuth>
          }/>
          <Route path="*" element={<div>TODO : NOT FOUND</div>}/>
        </Route>
      </Routes>

    </div>
  )
}

export default AppRoutes