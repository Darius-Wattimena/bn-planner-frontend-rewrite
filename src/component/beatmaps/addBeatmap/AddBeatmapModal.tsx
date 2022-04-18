import Modal from "react-modal";
import React from "react";
import AddBeatmap from "./AddBeatmap";
import './AddBeatmap.scss';

interface AddBeatmapModalProps {
  openAddBeatmap: boolean
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function AddBeatmapModal({openAddBeatmap, setOpenAddBeatmap, setOpenBeatmapId}: AddBeatmapModalProps) {
  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={openAddBeatmap}
        onRequestClose={() => setOpenAddBeatmap(false)}
        contentLabel="Add Beatmap"
        className={"add-beatmap-modal"}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <AddBeatmap setOpenAddBeatmap={setOpenAddBeatmap} setOpenBeatmapId={setOpenBeatmapId} />
      </Modal>
    </>
  )
}

export default AddBeatmapModal