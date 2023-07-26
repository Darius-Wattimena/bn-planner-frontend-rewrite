import React, {useEffect} from "react";
import {Beatmap, PageLimit, UserContext, ViewMode} from "../../models/Types";
import {IndexRange} from "react-virtualized";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";
import BeatmapTable from "./tableView/BeatmapTable";
import BeatmapCards from "./cardView/BeatmapCards";

interface BeatmapsProps {
  userContext: UserContext | undefined
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
    userContext,
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
  return (
    <>
      <div className={"page-container-content beatmap-listing-container"}>
        <div className={"beatmap-listing"}>
          <BeatmapTable
            beatmaps={loadedBeatmapData}
            fetchNewPage={fetchNewPage}
            setOpenBeatmapId={setOpenBeatmapId}
            total={total}
          />
        </div>
      </div>
      <BeatmapDetailsContainer
        userContext={userContext}
        resetPage={resetPage}
        openBeatmapId={openBeatmapId}
        setOpenBeatmapId={setOpenBeatmapId}
      />
    </>
  )
}

export default Beatmaps