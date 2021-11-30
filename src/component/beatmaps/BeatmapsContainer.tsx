import React, {useEffect, useState} from "react";
import {Beatmap, BeatmapFilter, FindResponse, User} from "../../models/Types";
import './Beatmaps.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import Beatmaps from "./Beatmaps";
import _ from "lodash";
import {IndexRange} from "react-virtualized";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  page: "PENDING",
  hideWithTwoNominators: false
}

function BeatmapsContainer() {
  const [loadedBeatmapData, setLoadedBeatmapData] = useState<Array<Beatmap | undefined>>([])
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [total, setTotal] = useState<number>(0)
  const [lastSet, setLastSet] = useState<number>(0)

  const [{data: foundTotal, loading: loadingTotal}, executeTotal] = useAxios<number>(Api.fetchCountBeatmapsByFilter(queryFilter))
  const [{data, loading}, execute] = useAxios<Beatmap[]>(Api.fetchBeatmapsByFilter(queryFilter, 0, 0), { manual: true })

  useEffect(() => {
    setLastSet(0)
    setLoadedBeatmapData([])
    executeTotal(Api.fetchCountBeatmapsByFilter(queryFilter))
  }, [queryFilter])

  useEffect(() => {
    if (!loadingTotal) {
      if (foundTotal && loadedBeatmapData.length === 0) {
        let newLoadedBeatmapData = _.cloneDeep(loadedBeatmapData)
        setTotal(foundTotal)

        // initialize all beatmaps so they can be auto loaded later on
        for (let i = 0; i < foundTotal - 1; i++) {
          newLoadedBeatmapData[i] = undefined
        }

        setLoadedBeatmapData(newLoadedBeatmapData)
      }
    }
  }, [loadingTotal])

  useEffect(() => {
    console.log({ loading, data, lastSet, total, visibleBeatmapData: loadedBeatmapData })

    if (!loading && data) {
      let newLoadedBeatmapData = _.cloneDeep(loadedBeatmapData)

      for (let i = lastSet; i < lastSet + data.length; i++) {
        newLoadedBeatmapData[i] = data[i - lastSet]
      }
      setLastSet(lastSet + data.length)
      setLoadedBeatmapData(newLoadedBeatmapData)
    }
  }, [loading, data])

  function fetchNewData({ startIndex, stopIndex }: IndexRange) {
    const config = Api.fetchBeatmapsByFilter(queryFilter, startIndex, stopIndex)
    execute(config)
  }

  let tempUsers = require('./temp-users.json') as User[];

  return total === 0 ? <></>
    : (
    <Beatmaps
      loadedBeatmapData={loadedBeatmapData}
      users={tempUsers}
      beatmapFilter={beatmapFilter}
      setBeatmapFilter={setBeatmapFilter}
      queryFilter={queryFilter}
      setQueryFilter={setQueryFilter}
      fetchNewData={fetchNewData}
    />
  )
}

export default BeatmapsContainer