import React from "react";
import { NavLink } from "react-router-dom";
import catchLogo from '../assets/catch.svg'
import "./Home.scss"

function Home() {
  return (
    <div className={"landing-page"}>
      <div className={"welcome-screen"}>
        <object type="image/svg+xml" data={catchLogo} className={"logo"}>
          <p>osu!catch logo</p>
        </object>
        <h1>Nomination Planner</h1>
        <p>By <a href="https://osu.ppy.sh/users/2369776">Greaper</a>, for osu!catch beatmap nominators</p>

        <div className={"actions"}>
          <NavLink to="/beatmaps" className={"button osu-button main-action"}>
            Authenticate with osu!
          </NavLink>
          <NavLink to="/beatmaps" className={"button secondary sub-action"}>
            Continue to beatmaps
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home