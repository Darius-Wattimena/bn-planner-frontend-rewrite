import React, {useEffect, useState} from "react";
import {Beatmap, BeatmapFilter, BeatmapPage, PageLimit, UserContext, ViewMode} from "../../models/Types";
import './Beatmaps.scss';
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import Beatmaps from "./Beatmaps";
import _, {cloneDeep} from "lodash";
import {IndexRange} from "react-virtualized";
import {useParams} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import BeatmapFilters from "./beatmapFilters/BeatmapFilters";
import AddBeatmapModal from "./addBeatmap/AddBeatmapModal";
import PageHeader from "../generic/PageHeader";
import {IoMusicalNotes} from "react-icons/io5";
import BeatmapFilterRow from "./beatmapFilterRow/BeatmapFilterRow";

const filterDefaultState: BeatmapFilter = {
  search: null,
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  gamemodes: [],
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
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(setupFilterWithUserContext())
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(setupFilterWithUserContext())
  const [total, setTotal] = useState<number>(0)
  const [lastSet, setLastSet] = useState<number>(0)
  const [openAddBeatmap, setOpenAddBeatmap] = useState(false)

  let {beatmapId} = useParams<string>();
  const [openBeatmapId, setOpenBeatmapId] = useState<number>()

  const [{data: foundTotal, loading: loadingTotal}, executeTotal] = useAxios<number>(Api.fetchCountBeatmapsByFilter(queryFilter))
  const [{data, loading}, execute] = useAxios<Beatmap[]>("", {manual: true})

  function setupFilterWithUserContext() {
    let filter = cloneDeep(filterDefaultState)
    filter.page = page
    let currentUser = userContext?.user

    if (currentUser) {
      filter.gamemodes = currentUser.gamemodes.map(it => it.gamemode)
    }

    return filter
  }

  useEffect(() => {
    let newFilter = cloneDeep(queryFilter)
    newFilter.page = page

    setQueryFilter(newFilter)
    setBeatmapFilter(newFilter)
  }, [page])

  useEffect(() => {
    if (beatmapId && isNaN(+beatmapId) && Number(beatmapId) !== openBeatmapId) {
      setOpenBeatmapId(Number(beatmapId))
    }
  }, [beatmapId, openBeatmapId])

  useEffect(() => {
    resetPage()
  }, [queryFilter])

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
      .catch(() => {})
  }

  const preparedPageName = page.charAt(0) + page.toLowerCase().slice(1)

  return (
    <>
      <PageHeader title={`${preparedPageName} Beatmaps`} icon={<IoMusicalNotes />} />
      <div className={`page-container beatmap-page beatmap-page-table`}>
        <BeatmapFilterRow
          userContext={userContext}
          page={page}
          openAddBeatmap={openAddBeatmap}
          setOpenAddBeatmap={setOpenAddBeatmap}
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
      </div>
      <ReactTooltip id='filter' place='bottom' effect='solid' clickable={true} className={"beatmap-filter-tooltip"}>
        <BeatmapFilters
          currentUser={userContext?.user}
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}/>
      </ReactTooltip>
      <AddBeatmapModal
        openAddBeatmap={openAddBeatmap}
        setOpenAddBeatmap={setOpenAddBeatmap}
        setOpenBeatmapId={setOpenBeatmapId}
        userGamemodes={userContext?.user?.gamemodes?.map(it => it.gamemode)} />
    </>
  )
}

export default BeatmapsContainer