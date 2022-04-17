import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import greaperLogo from '../../assets/greaper.png'
import NavProfile from "./NavProfile";
import './Nav.scss'
import {UserContext} from "../../models/Types";
import {MdLogout, MdPersonOutline} from "react-icons/md";

interface NavProps {
  userContext: UserContext | undefined
}

function Nav({userContext}: NavProps) {
  return (
    <>
      <header className="site-header">
        <nav className={"navbar"}>
          <div className={"navbar-start"}>
            <NavLink to="/" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                Home
              </div>
            </NavLink>
            {userContext &&
              <>
                <NavLink to="/beatmaps" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    Beatmaps
                  </div>
                </NavLink>
                <NavLink to="/graveyard" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    Graveyard
                  </div>
                </NavLink>
                <NavLink to="/ranked" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    Ranked
                  </div>
                </NavLink>
                {/*<NavLink to="/statistics" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    Statistics
                  </div>
                </NavLink>*/}
              </>
            }
          </div>
          <div className={"navbar-logo"}>
            <a className={"navbar-logo-wrapper"} href={"https://osu.ppy.sh/users/2369776"}>
              <img src={greaperLogo} alt={"Greaper"}/>
            </a>
          </div>
          <div className={"navbar-end"}>
            {userContext &&
            <>
              <NavLink to="/profile" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <MdPersonOutline />
                </div>
              </NavLink>
              <NavLink to="/logout" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <MdLogout />
                </div>
              </NavLink>
              <NavProfile user={userContext.user} role={userContext.permission.osuRole}/>
            </>
            }
          </div>
        </nav>
      </header>
      <Outlet/>
    </>
  )
}


export default Nav