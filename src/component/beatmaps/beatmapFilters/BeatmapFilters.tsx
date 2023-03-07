import React, {useState} from "react";
import {BeatmapFilter, User} from "../../../models/Types";
import BeatmapTextFilter from "./BeatmapTextFilter";
import "./BeatmapFilters.scss";
import UserSearcher from "../../userSearcher/UserSearcher";
import {instantFilter} from "../../../utils/FilterUtils";

interface BeatmapFilterProps {
  currentUser?: User
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapFilters({currentUser, beatmapFilter, setBeatmapFilter, setQueryFilter}: BeatmapFilterProps) {
  const [timeout, setTimeout] = useState<number>(0)
  const [openUserSearcher, setOpenUserSearcher] = useState(false)

  function resetNominatorFilter() {
    instantFilter(
      beatmapFilter,
      "nominators",
      [],
      setBeatmapFilter,
      timeout,
      setQueryFilter
    )
  }

  return (
    <>
      <div className={"beatmap-filter"}>
        <div className={"beatmap-filter-groups"}>
          <div className={"beatmap-filter-group-old"}>
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
            <div className={"beatmap-filter-nominators"}>
              <button className={"button beatmap-button primary"} onClick={() => setOpenUserSearcher(true)}>
                <div className={"beatmap-button-text"}>
                  Filter Nominators
                </div>
              </button>
              <button disabled={beatmapFilter["nominators"].length === 0} className={"button beatmap-button primary"} onClick={() => resetNominatorFilter()}>
                <div className={"beatmap-button-text"}>
                  Clear Nominators
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserSearcher
        currentUser={currentUser}
        openUserSearcher={openUserSearcher}
        setOpenUserSearcher={setOpenUserSearcher}
        beatmapFilter={beatmapFilter}
        setBeatmapFilter={setBeatmapFilter}
        setBeatmapQueryFilter={setQueryFilter}
      />
    </>

  )
}

export default BeatmapFilters