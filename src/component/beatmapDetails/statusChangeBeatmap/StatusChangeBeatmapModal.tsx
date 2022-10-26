import Modal from "react-modal";
import React from "react";
import StatusChangeBeatmap from "./StatusChangeBeatmap";
import {Beatmap, BeatmapStatus} from "../../../models/Types";

interface StatusChangeBeatmapModalProps {
  beatmap: Beatmap
  newStatus: BeatmapStatus
  isChangeModalOpen: boolean
  setIsChangeModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function StatusChangeBeatmapModal(
  {
    beatmap,
    newStatus,
    isChangeModalOpen,
    setIsChangeModalOpen,
    setOpenBeatmapId,
    setRefreshOnClose
  }: StatusChangeBeatmapModalProps) {
  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={isChangeModalOpen}
      onRequestClose={() => setIsChangeModalOpen(false)}
      contentLabel="Change Beatmap Status"
      className={"change-beatmap-status-modal"}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <StatusChangeBeatmap beatmap={beatmap} newStatus={newStatus} setIsChangeModalOpen={setIsChangeModalOpen} setOpenBeatmapId={setOpenBeatmapId} setRefreshOnClose={setRefreshOnClose} />
    </Modal>
  )
}

export default StatusChangeBeatmapModal