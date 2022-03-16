import React from "react";
import {ImFilter, ImPlus} from "react-icons/im";
import "./BeatmapsHeader.scss"

interface BeatmapsHeaderProps {
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
}

function BeatmapsHeader({setShowBeatmapFilter}: BeatmapsHeaderProps) {
  return (
    <div className={"beatmaps-header"}>
      <div className='beatmaps-header-left'>
        <a href='#' onClick={() => setShowBeatmapFilter(true)} className='beatmap-button'>
          <ImFilter/>
          <div className='beatmap-button-text'>
            Filters
          </div>
        </a>
      </div>
      <div className='beatmaps-header-right'>
        <a href='#' className='beatmap-button'>
          <ImPlus />
          <div className='beatmap-button-text'>
            Add beatmap
          </div>
        </a>
      </div>
    </div>
  )
}

export default BeatmapsHeader