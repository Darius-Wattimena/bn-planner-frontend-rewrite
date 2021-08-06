import React from "react";
import {Beatmap} from "../../models/Types";
import BeatmapCard from "./BeatmapCard";
import './Beatmaps.scss';
import BeatmapFilter from "./BeatmapFilter";

function Beatmaps() {
  let tempBeatmaps = require('./temp-beatmaps.json') as Beatmap[];

  return (
    <div className={"page-container-full beatmap-page"}>
      <BeatmapFilter />
      <div className={"beatmap-card-container"}>
        <div className={"beatmap-card-grid"}>
          {tempBeatmaps.map(beatmap => {
            return (
              <BeatmapCard beatmap={beatmap} />
            )
          })}
        </div>
      </div>

      {/*<BeatmapTable beatmaps={tempBeatmaps} />*/}
    </div>
  )
}

export default Beatmaps