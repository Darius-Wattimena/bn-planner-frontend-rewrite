import {AvailableQuickFilter, BeatmapFilter} from "../../../../models/Types";
import {FaFilter} from "react-icons/fa6";
import React from "react";
import AvailableQuickFiltersList from "./AvailableQuickFiltersList";
import {Tooltip} from "react-tooltip";

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
      <button data-tooltip-id="add-quick-filter" className='accent'>
        <FaFilter />
        <div className='beatmap-button-text'>
          Filters
        </div>
      </button>
      <Tooltip id='add-quick-filter' place='bottom' clickable openOnClick closeEvents={{click: true}} className={"beatmap-filter-tooltip"} border="1px solid #4f6ac9">
        <AvailableQuickFiltersList
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setBeatmapQueryFilter={setBeatmapQueryFilter}
          filters={availableQuickFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </Tooltip>
    </>
  )
}

export default AddQuickFilter