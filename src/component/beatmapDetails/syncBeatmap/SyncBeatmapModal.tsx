import Modal from "react-modal";
import React from "react";
import SyncBeatmap from "./SyncBeatmap";
import {Beatmap} from "../../../models/Types";

interface SyncBeatmapModalProps {
  beatmap: Beatmap
  openSyncBeatmap: boolean
  setOpenSyncBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function SyncBeatmapModal(props: SyncBeatmapModalProps) {
  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={props.openSyncBeatmap}
        onRequestClose={() => props.setOpenSyncBeatmap(false)}
        contentLabel="Sync Beatmap"
        className={"sync-beatmap-modal"}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <SyncBeatmap
          beatmap={props.beatmap}
          setOpenSyncBeatmap={props.setOpenSyncBeatmap}
          setOpenBeatmapId={props.setOpenBeatmapId}
          setRefreshOnClose={props.setRefreshOnClose}/>
      </Modal>
    </>
  )
}

export default SyncBeatmapModal