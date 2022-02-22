import React, {useEffect, useState} from "react";
import BeatmapNominatorFilter from "./BeatmapNominatorFilter";
import {BeatmapFilter, NewBeatmapStatus, User} from "../../../models/Types";
import BeatmapStatusFilter from "./BeatmapStatusFilter";
import {debouncingFilter} from "../../../utils/FilterUtils";

interface BeatmapFilterProps {
  users: User[]
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapFilters({ users, beatmapFilter, setBeatmapFilter, setQueryFilter }: BeatmapFilterProps) {
  const [timeout, setTimeout] = useState<number>(0)

  function isNominator(user: User) {
    return user.role !== "GST" && user.role !== "OBS"
  }

  return (
    <div className={"beatmap-filter"}>
      <h3 className={"beatmap-filter-main-title"}>Beatmap Filters</h3>
      <div className={"beatmap-filter-status"}>
        <BeatmapStatusFilter
          statuses={Object.values(NewBeatmapStatus)}
          beatmapFilter={beatmapFilter}
          setBeatmapFormFilter={setBeatmapFilter}
          timeout={timeout}
          setQueryFilter={setQueryFilter}
        />
      </div>
      <div className={"beatmap-filter-nominators"}>
        <BeatmapNominatorFilter
          nominators={users.filter(isNominator)}
          beatmapFilter={beatmapFilter}
          setBeatmapFormFilter={setBeatmapFilter}
          timeout={timeout}
          setQueryFilter={setQueryFilter}
        />
      </div>
      <div className={"beatmap-filter-artist"}>
        <BeatmapTextFilter
          target={"artist"}
          label={"Artist"}
          beatmapFilter={beatmapFilter}
          setBeatmapFormFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}
          timeout={timeout}
          setTimeout={setTimeout}
        />
      </div>
      <div className={"beatmap-filter-title"}>
        <BeatmapTextFilter
          target={"title"}
          label={"Title"}
          beatmapFilter={beatmapFilter}
          setBeatmapFormFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}
          timeout={timeout}
          setTimeout={setTimeout}
        />
      </div>
      <div className={"beatmap-filter-mapper"}>
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
  )
}

interface BeatmapTextFilterProps {
  target: keyof BeatmapFilter
  label: string
  beatmapFilter: BeatmapFilter
  setBeatmapFormFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  timeout: number
  setTimeout: React.Dispatch<React.SetStateAction<number>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapTextFilter({ target, label, beatmapFilter, setBeatmapFormFilter, timeout, setTimeout, setQueryFilter }: BeatmapTextFilterProps) {
  const value = beatmapFilter[target]

  function updateBeatmapFilter(newValue: string) {
    debouncingFilter(
      beatmapFilter,
      timeout,
      target,
      newValue,
      setBeatmapFormFilter,
      setTimeout,
      setQueryFilter
    )
  }

  return (
    <div className={`beatmap-filter-textbox`}>
      <label htmlFor={target}>
        {label}
      </label>
      <input
        id={target}
        value={value?.toString()}
        onChange={event => {
          updateBeatmapFilter(event.target.value)
        }}
      />
    </div>
  )
}

export default BeatmapFilters