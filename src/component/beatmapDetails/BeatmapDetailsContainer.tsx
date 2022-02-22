import React, {useEffect, useState} from "react";
import {Beatmap} from "../../models/Types";
import './BeatmapsDetails.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {BeatmapDetailsModal} from "./BeatmapDetailsModal";

interface BeatmapDetailsContainerParams {
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapDetailsContainer({ openBeatmapId, setOpenBeatmapId }: BeatmapDetailsContainerParams) {
  const [beatmap, setBeatmap] = useState<Beatmap>()

  const [{data, loading}, execute] = useAxios<Beatmap>("", { manual: true })

  useEffect(() => {
    if (openBeatmapId) {
      execute(Api.fetchBeatmapById(Number(openBeatmapId)))
    }
  }, [openBeatmapId])

  useEffect(() => {
    if (data) {
      setBeatmap(data)
    }
  }, [data])

  if (beatmap) {
    return (<BeatmapDetailsModal beatmap={beatmap} openBeatmapId={openBeatmapId} setOpenBeatmapId={setOpenBeatmapId} />)
  } else {
    return <div />
  }
}

export default BeatmapDetailsContainer