import React, {useEffect, useState} from "react";
import {ReactComponent as Logo} from '../../assets/catch.svg';
import "./Home.scss"
import {osuUrl} from "../../AppRoutes";
import {UserContext} from "../../models/Types";
import {NavLink, useLocation} from "react-router-dom";

interface HomeProps {
  userContext: UserContext | undefined
}

function Home({userContext}: HomeProps) {
  const [errorLogin, setErrorLogin] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.state as boolean) {
      const state = location.state as boolean

      if (state) {
        setErrorLogin(true)
      } else {
        setErrorLogin(false)
      }
    } else {
      setErrorLogin(false)
    }
  }, [location])

  return (
    <div className={"landing-page"}>
      <div className={"welcome-screen"}>
        <Logo className={"logo"}/>
        <h1>Nomination Planner</h1>
        <p>By <a href="https://osu.ppy.sh/users/2369776">Greaper</a>, for osu!catch beatmap nominators</p>

        <div className={"actions"}>
          {!userContext ? (
            <>
              <a href={osuUrl} className={"button osu-button main-action"}>
                Authenticate with osu!
              </a>
              {errorLogin &&
                <div className={"message-container login-message-container"}>
                  <div className={"message error-message"}>
                    <div className={"header"}>Could not login!</div>
                    <div className={"content"}>
                      Something went wrong while trying to login with your osu credentials. If this keeps occurring contact Greaper.
                    </div>
                  </div>
                </div>
              }
            </>
          ) : (
            <NavLink to="/beatmaps" className={"button button-submit sub-action"}>
              Beatmaps
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home