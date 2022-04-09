import React, {useState} from "react";
import {BeatmapFilter, NewBeatmapStatus} from "../../../models/Types";
import BeatmapNominatorFilter from "./BeatmapNominatorFilter";
import BeatmapStatusFilter from "./BeatmapStatusFilter";
import BeatmapTextFilter from "./BeatmapTextFilter";
import "./BeatmapFilters.scss";

interface BeatmapFilterProps {
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapFilters({beatmapFilter, setBeatmapFilter, setQueryFilter}: BeatmapFilterProps) {
  const [timeout, setTimeout] = useState<number>(0)

  return (
    <div className={"beatmap-filter"}>
      <div className={"beatmap-filter-groups"}>
        <div className={"beatmap-filter-group beatmap-filter-group-left"}>
          <div className={"beatmap-filter-nominators"}>
            <BeatmapNominatorFilter
              nominators={[]}
              beatmapFilter={beatmapFilter}
              setBeatmapFormFilter={setBeatmapFilter}
              timeout={timeout}
              setQueryFilter={setQueryFilter}
            />
          </div>
          <div className={"beatmap-filter-status"}>
            <BeatmapStatusFilter
              statuses={Object.values(NewBeatmapStatus)}
              beatmapFilter={beatmapFilter}
              setBeatmapFormFilter={setBeatmapFilter}
              timeout={timeout}
              setQueryFilter={setQueryFilter}
            />
          </div>
        </div>
        <div className={"beatmap-filter-group beatmap-filter-group-right"}>
          <BeatmapTextFilter
            target={"artist"}
            label={"Artist"}
            beatmapFilter={beatmapFilter}
            setBeatmapFormFilter={setBeatmapFilter}
            setQueryFilter={setQueryFilter}
            timeout={timeout}
            setTimeout={setTimeout}
          />
          <BeatmapTextFilter
            target={"title"}
            label={"Title"}
            beatmapFilter={beatmapFilter}
            setBeatmapFormFilter={setBeatmapFilter}
            setQueryFilter={setQueryFilter}
            timeout={timeout}
            setTimeout={setTimeout}
          />
          <BeatmapTextFilter
            target={"mapper"}
            label={"Mapper"}
            beatmapFilter={beatmapFilter}
            setBeatmapFormFilter={setBeatmapFilter}
            setQueryFilter={setQueryFilter}
            timeout={timeout}
            setTimeout={setTimeout}
          />
        </div>
      </div>
    </div>
  )
}

export default BeatmapFilters