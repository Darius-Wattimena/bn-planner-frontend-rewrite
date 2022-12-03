import React from "react";
import {ImFilter, ImPlus} from "react-icons/im";
import "./BeatmapsHeader.scss"
import {BeatmapFilter, BeatmapPage, UserContext} from "../../../models/Types";
import QuickFilters from "./quickFilters/QuickFilters";

interface BeatmapsHeaderProps {
  openAddBeatmap: boolean
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  page: BeatmapPage
  userContext: UserContext | undefined
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapsHeader(
  {
    userContext,
    openAddBeatmap,
    setOpenAddBeatmap,
    page,
    beatmapFilter,
    setBeatmapFilter,
    setBeatmapQueryFilter
  }: BeatmapsHeaderProps
) {
  return (
    <div className={"beatmaps-header"}>
      <div className={"beatmaps-header-container"}>
        <div className='beatmaps-header-left'>
          <button data-tip data-for='filter' data-event='click' className='beatmap-button'>
            <ImFilter/>
            <div className='beatmap-button-text'>
              Filters
            </div>
          </button>
          <QuickFilters
            beatmapPage={page}
            userContext={userContext}
            beatmapFilter={beatmapFilter}
            setBeatmapFilter={setBeatmapFilter}
            setBeatmapQueryFilter={setBeatmapQueryFilter}
          />
        </div>
        <div className='beatmaps-header-right'>
          <button disabled={userContext?.permission.osuRole === "Mapper" || openAddBeatmap || page !== "PENDING"} className='beatmap-button add-beatmap-button' onClick={() => setOpenAddBeatmap(true)}>
            <ImPlus/>
            <div className='beatmap-button-text'>
              Add beatmap
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BeatmapsHeader