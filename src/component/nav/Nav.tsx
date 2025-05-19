import React, {Dispatch, SetStateAction} from "react";
import {NavLink} from "react-router-dom";
import greaperLogo from '../../assets/greaper.png'
import NavProfile from "./NavProfile";
import './Nav.scss'
import {UserContext} from "../../models/Types";
import {openInNewTab} from "../../utils/LinkUtils";
import {
  FaBoxArchive,
  FaChartBar,
  FaWandMagicSparkles,
  FaHouse,
  FaArrowRightToBracket,
  FaRightFromBracket,
  FaMusic,
  FaPeopleGroup,
  FaUser,
  FaTrashCan
} from "react-icons/fa6";
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
          <div className={"navbar-items"}>
            <div className={"navbar-user"}>
              {userContext &&
                <NavProfile user={userContext.user} />
              }
            </div>
            <div className={"navbar-section"}>
              <NavLink to="/" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                <div className={"navbar-item"}>
                  <FaHouse />
                  <div className={"navbar-item-text"}>
                    Home
                  </div>
                </div>
              </NavLink>
              {userContext &&
                <NavLink to={"/profile"} className={(navData) => navData.isActive ? "navbar-active disabled" : "disabled"} onClick={disabledOnClick}>
                  <div className={"navbar-item navbar-item-disabled"}>
                    <FaUser />
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
                  <FaChartBar />
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
                    <FaRightFromBracket />
                    <div className={"navbar-item-text"}>
                      Logout
                    </div>
                  </div>
                </NavLink>
              ) : (
                <a href={osuUrl}>
                  <div className={"navbar-item osu-button"}>
                    <FaArrowRightToBracket />
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
                    <FaMusic />
                    <div className={"navbar-item-text"}>
                      Pending
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/graveyard" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    <FaTrashCan />
                    <div className={"navbar-item-text"}>
                      Graveyard
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/ranked" className={(navData) => navData.isActive ? "navbar-active" : ""}>
                  <div className={"navbar-item"}>
                    <FaBoxArchive />
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
                    <FaWandMagicSparkles />
                    <div className={"navbar-item-text"}>
                      Syncing
                    </div>
                  </div>
                </NavLink>
                <NavLink className={"disabled"} to={"/users"} onClick={disabledOnClick}>
                  <div className={"navbar-item navbar-item-disabled"}>
                    <FaPeopleGroup />
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
          </div>
        </nav>
      </header>
    </>
  )
}


export default Nav