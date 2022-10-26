import {AvailableQuickFilter, BeatmapFilter} from "../../../../models/Types";
import {ImFilter} from "react-icons/im";
import ReactTooltip from "react-tooltip";
import React from "react";
import AvailableQuickFiltersList from "./AvailableQuickFiltersList";

interface AddQuickFilterProps {
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  availableQuickFilters: AvailableQuickFilter<any>[]
  selectedFilters: AvailableQuickFilter<any>[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<AvailableQuickFilter<any>[]>>
}

function AddQuickFilter(
  {availableQuickFilters, beatmapFilter, setBeatmapFilter, setBeatmapQueryFilter, selectedFilters, setSelectedFilters}: AddQuickFilterProps
) {
  return (
    <>
      <button data-tip data-for='add-quick-filter' data-event='click' className='beatmap-button'>
        <ImFilter/>
        <div className='beatmap-button-text'>
          Quick Filters
        </div>
      </button>
      <ReactTooltip id='add-quick-filter' place='bottom' effect='solid' clickable={true} className={"beatmap-filter-tooltip"}>
        <AvailableQuickFiltersList
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setBeatmapQueryFilter={setBeatmapQueryFilter}
          filters={availableQuickFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </ReactTooltip>
    </>
  )
}

export default AddQuickFilter