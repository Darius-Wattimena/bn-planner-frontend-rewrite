import React from "react";
import {ImCheckmark, ImCross} from "react-icons/im";
import "./DeleteBeatmap.scss"
import useAxios from "axios-hooks";
import {Beatmap} from "../../../models/Types";
import Api from "../../../resources/Api";

interface DeleteBeatmapProps {
  beatmapId: number
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function DeleteBeatmap({beatmapId, setOpenDeleteBeatmap, setOpenBeatmapId}: DeleteBeatmapProps) {
  const [, execute] = useAxios<Beatmap>("", {manual: true})

  function onDeleteBeatmap() {
    execute(Api.deleteBeatmap(beatmapId)).then(() => {
      setOpenDeleteBeatmap(false)
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
          Are you sure that you want to delete the following beatmap from the planner?
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setOpenDeleteBeatmap(false)
        }} className={"button button-cancel button-text"}>
          <ImCross/> Cancel
        </button>
        <button onClick={() => {
          onDeleteBeatmap()
        }} className={"button button-submit button-text"}>
          <ImCheckmark/> Delete Beatmap
        </button>
      </div>
    </div>
  )
}

export default DeleteBeatmap