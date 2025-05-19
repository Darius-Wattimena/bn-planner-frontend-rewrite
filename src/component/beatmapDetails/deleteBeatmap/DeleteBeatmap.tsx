import React from "react";
import "./DeleteBeatmap.scss"
import useAxios from "axios-hooks";
import {Beatmap} from "../../../models/Types";
import Api from "../../../resources/Api";
import {FaCheck, FaXmark} from "react-icons/fa6";

interface DeleteBeatmapProps {
  beatmap: Beatmap
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteBeatmap({beatmap, setOpenDeleteBeatmap, setOpenBeatmapId, setRefreshOnClose}: DeleteBeatmapProps) {
  const [{}, execute] = useAxios<Beatmap>("", {manual: true})

  function onDeleteBeatmap() {
    execute(Api.deleteBeatmap(beatmap.osuId)).then(() => {
      setOpenDeleteBeatmap(false)
      setRefreshOnClose(true)
      setOpenBeatmapId(undefined)
    })
  }

  return (
    <div className="modal-container">
      <div className={"sub-container"}>
        <div className={"sub-container-title"}>
          Delete beatmap
        </div>
        <div className={"sub-container-content"}>
          <p>
            You are about to delete the following from the planner:
          </p>
          {`${beatmap.artist} - ${beatmap.title} made by ${beatmap.mapper.username}`}
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setOpenDeleteBeatmap(false)
        }} className={"button button-cancel button-text"}>
          <FaXmark /> Cancel
        </button>
        <button onClick={() => {
          onDeleteBeatmap()
        }} className={"button button-submit button-text"}>
          <FaCheck /> Delete Beatmap
        </button>
      </div>
    </div>
  )
}

export default DeleteBeatmap