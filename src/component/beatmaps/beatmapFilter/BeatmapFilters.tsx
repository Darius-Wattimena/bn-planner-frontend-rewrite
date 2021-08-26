import React, {useEffect, useState} from "react";
import BeatmapNominatorFilter from "./BeatmapNominatorFilter";
import {BeatmapFilter, User} from "../../../models/Types";
import BeatmapStatusFilter from "./BeatmapStatusFilter";
import {BEATMAP_STATUS} from "../../../Constants";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  page: "PENDING",
  hideWithTwoNominators: false
}

interface BeatmapFilterProps {
  users: User[]
}

function BeatmapFilters({ users }: BeatmapFilterProps) {
  const [beatmapFilters, setBeatmapFilters] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [timeout, setTimeout] = useState<number>(0)

  useEffect(() => {
    console.log({ beatmapFilters, queryFilter })
  }, [beatmapFilters, queryFilter])

  function isNominator(user: User) {
    return user.role !== "GST" && user.role !== "OBS"
  }

  return (
    <div className={"beatmap-filter"}>
      <div className={"beatmap-filter-nominators"}>
        <BeatmapNominatorFilter
          nominators={users.filter(isNominator)}
          beatmapFilter={beatmapFilters}
          setBeatmapFormFilter={setBeatmapFilters}
          timeout={timeout}
          setQueryFilter={setQueryFilter}
        />
      </div>
      <div className={"beatmap-filter-status"}>
        <BeatmapStatusFilter
          statuses={BEATMAP_STATUS.filter(status => status.id !== 6 && status.id !== 7)}
          beatmapFilter={beatmapFilters}
          setBeatmapFormFilter={setBeatmapFilters}
          timeout={timeout}
          setQueryFilter={setQueryFilter}
        />

      </div>
      <div className={"beatmap-filter-artist"}>

      </div>
      <div className={"beatmap-filter-title"}>

      </div>
      <div className={"beatmap-filter-mapper"}>

      </div>
    </div>
  )
}

export default BeatmapFilters