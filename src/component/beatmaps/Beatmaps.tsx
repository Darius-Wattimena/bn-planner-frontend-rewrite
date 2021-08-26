import React from "react";
import {Beatmap, User} from "../../models/Types";
import BeatmapCard from "./BeatmapCard";
import './Beatmaps.scss';
import BeatmapFilters from "./beatmapFilter/BeatmapFilters";

function Beatmaps() {
  let tempBeatmaps = require('./temp-beatmaps.json') as Beatmap[];
  let tempUsers = require('./temp-users.json') as User[];

  return (
    <div className={"page-container-full beatmap-page"}>
      <BeatmapFilters users={tempUsers} />
      <div className={"beatmap-card-container"}>
        <div className={"beatmap-card-grid"}>
          {tempBeatmaps.map(beatmap => {
            return (
              <BeatmapCard beatmap={beatmap} users={tempUsers} />
            )
          })}
        </div>
      </div>

      {/*<BeatmapTable beatmaps={tempBeatmaps} />*/}
    </div>
  )
}

export default Beatmaps