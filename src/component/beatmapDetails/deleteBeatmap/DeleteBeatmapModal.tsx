import Modal from "react-modal";
import React from "react";
import DeleteBeatmap from "./DeleteBeatmap";

interface DeleteBeatmapModalProps {
  beatmapId: number
  openDeleteBeatmap: boolean
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function DeleteBeatmapModal({beatmapId, openDeleteBeatmap, setOpenDeleteBeatmap, setOpenBeatmapId}: DeleteBeatmapModalProps) {
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
        <DeleteBeatmap beatmapId={beatmapId} setOpenDeleteBeatmap={setOpenDeleteBeatmap} setOpenBeatmapId={setOpenBeatmapId} />
      </Modal>
    </>
  )
}

export default DeleteBeatmapModal