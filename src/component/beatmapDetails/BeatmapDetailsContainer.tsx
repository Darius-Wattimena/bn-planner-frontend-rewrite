import React, {useEffect, useState} from "react";
import {Beatmap} from "../../models/Types";
import './BeatmapsDetails.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {BeatmapDetailsModal} from "./BeatmapDetailsModal";

interface BeatmapDetailsContainerParams {
  resetPage: () => void
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapDetailsContainer({resetPage, openBeatmapId, setOpenBeatmapId}: BeatmapDetailsContainerParams) {
  const [beatmap, setBeatmap] = useState<Beatmap>()
  const [refreshOnClose, setRefreshOnClose] = useState<boolean>(false)

  const [{data, loading}, execute] = useAxios<Beatmap>("", {manual: true})

  useEffect(() => {
    if (openBeatmapId) {
      execute(Api.fetchBeatmapById(Number(openBeatmapId)))
    }

    if (!openBeatmapId && refreshOnClose) {
      resetPage()
    }
  }, [openBeatmapId])

  useEffect(() => {
    if (data) {
      setBeatmap(data)
    }
  }, [data])

  useEffect(() => {
    // Some update happened inside the modal
    if (beatmap && beatmap !== data) {
      setRefreshOnClose(true)
    }

  }, [beatmap])

  return <BeatmapDetailsModal
    beatmap={beatmap}
    loading={loading}
    setBeatmap={setBeatmap}
    openBeatmapId={openBeatmapId}
    setOpenBeatmapId={setOpenBeatmapId}
  />
}

export default BeatmapDetailsContainer