import React from "react";
import {ReactComponent as Logo} from '../../assets/catch.svg';
import "./Home.scss"
import {osuUrl} from "../../AppRoutes";
import {UserContext} from "../../models/Types";
import {NavLink} from "react-router-dom";

interface HomeProps {
  userContext: UserContext | undefined
}

function Home({userContext}: HomeProps) {
  return (
    <div className={"landing-page"}>
      <div className={"welcome-screen"}>
        <Logo className={"logo"}/>
        <h1>Nomination Planner</h1>
        <p>By <a href="https://osu.ppy.sh/users/2369776">Greaper</a>, for osu!catch beatmap nominators</p>

        <div className={"actions"}>
          {!userContext ? (
            <a href={osuUrl} className={"button osu-button main-action"}>
              Authenticate with osu!
            </a>
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