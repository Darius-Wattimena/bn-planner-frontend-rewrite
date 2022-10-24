import React from "react";
import {ImFilter, ImPlus, ImUser} from "react-icons/im";
import "./BeatmapsHeader.scss"
import {BeatmapPage, UserContext, ViewMode} from "../../../models/Types";

interface BeatmapsHeaderProps {
  viewMode: ViewMode
  filterMyIcons: () => void
  filteringOnOwnUser: boolean
  openAddBeatmap: boolean
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  page: BeatmapPage
  userContext: UserContext | undefined
}

function BeatmapsHeader(
  {
    userContext,
    viewMode,
    filterMyIcons,
    filteringOnOwnUser,
    openAddBeatmap,
    setOpenAddBeatmap,
    page
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
          <button
            disabled={userContext?.permission.osuRole === "Mapper"}
            onClick={() => filterMyIcons()}
            className={`beatmap-button ${filteringOnOwnUser ? "quick-filter-active" : ""}`}
          >
            <ImUser/>
            <div className='beatmap-button-text'>
              My Icons
            </div>
          </button>
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