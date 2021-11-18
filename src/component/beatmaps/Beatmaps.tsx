import React, {useEffect, useState} from "react";
import {Beatmap, BeatmapFilter, FindResponse, User} from "../../models/Types";
import BeatmapCard from "./BeatmapCard";
import './Beatmaps.scss';
import BeatmapFilters from "./beatmapFilter/BeatmapFilters";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import InfiniteScroll from "react-infinite-scroll-component";

const filterDefaultState: BeatmapFilter = {
  artist: null,
  title: null,
  mapper: null,
  status: [],
  nominators: [],
  page: "PENDING",
  hideWithTwoNominators: false
}

// TODO add support for infinite scrolling
function Beatmaps() {
  const [visibleBeatmapData, setVisibleBeatmapData] = useState<Beatmap[]>([])
  const [beatmapFilter, setBeatmapFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<BeatmapFilter>(filterDefaultState)
  const [step, setStep] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const [{data, loading}, execute] = useAxios<FindResponse<Beatmap>>(Api.fetchInitialBeatmapsByFilter(queryFilter))

  useEffect(() => {
    setVisibleBeatmapData([])
    execute(Api.fetchInitialBeatmapsByFilter(queryFilter))
  }, [queryFilter])

  useEffect(() => {
    if (!loading && visibleBeatmapData.length === 0) {
      setTotal(data?.total || 0)
    }
  }, [loading])
  
  useEffect(() => {
    console.log({ data })

    if (data) {
      setVisibleBeatmapData(visibleBeatmapData.concat(data.response))
    }
  }, [data])

  useEffect(() => {
    if (step > 0) {
      const config = Api.fetchBeatmapsByFilter(queryFilter, total, step)
      console.log({url: config.url})
      execute(config)
    }

  }, [step])
  
  function fetchNewData() {
    const newStep = (step || 0) + 1
    setStep(newStep)
  }


  let tempUsers = require('./temp-users.json') as User[];

  return (
    <div className={"page-container-full beatmap-page"}>
      <BeatmapFilters
        users={tempUsers}
        beatmapFilter={beatmapFilter}
        setBeatmapFilter={setBeatmapFilter}
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
      />
      <div id={"beatmap-scroll-container"} className={"beatmap-card-container"}>
        <div className={"beatmap-card-grid"}>
          <InfiniteScroll
            dataLength={visibleBeatmapData.length}
            next={fetchNewData}
            hasMore={data?.hasMoreData || true}
            loader={<h4>Loading...</h4>}
            scrollableTarget={"beatmap-scroll-container"}
          >
            {visibleBeatmapData.map((beatmap, index) => {
              return (
                <BeatmapCard beatmap={beatmap} users={tempUsers} key={index} />
              )
            })}
          </InfiniteScroll>
        </div>
      </div>

      {/*<BeatmapTable beatmaps={tempBeatmaps} />*/}
    </div>
  )
}

export default Beatmaps