import React from "react";
import "./StatusChangeBeatmap.scss"
import useAxios from "axios-hooks";
import Api from "../../../resources/Api";
import {Beatmap, BeatmapStatus} from "../../../models/Types";
import {FaCheck, FaXmark} from "react-icons/fa6";

interface StatusChangeBeatmapProps {
  beatmap: Beatmap
  newStatus: BeatmapStatus
  setIsChangeModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StatusChangeBeatmap({beatmap, newStatus, setIsChangeModalOpen, setOpenBeatmapId, setRefreshOnClose}: StatusChangeBeatmapProps) {
  const [, execute] = useAxios<boolean>("", {manual: true})

  function onChangeBeatmapStatus() {
    execute(Api.updateBeatmapStatus(beatmap.osuId, newStatus)).then(() => {
      setIsChangeModalOpen(false)
      setRefreshOnClose(true)
      setOpenBeatmapId(undefined)
    })
  }

  return (
    <div className="modal-container">
      <div className={"sub-container"}>
        <div className={"sub-container-title"}>
          Change beatmap from {beatmap.status} to {newStatus}
        </div>
        <div className={"sub-container-content"}>
          Are you sure that you want to change the status of <b>{beatmap.artist} - {beatmap.title}</b> by {beatmap.mapper.username} to <b>{newStatus}</b>?
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setIsChangeModalOpen(false)
        }} className={"button button-cancel button-text"}>
          <FaXmark /> Cancel
        </button>
        <button onClick={() => {
          onChangeBeatmapStatus()
        }} className={"button button-submit button-text"}>
          <FaCheck /> Change Status
        </button>
      </div>
    </div>
  )
}
