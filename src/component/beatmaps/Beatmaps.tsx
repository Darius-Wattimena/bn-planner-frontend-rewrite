import React from "react";
import {Beatmap, BeatmapFilter, PageLimit, UserContext, ViewMode} from "../../models/Types";
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
  filterMyIcons: () => void
  beatmapFilter: BeatmapFilter
  userContext: UserContext | undefined
}

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
    total,
    beatmapFilter,
    filterMyIcons,
    userContext
  }: BeatmapsProps
) {

  return (
    <>
      <BeatmapsHeader
        userContext={userContext} setShowBeatmapFilter={setShowBeatmapFilter} viewMode={viewMode}
        setViewMode={setViewMode} filterMyIcons={filterMyIcons} beatmapFilter={beatmapFilter}/>
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