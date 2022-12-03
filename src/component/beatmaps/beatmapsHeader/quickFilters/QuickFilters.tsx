import React, {useEffect, useState} from "react";
import {
  AvailableQuickFilter,
  BeatmapFilter,
  BeatmapPage,
  BeatmapStatus,
  Gamemode,
  UserContext
} from "../../../../models/Types";
import "./QuickFilters.scss";
import AddQuickFilter from "./AddQuickFilter";
import {cloneDeep, remove} from "lodash";
import MyIconsFilter from "./availableFilters/MyIconsFilter";
import MissingNominatorFilter from "./availableFilters/MissingNominatorFilter";
import GamemodeQuickFilter from "./availableFilters/GamemodeQuickFilter";
import StatusQuickFilter from "./availableFilters/StatusQuickFilter";

interface QuickFiltersProps {
  beatmapPage: BeatmapPage
  userContext: UserContext | undefined
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function QuickFilters({beatmapPage, userContext, beatmapFilter, setBeatmapFilter, setBeatmapQueryFilter}: QuickFiltersProps) {
  const[filters, setFilters] = useState<AvailableQuickFilter<any>[]>([])
  const availableQuickFilters: AvailableQuickFilter<any>[] = [
    MyIconsFilter({userContext, initialBeatmapFilter: beatmapFilter}),
    MissingNominatorFilter({gamemode: Gamemode.Osu, initialBeatmapFilter: beatmapFilter}),
    MissingNominatorFilter({gamemode: Gamemode.Taiko, initialBeatmapFilter: beatmapFilter}),
    MissingNominatorFilter({gamemode: Gamemode.Catch, initialBeatmapFilter: beatmapFilter}),
    MissingNominatorFilter({gamemode: Gamemode.Mania, initialBeatmapFilter: beatmapFilter}),
    StatusQuickFilter({status: BeatmapStatus.Qualified, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Nominated, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Disqualified, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Reset, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Pending, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Ranked, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Graved, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    StatusQuickFilter({status: BeatmapStatus.Unfinished, initialBeatmapFilter: beatmapFilter, page: beatmapPage}),
    GamemodeQuickFilter({gamemode: Gamemode.Osu, initialBeatmapFilter: beatmapFilter}),
    GamemodeQuickFilter({gamemode: Gamemode.Taiko, initialBeatmapFilter: beatmapFilter}),
    GamemodeQuickFilter({gamemode: Gamemode.Catch, initialBeatmapFilter: beatmapFilter}),
    GamemodeQuickFilter({gamemode: Gamemode.Mania, initialBeatmapFilter: beatmapFilter})
  ]

  useEffect(() => {
    let newSelectedFilters: AvailableQuickFilter<any>[] = []

    availableQuickFilters.forEach(filter => {
      let shouldBeSelected = filter.shouldBeSelected(filter.value, beatmapFilter)

      if (shouldBeSelected) {
        newSelectedFilters.push(filter)
      }
    })

    if (newSelectedFilters !== filters) {
      setFilters(newSelectedFilters)
    }
  }, [beatmapFilter])

  return (
    <div className={"quick-filters"}>
      <AddQuickFilter
        availableQuickFilters={availableQuickFilters}
        selectedFilters={filters}
        setSelectedFilters={setFilters}
        beatmapFilter={beatmapFilter}
        setBeatmapFilter={setBeatmapFilter}
        setBeatmapQueryFilter={setBeatmapQueryFilter}
      />
      {filters?.map((filter, index) =>
        <QuickFilter
          key={`quick-filter-${index}`}
          filter={filter}
          onClick={() => {
            let newFilters = cloneDeep(filters)
            remove(newFilters, value => value.key === filter.key)
            setFilters(newFilters)
          }}
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setBeatmapQueryFilter={setBeatmapQueryFilter}
        />
      )}
    </div>
  )
}

interface QuickFilterProps {
  filter: AvailableQuickFilter<any>
  onClick: () => void
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function QuickFilter({ filter, onClick, beatmapFilter, setBeatmapFilter, setBeatmapQueryFilter }: QuickFilterProps) {
  function onRemove() {
    let beatmapFilterCopy = cloneDeep(beatmapFilter)
    let newBeatmapFilter = filter.onRemove(filter.value, beatmapFilterCopy)
    console.log({newBeatmapFilter})
    setBeatmapFilter(newBeatmapFilter)
    setBeatmapQueryFilter(newBeatmapFilter)
    onClick()
    filter.setSelected(false)
  }


  return (
    <div className={"quick-filter"}>
      <button
        onClick={onRemove}
        className={"beatmap-button quick-filter-active"}
      >
        {filter.icon &&
          filter.icon
        }
        <div className='beatmap-button-text'>
          {filter.label}
        </div>
      </button>
    </div>
  )
}

export default QuickFilters