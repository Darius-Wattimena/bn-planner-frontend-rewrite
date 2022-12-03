import React from "react";
import {AvailableQuickFilter, BeatmapFilter} from "../../../../models/Types";
import {cloneDeep} from "lodash";

interface AvailableQuickFiltersListProps {
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  selectedFilters: AvailableQuickFilter<any>[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<AvailableQuickFilter<any>[]>>
  filters: AvailableQuickFilter<any>[]
}

function AvailableQuickFiltersList(
  {
    beatmapFilter,
    setBeatmapFilter,
    setBeatmapQueryFilter,
    filters,
    selectedFilters,
    setSelectedFilters
  }: AvailableQuickFiltersListProps) {
  return (
    <div className={"beatmap-filter"}>
      <div className={"beatmap-filter-groups"}>
        <div className={"available-quick-filters"}>
          {filters.filter(it => !it.selected && !it.disabled).map((filter, index) => {
            return (
              <div
                key={`available-quick-filter-${index}`}
                className={"available-quick-filter-container"}>
                <div
                  className={"available-quick-filter"}
                  onClick={() => {
                    let beatmapFilterCopy = cloneDeep(beatmapFilter)
                    let newBeatmapFilter = filter.onSelect(filter.value, beatmapFilterCopy)
                    setBeatmapFilter(newBeatmapFilter)
                    setBeatmapQueryFilter(newBeatmapFilter)

                    // Add the item to the selected filters
                    let newSelectedFilters = cloneDeep(selectedFilters)
                    newSelectedFilters.push(filter)
                    setSelectedFilters(newSelectedFilters)

                    filter.setSelected(true)
                  }}
                >
                  {filter.icon &&
                    <div className={"available-quick-filter-icon"}>{filter.icon}</div>
                  }
                  <div className={"available-quick-filter-label"}>
                    {filter.label}
                  </div>
                  <div className={"available-quick-filter-description"}>
                    {filter.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AvailableQuickFiltersList