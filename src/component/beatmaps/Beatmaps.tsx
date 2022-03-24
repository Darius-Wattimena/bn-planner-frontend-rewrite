import React from "react";
import {Beatmap, PageLimit, ViewMode} from "../../models/Types";
import {IndexRange} from "react-virtualized";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";
import './Beatmaps.scss';
import BeatmapsHeader from "./beatmapsHeader/BeatmapsHeader";
import BeatmapTable from "./tableView/BeatmapTable";
import BeatmapCards from "./cardView/BeatmapCards";

interface BeatmapsProps {
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
  loadedBeatmapData: Array<Beatmap | undefined>
  fetchNewData: (range: IndexRange) => void
  fetchNewPage: (pageNumber: number, pageLimit: PageLimit) => void
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  resetPage: () => void
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  total: number
}

// TODO add support for infinite scrolling
function Beatmaps(
  {
    setShowBeatmapFilter,
    loadedBeatmapData,
    fetchNewData,
    fetchNewPage,
    openBeatmapId,
    setOpenBeatmapId,
    resetPage,
    viewMode,
    setViewMode,
    total
  }: BeatmapsProps
) {

  return (
    <>
      <BeatmapsHeader setShowBeatmapFilter={setShowBeatmapFilter} viewMode={viewMode} setViewMode={setViewMode}/>
      <div className={"page-container beatmap-page"}>
        <div className={"page-container-content beatmap-listing-container"}>
          <div className={"beatmap-listing"}>
            {(viewMode === "CARDS") ? (
              <BeatmapCards loadedBeatmapData={loadedBeatmapData} fetchNewData={fetchNewData}
                            setOpenBeatmapId={setOpenBeatmapId}/>
            ) : (
              <BeatmapTable
                beatmaps={loadedBeatmapData}
                fetchNewPage={fetchNewPage}
                setOpenBeatmapId={setOpenBeatmapId}
                total={total}
              />
            )}
          </div>
        </div>
      </div>
      <BeatmapDetailsContainer resetPage={resetPage} openBeatmapId={openBeatmapId} setOpenBeatmapId={setOpenBeatmapId}/>
    </>
  )
}

export default Beatmaps