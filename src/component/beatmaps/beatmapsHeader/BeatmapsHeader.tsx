import React from "react";
import {ImFilter, ImMap, ImPlus, ImTable, ImUser} from "react-icons/im";
import "./BeatmapsHeader.scss"
import {BeatmapPage, UserContext, ViewMode} from "../../../models/Types";

interface BeatmapsHeaderProps {
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
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
    setViewMode,
    filterMyIcons,
    filteringOnOwnUser,
    openAddBeatmap,
    setOpenAddBeatmap,
    page
  }: BeatmapsHeaderProps
) {
  const cardsButtonClassname = viewMode === "TABLE" ? "beatmap-button-cards-beta" : ""

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
          <div className={"viewmode-button"}>
            <button className={`beatmap-button ${cardsButtonClassname}`} onClick={() => {
              if (viewMode === "CARDS") {
                setViewMode("TABLE")
              } else {
                setViewMode("CARDS")
              }
            }}>
              {viewMode === "TABLE" &&
              <div className={"beta-label"}>
                BETA
              </div>
              }
              {viewMode === "CARDS" ? <ImTable/> : <ImMap/>}
              <div className={`beatmap-button-text`}>
                {viewMode === "CARDS" ? "Table" : "Card"} view
              </div>
            </button>
          </div>
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