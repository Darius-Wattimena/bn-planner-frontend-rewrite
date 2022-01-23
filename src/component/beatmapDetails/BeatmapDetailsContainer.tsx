import React, {useEffect, useState} from "react";
import {DetailedBeatmap, User} from "../../models/Types";
import './BeatmapsDetails.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {BeatmapDetailsModal} from "./BeatmapDetailsModal";

interface BeatmapDetailsContainerParams {
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapDetailsContainer({ openBeatmapId, setOpenBeatmapId }: BeatmapDetailsContainerParams) {
  const [beatmap, setBeatmap] = useState<DetailedBeatmap>()

  let tempUsers = require('./../beatmaps/temp-users.json') as User[];

  const [{data, loading}, execute] = useAxios<DetailedBeatmap>("", { manual: true })

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

  return (<BeatmapDetailsModal beatmap={beatmap} openBeatmapId={openBeatmapId} users={tempUsers} setOpenBeatmapId={setOpenBeatmapId} />)
}

export default BeatmapDetailsContainer