import React, { JSX, useEffect, Suspense, lazy } from "react";
import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from "./component/nav/Nav";
import { UserContext, ViewMode } from "./models/Types";
import { CONFIG } from "./Settings";
import Loading from "./component/loading/Loading";

// Lazy-loaded pages
const Home = lazy(() => import("./component/home/Home"));
const Login = lazy(() => import("./component/login/Login"));
const BeatmapsContainer = lazy(() => import("./component/beatmaps/BeatmapsContainer"));
const Admin = lazy(() => import("./component/admin/Admin"));

export const osuUrl = `https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=${CONFIG.osu_id}&redirect_uri=${CONFIG.osu_redirect}&scope=identify public`;

interface RoutesProps {
  viewMode: ViewMode;
  userContext: UserContext | undefined;
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | undefined>>;
}

function AppRoutes({ viewMode, userContext, setUserContext }: RoutesProps) {
  const Layout = () => (
      <>
        <Nav userContext={userContext} setUserContext={setUserContext} />
        <div className="content-container">
          <Outlet />
        </div>
      </>
  );

  function RequireAuth({ children }: { children: JSX.Element }) {
    useEffect(() => {
      if (!userContext || !userContext.user) {
        window.location.href = osuUrl;
      }
    }, []);

    return children;
  }

  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home userContext={userContext} />} />
            <Route path="/login" element={<Login userContext={userContext} setUserContext={setUserContext} />} />
            <Route path="/beatmaps" element={
              <RequireAuth>
                <BeatmapsContainer viewMode={viewMode} userContext={userContext} page="PENDING" />
              </RequireAuth>
            }
            />
            <Route
                path="/graveyard"
                element={
                  <RequireAuth>
                    <BeatmapsContainer viewMode={viewMode} userContext={userContext} page="GRAVEYARD" />
                  </RequireAuth>
                }
            />
            <Route
                path="/ranked"
                element={
                  <RequireAuth>
                    <BeatmapsContainer viewMode={viewMode} userContext={userContext} page="RANKED" />
                  </RequireAuth>
                }
            />
            <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Admin userContext={userContext} />
                  </RequireAuth>
                }
            />
            <Route path="*" element={<div>TODO : NOT FOUND</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppRoutes;
