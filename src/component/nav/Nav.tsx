import React, {Dispatch, SetStateAction} from "react";
import {NavLink} from "react-router-dom";
import greaperLogo from '../../assets/greaper.png'
import NavProfile from "./NavProfile";
import './Nav.scss'
import {UserContext} from "../../models/Types";
import {openInNewTab} from "../../utils/LinkUtils";
import {
  IoArchive,
  IoBarChart,
  IoColorWand,
  IoHome, IoLogInOutline,
  IoLogOutOutline,
  IoMusicalNotes,
  IoPeople, IoPerson,
  IoTrashBin
} from "react-icons/io5";
import {osuUrl} from "../../AppRoutes";

interface NavProps {
  userContext: UserContext | undefined
  setUserContext: Dispatch<SetStateAction<UserContext | undefined>>
}

function Nav({userContext, setUserContext}: NavProps) {
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
          <div className={"navbar-user"}>
            {userContext &&
              <NavProfile user={userContext.user} role={userContext.permission.osuRole}/>
            }
          </div>
          <div className={"navbar-section"}>
            <NavLink to="/" className={(navData) => navData.isActive ? "navbar-active" : ""}>
              <div className={"navbar-item"}>
                <IoHome />
                <div className={"navbar-item-text"}>
                  Home
                </div>
              </div>
            </NavLink>
            {userContext &&
              <NavLink className={"disabled"} to={"/profile"} onClick={disabledOnClick}>
                <div className={"navbar-item navbar-item-disabled"}>
                  <IoPerson/>
                  <div className={"navbar-item-text"}>
                    Profile
                  </div>
                  <div className={"navbar-item-badge"}>
                    WIP
                  </div>
                </div>
              </NavLink>
            }
            <NavLink className={"disabled"} to={"/statistics"} onClick={disabledOnClick}>
              <div className={"navbar-item navbar-item-disabled"}>
                <IoBarChart />
                <div className={"navbar-item-text"}>
                  Statistics
                </div>
                <div className={"navbar-item-badge"}>
                  WIP
                </div>
              </div>
            </NavLink>
              {userContext ? (
                <NavLink to={"/"} onClick={() => setUserContext(undefined)}>
                  <div className={"navbar-item secondary"}>
                    <IoLogOutOutline />
                    <div className={"navbar-item-text"}>
                      Logout
                    </div>
                  </div>
                </NavLink>
              ) : (
                <a href={osuUrl}>
                  <div className={"navbar-item osu-button"}>
                    <IoLogInOutline />
                    <div className={"navbar-item-text"}>
                      Login with osu!
                    </div>
                  </div>
                </a>
              )
            }
          </div>
          {userContext &&
            <div className={"navbar-section"}>
              <p className={"navbar-section-header"}>
                Beatmaps
              </p>
              <NavLink to="/beatmaps" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <IoMusicalNotes/>
                  <div className={"navbar-item-text"}>
                    Pending
                  </div>
                </div>
              </NavLink>
              <NavLink to="/graveyard" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <IoTrashBin/>
                  <div className={"navbar-item-text"}>
                    Graveyard
                  </div>
                </div>
              </NavLink>
              <NavLink to="/ranked" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <IoArchive/>
                  <div className={"navbar-item-text"}>
                    Ranked
                  </div>
                </div>
              </NavLink>
            </div>
          }
          {userContext && userContext.permission.osuRole === "NominationAssessment" &&
            <div className={"navbar-section"}>
              <p className={"navbar-section-header"}>
                Admin
              </p>
              <NavLink to="/admin" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <IoColorWand />
                  <div className={"navbar-item-text"}>
                    Syncing
                  </div>
                </div>
              </NavLink>
              <NavLink className={"disabled"} to={"/users"} onClick={disabledOnClick}>
                <div className={"navbar-item navbar-item-disabled"}>
                  <IoPeople />
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