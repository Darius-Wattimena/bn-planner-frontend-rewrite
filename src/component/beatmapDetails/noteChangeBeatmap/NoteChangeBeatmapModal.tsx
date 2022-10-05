import Modal from "react-modal";
import React from "react";
import NoteChangeBeatmap from "./NoteChangeBeatmap";
import {Beatmap} from "../../../models/Types";
import "./NoteChangeBeatmap.scss"

interface NoteChangeBeatmapModalProps {
  beatmap: Beatmap
  setBeatmap: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function NoteChangeBeatmapModal(
  {
    beatmap,
    setBeatmap,
    isModalOpen,
    setIsModalOpen,
    setRefreshOnClose
  }: NoteChangeBeatmapModalProps) {
  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Change Beatmap Status"
      className={"note-change-beatmap-modal"}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <NoteChangeBeatmap beatmap={beatmap} setBeatmap={setBeatmap} setIsModalOpen={setIsModalOpen} setRefreshOnClose={setRefreshOnClose} />
    </Modal>
  )
}

export default NoteChangeBeatmapModal