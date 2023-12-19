import React from "react";
import {ImCheckmark, ImCross} from "react-icons/im";
import "./SyncBeatmap.scss"
import useAxios from "axios-hooks";
import {Beatmap} from "../../../models/Types";
import Api from "../../../resources/Api";

interface SyncBeatmapProps {
  beatmap: Beatmap
  setOpenSyncBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function SyncBeatmap(props: SyncBeatmapProps) {
  const [{}, execute] = useAxios<Beatmap>("", {manual: true})

  function onSyncBeatmap() {
    execute(Api.syncSingleBeatmap(props.beatmap.osuId)).then(() => {
      props.setOpenSyncBeatmap(false)
      props.setRefreshOnClose(true)
      props.setOpenBeatmapId(undefined)
    })
  }

  let beatmap = props.beatmap

  return (
    <div className="modal-container">
      <div className={"sub-container"}>
        <div className={"sub-container-title"}>
          Sync beatmap
        </div>
        <div className={"sub-container-content"}>
          <p>
            You are about to sync the following:
          </p>
          {`${beatmap.artist} - ${beatmap.title} made by ${beatmap.mapper.username}`}
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          props.setOpenSyncBeatmap(false)
        }} className={"button button-cancel button-text"}>
          <ImCross/> Cancel
        </button>
        <button onClick={() => {
          onSyncBeatmap()
        }} className={"button button-submit button-text"}>
          <ImCheckmark/> Sync Beatmap
        </button>
      </div>
    </div>
  )
}

export default SyncBeatmap