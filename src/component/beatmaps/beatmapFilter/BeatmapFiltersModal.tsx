import Modal from "react-modal";
import React from "react";
import {BeatmapFilter} from "../../../models/Types";
import BeatmapFilters from "./BeatmapFilters";

interface BeatmapFiltersModalProps {
  showBeatmapFilter: boolean
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

export function BeatmapFiltersModal({showBeatmapFilter, setShowBeatmapFilter, beatmapFilter, setBeatmapFilter, setQueryFilter}: BeatmapFiltersModalProps) {
  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={showBeatmapFilter}
      onRequestClose={() => setShowBeatmapFilter(false)}
      contentLabel="Beatmap Filters"
      className={"beatmap-details-modal"}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div className={"beatmap-details-container"}>
        <BeatmapFilters beatmapFilter={beatmapFilter} setBeatmapFilter={setBeatmapFilter} setQueryFilter={setQueryFilter} />
      </div>
    </Modal>
  )
}

export default BeatmapFiltersModal