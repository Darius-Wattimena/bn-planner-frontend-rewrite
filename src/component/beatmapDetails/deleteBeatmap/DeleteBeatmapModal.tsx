import Modal from "react-modal";
import React from "react";
import DeleteBeatmap from "./DeleteBeatmap";
import {Beatmap} from "../../../models/Types";

interface DeleteBeatmapModalProps {
  beatmap: Beatmap
  openDeleteBeatmap: boolean
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function DeleteBeatmapModal({beatmap, openDeleteBeatmap, setOpenDeleteBeatmap, setOpenBeatmapId}: DeleteBeatmapModalProps) {
  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={openDeleteBeatmap}
        onRequestClose={() => setOpenDeleteBeatmap(false)}
        contentLabel="Delete Beatmap"
        className={"delete-beatmap-modal"}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <DeleteBeatmap beatmap={beatmap} setOpenDeleteBeatmap={setOpenDeleteBeatmap} setOpenBeatmapId={setOpenBeatmapId} />
      </Modal>
    </>
  )
}

export default DeleteBeatmapModal