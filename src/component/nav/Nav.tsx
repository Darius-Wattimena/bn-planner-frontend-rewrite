import React, {MouseEventHandler} from "react";
import {NavLink} from "react-router-dom";
import greaperLogo from '../../assets/greaper.png'
import NavProfile from "./NavProfile";
import './Nav.scss'
import {UserContext} from "../../models/Types";
import {openInNewTab} from "../../utils/LinkUtils";
import {ImBin, ImDrawer, ImHome, ImMusic, ImStatsBars, ImUsers, ImWrench} from "react-icons/im";

interface NavProps {
  userContext: UserContext | undefined
}

function Nav({userContext}: NavProps) {
  const disabledOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <header className="site-header">
        <nav className={"navbar"}>
          <div className={"navbar-logo"}>
            <div className={"navbar-logo-clickable"} onClick={() => openInNewTab("https://osu.ppy.sh/users/2369776")}>
              <img src={greaperLogo} alt={"logo"}/>
              <div className={"navbar-logo-wrapper"}>
                <div>Nomination</div>
                <div>Planner</div>
              </div>
            </div>
          </div>
          <hr />
          <div className={"navbar-end"}>
            {userContext &&
              <>
                {/*<NavLink to="/profile" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <MdPersonOutline />
                </div>
              </NavLink>*/}
                <NavProfile user={userContext.user} role={userContext.permission.osuRole}/>
              </>
            }
          </div>
          <div className={"navbar-section"}>
            <NavLink to="/" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                <ImHome />
                <div className={"navbar-item-text"}>
                  Home
                </div>
              </div>
            </NavLink>
            <NavLink className={"disabled"} to={"/statistics"} onClick={disabledOnClick}>
              <div className={"navbar-item navbar-item-disabled"}>
                <ImStatsBars />
                <div className={"navbar-item-text"}>
                  Statistics
                </div>
                <div className={"navbar-item-badge"}>
                  WIP
                </div>
              </div>
            </NavLink>
          </div>
          <div className={"navbar-section"}>
            <p className={"navbar-section-header"}>
              Beatmaps
            </p>
            <NavLink to="/beatmaps" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                <ImMusic />
                <div className={"navbar-item-text"}>
                  Pending
                </div>
              </div>
            </NavLink>
            <NavLink to="/graveyard" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                <ImBin />
                <div className={"navbar-item-text"}>
                  Graveyard
                </div>
              </div>
            </NavLink>
            <NavLink to="/ranked" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                <ImDrawer />
                <div className={"navbar-item-text"}>
                  Ranked
                </div>
              </div>
            </NavLink>
          </div>
          {userContext && userContext.permission.osuRole === "NominationAssessment" &&
            <div className={"navbar-section"}>
              <p className={"navbar-section-header"}>
                Admin
              </p>
              <NavLink to="/admin" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <ImWrench />
                  <div className={"navbar-item-text"}>
                    Syncing
                  </div>
                </div>
              </NavLink>
              <NavLink className={"disabled"} to={"/users"} onClick={disabledOnClick}>
                <div className={"navbar-item navbar-item-disabled"}>
                  <ImUsers />
                  <div className={"navbar-item-text"}>
                    Users
                  </div>
                  <div className={"navbar-item-badge"}>
                    WIP
                  </div>
                </div>
              </NavLink>
            </div>
          }
          <div className={"navbar-leftover"} />
        </nav>
      </header>
    </>
  )
}


export default Nav