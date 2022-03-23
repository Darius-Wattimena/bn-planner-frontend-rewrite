import React from "react";
import {ImCart, ImFilter, ImMap, ImPlus, ImTable} from "react-icons/im";
import "./BeatmapsHeader.scss"
import {ViewMode} from "../../../models/Types";

interface BeatmapsHeaderProps {
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

function BeatmapsHeader({setShowBeatmapFilter, viewMode, setViewMode}: BeatmapsHeaderProps) {
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
        </div>
        <div className='beatmaps-header-right'>
          <a href='#' className='beatmap-button' onClick={() => {
            if (viewMode === "CARDS") {
              setViewMode("TABLE")
            } else {
              setViewMode("CARDS")
            }
          }}>
            {viewMode === "CARDS" ? <ImTable /> : <ImMap />}
            <div className='beatmap-button-text'>
              {viewMode === "CARDS" ? "Table" : "Card"} view
            </div>
          </a>
          <a href='#' className='beatmap-button'>
            <ImPlus />
            <div className='beatmap-button-text'>
              Add beatmap
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BeatmapsHeader