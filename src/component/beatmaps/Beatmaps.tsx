import React, {useState} from "react";
import {Beatmap, BeatmapFilter, User} from "../../models/Types";
import BeatmapCard from "./BeatmapCard";
import './Beatmaps.scss';
import BeatmapFilters from "./beatmapFilter/BeatmapFilters";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  page: "PENDING",
  hideWithTwoNominators: false
}

// TODO add support for infinite scrolling
function Beatmaps() {
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)

  let tempBeatmaps = require('./temp-beatmaps.json') as Beatmap[];
  let tempUsers = require('./temp-users.json') as User[];

  return (
    <div className={"page-container-full beatmap-page"}>
      <BeatmapFilters
        users={tempUsers}
        beatmapFilter={beatmapFilter}
        setBeatmapFilter={setBeatmapFilter}
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
      />
      <div className={"beatmap-card-container"}>
        <div className={"beatmap-card-grid"}>
          {tempBeatmaps.map((beatmap, index) => {
            return (
              <BeatmapCard beatmap={beatmap} users={tempUsers} key={index} />
            )
          })}
        </div>
      </div>

      {/*<BeatmapTable beatmaps={tempBeatmaps} />*/}
    </div>
  )
}

export default Beatmaps