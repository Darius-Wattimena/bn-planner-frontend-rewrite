import React, {useEffect, useState} from "react";
import {Beatmap, BeatmapFilter, BeatmapPage, PageLimit, UserContext, ViewMode} from "../../models/Types";
import './Beatmaps.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import Beatmaps from "./Beatmaps";
import _ from "lodash";
import {IndexRange} from "react-virtualized";
import {useParams} from "react-router-dom";
import BeatmapsHeader from "./beatmapsHeader/BeatmapsHeader";
import ReactTooltip from "react-tooltip";
import BeatmapFilters from "./beatmapFilters/BeatmapFilters";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  page: "PENDING",
  hideWithTwoNominators: false
}

interface BeatmapsContainerProps {
  viewMode: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  userContext: UserContext | undefined
  page: BeatmapPage
}

function BeatmapsContainer({viewMode, setViewMode, userContext, page}: BeatmapsContainerProps) {
  const [loadedBeatmapData, setLoadedBeatmapData] = useState<Array<Beatmap | undefined>>([])
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [total, setTotal] = useState<number>(0)
  const [lastSet, setLastSet] = useState<number>(0)
  const [filteringOnOwnUser, setFilteringOnOwnUser] = useState(false)

  let {beatmapId} = useParams<string>();
  const [openBeatmapId, setOpenBeatmapId] = useState<number>()

  const [{data: foundTotal, loading: loadingTotal}, executeTotal] = useAxios<number>(Api.fetchCountBeatmapsByFilter(queryFilter))
  const [{data, loading}, execute] = useAxios<Beatmap[]>("", {manual: true})

  useEffect(() => {
    let newFilter = queryFilter
    newFilter.page = page
    setBeatmapFilter(newFilter)
    setQueryFilter(newFilter)
    resetPage()
  }, [page])

  useEffect(() => {
    setFilteringOnOwnUser(beatmapFilter.nominators.find(it => it === userContext?.user.osuId) !== undefined)
  }, [beatmapFilter])

  useEffect(() => {
    if (beatmapId && isNaN(+beatmapId) && Number(beatmapId) !== openBeatmapId) {
      setOpenBeatmapId(Number(beatmapId))
    }
  }, [beatmapId, openBeatmapId])

  useEffect(() => {
    resetPage()
  }, [executeTotal, queryFilter])

  useEffect(() => {
    if (!loadingTotal) {
      if (foundTotal && foundTotal !== total) {
        setTotal(foundTotal)
        if (viewMode === "CARDS") {
          let newLoadedBeatmapData = _.cloneDeep(loadedBeatmapData)

          // initialize all beatmaps so they can be auto loaded later on
          for (let i = 0; i < foundTotal; i++) {
            newLoadedBeatmapData[i] = undefined
          }

          setLoadedBeatmapData(newLoadedBeatmapData)
        } else {
          console.log("Table view, not defining all loaded maps")
        }
      }
    }
  }, [loadingTotal, foundTotal])

  useEffect(() => {
    if (!loading && data) {
      if (viewMode === "CARDS") {
        let newLoadedBeatmapData = _.cloneDeep(loadedBeatmapData)

        for (let i = lastSet; i < lastSet + data.length; i++) {
          newLoadedBeatmapData[i] = data[i - lastSet]
        }
        setLastSet(lastSet + data.length)
        setLoadedBeatmapData(newLoadedBeatmapData)
      } else {
        setLoadedBeatmapData(data)
      }
    }
  }, [loading, data])

  useEffect(() => {
    console.log({loadedBeatmapData})
  }, [loadedBeatmapData])

  useEffect(() => {
    if (viewMode === "TABLE") {
      fetchNewPage(2, "TEN")
    }
  }, [viewMode])

  function fetchNewPage(pageNumber: number, pageLimit: PageLimit) {
    execute(Api.fetchBeatmapsTableByFilter(queryFilter, pageNumber, pageLimit))
  }

  function fetchNewData({startIndex, stopIndex}: IndexRange) {
    const config = Api.fetchBeatmapsByFilter(queryFilter, startIndex, stopIndex)
    execute(config)
  }

  function resetPage() {
    setTotal(0)
    setLastSet(0)
    setLoadedBeatmapData([])
    executeTotal(Api.fetchCountBeatmapsByFilter(queryFilter))
  }

  function filterMyIcons() {
    let currentUserId = userContext?.user.osuId
    if (currentUserId) {
      let newQueryFilter = _.cloneDeep(queryFilter)
      if (queryFilter.nominators.find(it => it === currentUserId) !== undefined) {
        newQueryFilter.nominators = newQueryFilter.nominators.filter(it => it !== currentUserId)
      } else {
        newQueryFilter.nominators.push(currentUserId)
      }

      setBeatmapFilter(newQueryFilter)
      setQueryFilter(newQueryFilter)
    }
  }

  return (
    <>
      <BeatmapsHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterMyIcons={filterMyIcons}
        filteringOnOwnUser={filteringOnOwnUser}
      />
      {
        total === 0 ? <></>
          : (
            <>
              <Beatmaps
                loadedBeatmapData={loadedBeatmapData}
                fetchNewData={fetchNewData}
                fetchNewPage={fetchNewPage}
                openBeatmapId={openBeatmapId}
                setOpenBeatmapId={setOpenBeatmapId}
                resetPage={resetPage}
                viewMode={viewMode}
                total={total}
              />
            </>
          )
      }
      <ReactTooltip id='filter' place='bottom' effect='solid' clickable={true} className={"beatmap-filter-tooltip"}>
        <BeatmapFilters
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}/>
      </ReactTooltip>
    </>
  )
}

export default BeatmapsContainer