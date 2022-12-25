import React, {useEffect, useState} from "react";
import {Beatmap, BeatmapFilter, BeatmapPage, Gamemode, PageLimit, UserContext, ViewMode} from "../../models/Types";
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
import AddBeatmapModal from "./addBeatmap/AddBeatmapModal";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  gamemodes: [Gamemode.Catch],
  missingNominator: [],
  page: "PENDING"
}

interface BeatmapsContainerProps {
  viewMode: ViewMode
  userContext: UserContext | undefined
  page: BeatmapPage
}

function BeatmapsContainer({viewMode, userContext, page}: BeatmapsContainerProps) {
  const [loadedBeatmapData, setLoadedBeatmapData] = useState<Array<Beatmap | undefined>>([])
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [total, setTotal] = useState<number>(0)
  const [lastSet, setLastSet] = useState<number>(0)
  const [openAddBeatmap, setOpenAddBeatmap] = useState(false)

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
          // Table view, not defining all loaded maps
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

  return (
    <>
      <BeatmapsHeader
        userContext={userContext}
        openAddBeatmap={openAddBeatmap}
        setOpenAddBeatmap={setOpenAddBeatmap}
        page={page}
        beatmapFilter={beatmapFilter}
        setBeatmapFilter={setBeatmapFilter}
        setBeatmapQueryFilter={setQueryFilter}
      />
      {
        total === 0 ? (
            <div className={`page-container beatmap-page`}>
              <div>No beatmaps found with given search criteria</div>
            </div>
          ) : (
            <Beatmaps
              userContext={userContext}
              loadedBeatmapData={loadedBeatmapData}
              fetchNewData={fetchNewData}
              fetchNewPage={fetchNewPage}
              openBeatmapId={openBeatmapId}
              setOpenBeatmapId={setOpenBeatmapId}
              resetPage={resetPage}
              viewMode={viewMode}
              total={total}
            />
          )
      }
      <ReactTooltip id='filter' place='bottom' effect='solid' clickable={true} className={"beatmap-filter-tooltip"}>
        <BeatmapFilters
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}/>
      </ReactTooltip>
      <AddBeatmapModal openAddBeatmap={openAddBeatmap} setOpenAddBeatmap={setOpenAddBeatmap} setOpenBeatmapId={setOpenBeatmapId} />
    </>
  )
}

export default BeatmapsContainer