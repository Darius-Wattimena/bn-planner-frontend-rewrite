import React, {useEffect} from "react";
import {Beatmap, PageLimit, ViewMode} from "../../models/Types";
import {IndexRange} from "react-virtualized";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";
import BeatmapTable from "./tableView/BeatmapTable";
import BeatmapCards from "./cardView/BeatmapCards";

interface BeatmapsProps {
  loadedBeatmapData: Array<Beatmap | undefined>
  fetchNewData: (range: IndexRange) => void
  fetchNewPage: (pageNumber: number, pageLimit: PageLimit) => void
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  resetPage: () => void
  viewMode: ViewMode
  total: number
}

function Beatmaps(
  {
    loadedBeatmapData,
    fetchNewData,
    fetchNewPage,
    openBeatmapId,
    setOpenBeatmapId,
    resetPage,
    viewMode,
    total
  }: BeatmapsProps
) {
  let pageViewModeClassName = ""

  useEffect(() => {
    pageViewModeClassName = (viewMode === "CARDS") ? "beatmap-page-cards" : "beatmap-page-table"
  }, [viewMode])

  return (
    <>
      <div className={`page-container beatmap-page ${pageViewModeClassName}`}>
        <div className={"page-container-content beatmap-listing-container"}>
          <div className={"beatmap-listing"}>
            {(viewMode === "CARDS") ? (
              <BeatmapCards
                loadedBeatmapData={loadedBeatmapData}
                fetchNewData={fetchNewData}
                setOpenBeatmapId={setOpenBeatmapId}
              />
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
      <BeatmapDetailsContainer
        resetPage={resetPage}
        openBeatmapId={openBeatmapId}
        setOpenBeatmapId={setOpenBeatmapId}
      />
      <div className={"page-spacer"} />
    </>
  )
}

export default Beatmaps