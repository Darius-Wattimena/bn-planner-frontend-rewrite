import Modal from "react-modal";
import React from "react";
import AddBeatmap from "./AddBeatmap";

interface AddBeatmapModalProps {
  openAddBeatmap: boolean
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddBeatmapModal({openAddBeatmap, setOpenAddBeatmap}: AddBeatmapModalProps) {
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
        <AddBeatmap setOpenAddBeatmap={setOpenAddBeatmap} />
      </Modal>
    </>
  )
}

export default AddBeatmapModal