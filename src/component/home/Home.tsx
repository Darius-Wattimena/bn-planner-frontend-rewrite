import React from "react";
import {ReactComponent as Logo} from '../../assets/catch.svg';
import "./Home.scss"
import {osuUrl} from "../../AppRoutes";

function Home() {
  return (
    <div className={"landing-page"}>
      <div className={"welcome-screen"}>
        <Logo className={"logo"}/>
        <h1>Nomination Planner</h1>
        <p>By <a href="https://osu.ppy.sh/users/2369776">Greaper</a>, for osu!catch beatmap nominators</p>

        <div className={"actions"}>
          <a href={osuUrl} className={"button osu-button main-action"}>
            Authenticate with osu!
          </a>
          <a href={osuUrl} className={"button secondary sub-action"}>
            Continue to beatmaps
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home