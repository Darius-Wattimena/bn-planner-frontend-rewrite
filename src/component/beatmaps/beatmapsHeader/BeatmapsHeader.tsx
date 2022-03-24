import React from "react";
import {ImFilter, ImMap, ImPlus, ImTable, ImUser} from "react-icons/im";
import "./BeatmapsHeader.scss"
import {BeatmapFilter, UserContext, ViewMode} from "../../../models/Types";

interface BeatmapsHeaderProps {
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  filterMyIcons: () => void
  beatmapFilter: BeatmapFilter
  userContext: UserContext | undefined
}

function BeatmapsHeader({setShowBeatmapFilter, viewMode, setViewMode, filterMyIcons, beatmapFilter, userContext}: BeatmapsHeaderProps) {
  const filteringOnOwnUser = beatmapFilter.nominators.find(it => it == userContext?.user.osuId) !== undefined

  return (
    <div className={"beatmaps-header"}>
      <div className={"beatmaps-header-container"}>
        <div className='beatmaps-header-left'>
          <button onClick={() => setShowBeatmapFilter(true)} className='beatmap-button'>
            <ImFilter/>
            <div className='beatmap-button-text'>
              Filters
            </div>
          </button>
          <button onClick={() => filterMyIcons()} className={`beatmap-button ${filteringOnOwnUser ? "quick-filter-active" : ""}`}>
            <ImUser/>
            <div className='beatmap-button-text'>
              My Icons
            </div>
          </button>
        </div>
        <div className='beatmaps-header-right'>
          <button className='beatmap-button' onClick={() => {
            if (viewMode === "CARDS") {
              setViewMode("TABLE")
            } else {
              setViewMode("CARDS")
            }
          }}>
            {viewMode === "CARDS" ? <ImTable/> : <ImMap/>}
            <div className='beatmap-button-text'>
              {viewMode === "CARDS" ? "Table" : "Card"} view
            </div>
          </button>
          <button className='beatmap-button'>
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