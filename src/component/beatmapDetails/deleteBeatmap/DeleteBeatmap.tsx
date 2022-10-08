import React from "react";
import {ImCheckmark, ImCross} from "react-icons/im";
import "./DeleteBeatmap.scss"
import useAxios from "axios-hooks";
import {Beatmap} from "../../../models/Types";
import Api from "../../../resources/Api";

interface DeleteBeatmapProps {
  beatmap: Beatmap
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function DeleteBeatmap({beatmap, setOpenDeleteBeatmap, setOpenBeatmapId}: DeleteBeatmapProps) {
  const [{}, execute] = useAxios<Beatmap>("", {manual: true})

  function onDeleteBeatmap() {
    execute(Api.deleteBeatmap(beatmap.osuId)).then(() => {
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