import React from "react";
import {Beatmap, BeatmapFilter, FindResponse, User, ViewMode} from "../../models/Types";
import './Beatmaps.scss';
import BeatmapFilters from "./beatmapFilter/BeatmapFilters";
import BeatmapCard from "./cardView/BeatmapCard";
import {InfiniteLoader, List, AutoSizer, Index, IndexRange, ListRowProps} from "react-virtualized";
import BeatmapTableRow from "./tableView/BeatmapTableRow";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";

interface BeatmapsProps {
  loadedBeatmapData: Array<Beatmap | undefined>
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  fetchNewData: (range: IndexRange) => void
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  users: User[]
  viewMode: ViewMode
}

// TODO add support for infinite scrolling
function Beatmaps(
  {
    loadedBeatmapData,
    fetchNewData,
    users,
    beatmapFilter,
    setBeatmapFilter,
    setQueryFilter,
    openBeatmapId,
    setOpenBeatmapId,
    viewMode
  }: BeatmapsProps
) {
  interface CustomRowRender {
    i: number
    viewMode: ViewMode
  }

  function rowRenderer({ i, viewMode }: CustomRowRender) {
    const beatmap = loadedBeatmapData[i]

    if (viewMode === ViewMode.CARDS) {
      return (<BeatmapCard key={i} beatmap={beatmap} users={users} setShowBeatmapDetails={setOpenBeatmapId} />)
    }

    if (viewMode === ViewMode.TABLE) {
      return (<BeatmapTableRow key={i} beatmap={beatmap} users={users} />)
    }

    return <div/>
  }

  function isRowLoaded({ index }: Index) {
    return !!loadedBeatmapData[index]
  }

  function loadMoreRows ({ startIndex, stopIndex }: IndexRange) {
    fetchNewData({ startIndex, stopIndex })
    return new Promise(() => null)
  }

  const MIN_ITEM_SIZE = 450

  return (
    <>
      <div className={"page-container-full beatmap-page"}>
        <BeatmapFilters
          users={users}
          beatmapFilter={beatmapFilter}
          setBeatmapFilter={setBeatmapFilter}
          setQueryFilter={setQueryFilter}
        />
        <div className={"beatmap-listing-container"}>
          <div className={"beatmap-listing"}>
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              minimumBatchSize={1}
              rowCount={loadedBeatmapData.length}>
              {({onRowsRendered, registerChild}) => (
                <AutoSizer className={"beatmap-scroll-autosizer"}>
                  {({width, height}) => {
                    const estimatedItemsPerRow = Math.floor(width / MIN_ITEM_SIZE)
                    const itemsPerRow = Math.floor((width - estimatedItemsPerRow * 16) / MIN_ITEM_SIZE)
                    const rowCount = Math.ceil(loadedBeatmapData.length / itemsPerRow)

                    return <List
                      className={"beatmap-scroll-container"}
                      ref={registerChild}
                      width={width}
                      height={height}
                      onRowsRendered={onRowsRendered}
                      rowCount={rowCount}
                      rowHeight={370}
                      rowRenderer={ props => {
                        const { index, isVisible, key, style }: ListRowProps = props
                        const items = [];
                        const fromIndex = index * itemsPerRow;
                        const toIndex = fromIndex + itemsPerRow;

                        if (isVisible) {
                          for (let i = fromIndex; i < toIndex; i++) {
                            items.push(rowRenderer({ i, viewMode }))
                          }

                          return (
                            <div
                              className='beatmap-grid-row'
                              key={key}
                              style={style}
                            >
                              {items}
                            </div>
                          )
                        }
                      }}
                    />
                  }}
                </AutoSizer>
              )}
            </InfiniteLoader>
          </div>
        </div>

        {/*<BeatmapTable beatmaps={tempBeatmaps} />*/}
      </div>
      <BeatmapDetailsContainer openBeatmapId={openBeatmapId} setOpenBeatmapId={setOpenBeatmapId} />
    </>
  )
}

export default Beatmaps