import React, {useEffect} from "react";
import {Route, Routes} from 'react-router-dom';
import Nav from "./component/nav/Nav";
import Home from "./component/home/Home";
import BeatmapsContainer from "./component/beatmaps/BeatmapsContainer";
import {UserContext, ViewMode} from "./models/Types";
import Login from "./component/login/Login";
import {CONFIG} from "./Settings";

export const osuUrl = `https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=${CONFIG.osu_id}&redirect_uri=${CONFIG.osu_redirect}&scope=identify public`

interface RoutesProps {
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  userContext?: UserContext
}

function AppRoutes({viewMode, setViewMode, userContext}: RoutesProps) {
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
      <Nav userContext={userContext}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/beatmaps" element={
          <RequireAuth>
            <BeatmapsContainer viewMode={viewMode} setViewMode={setViewMode} userContext={userContext}/>
          </RequireAuth>
        }/>
        <Route path="*" element={<div>TODO : NOT FOUND</div>}/>
      </Routes>
      <div className={"footer"}>

      </div>
    </div>
  )
}

export default AppRoutes