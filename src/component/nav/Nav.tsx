import React from "react";
import { NavLink } from "react-router-dom";
import greaperLogo from '../../assets/greaper.png'
import NavProfile from "./NavProfile";
import './Nav.scss'

function Nav() {
  return (
    <header className="site-header">
      <nav className={"navbar"}>
        <div className={"navbar-logo"}>
          <a href={"https://osu.ppy.sh/users/2369776"}>
            <img src={greaperLogo} alt={"Greaper.net"} />
          </a>
        </div>
        <div className={"navbar-start"}>
          <NavLink to="/beatmaps">
            <div className={"navbar-item"}>
              Beatmaps
            </div>
          </NavLink>
          <NavLink to="/graveyard">
            <div className={"navbar-item"}>
              Graveyard
            </div>
          </NavLink>
          <NavLink to="/ranked">
            <div className={"navbar-item"}>
              Ranked
            </div>
          </NavLink>
          <NavLink to="/statistics">
            <div className={"navbar-item"}>
              Statistics
            </div>
          </NavLink>
        </div>
        <div className={"navbar-end"}>
          <NavLink to="/my-icons">
            <div className={"navbar-item"}>
              My Icons
            </div>
          </NavLink>
          <NavProfile userId={"11081858"} username={"GIGACHAD"} role={"Retired"} />
        </div>
      </nav>
    </header>
  )
}


export default Nav