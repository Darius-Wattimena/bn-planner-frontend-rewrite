import React, {useState} from "react";
import {Beatmap, BeatmapFilter, ViewMode} from "../../models/Types";
import BeatmapCard from "./cardView/BeatmapCard";
import {AutoSizer, Grid, Index, IndexRange, InfiniteLoader, List, ListRowProps} from "react-virtualized";
import BeatmapTableRow from "./tableView/BeatmapTableRow";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";
import './Beatmaps.scss';
import {GridCellProps} from "react-virtualized/dist/es/Grid";
import BeatmapsHeader from "./beatmapsHeader/BeatmapsHeader";
import BeatmapFiltersModal from "./beatmapFilter/BeatmapFiltersModal";

interface BeatmapsProps {
  setShowBeatmapFilter: React.Dispatch<React.SetStateAction<boolean>>
  loadedBeatmapData: Array<Beatmap | undefined>
  fetchNewData: (range: IndexRange) => void
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  viewMode: ViewMode
}

// TODO add support for infinite scrolling
function Beatmaps(
  {
    setShowBeatmapFilter,
    loadedBeatmapData,
    fetchNewData,
    openBeatmapId,
    setOpenBeatmapId,
    viewMode
  }: BeatmapsProps
) {
  interface CustomRowRender {
    i: number
    viewMode: ViewMode
  }

  function isRowLoaded({index}: Index) {
    return !!loadedBeatmapData[index]
  }

  function loadMoreRows({startIndex, stopIndex}: IndexRange) {
    fetchNewData({startIndex, stopIndex})
    return new Promise(() => null)
  }

  const MIN_ITEM_SIZE = 400

  return (
    <>
      <div className={"page-container beatmap-page"}>
        <div className={"beatmap-listing-container"}>
          <div className={"beatmap-listing"}>
            {/*<BeatmapsHeader setShowBeatmapFilter={setShowBeatmapFilter}/>*/}
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              minimumBatchSize={25}
              rowCount={loadedBeatmapData.length}>
              {({onRowsRendered, registerChild}) => (
                <AutoSizer className={"beatmap-scroll-autosizer"}>
                  {({width, height}) => {
                    if (viewMode === "CARDS") {
                      const estimatedItemsPerRow = Math.floor(width / MIN_ITEM_SIZE)
                      const totalSpace = width - estimatedItemsPerRow * 16
                      const itemsPerRow = Math.floor(totalSpace / MIN_ITEM_SIZE)
                      const rowCount = Math.ceil(loadedBeatmapData.length / itemsPerRow)
                      const itemSize = width / itemsPerRow
                      return <Grid
                        className={"beatmap-scroll-container"}
                        ref={registerChild}
                        width={width}
                        height={height}
                        onSectionRendered={x => {
                          const startIndex = x.rowStartIndex * itemsPerRow
                          const stopIndex = x.rowStopIndex * itemsPerRow + x.columnStopIndex

                          onRowsRendered({startIndex, stopIndex})
                        }}
                        columnCount={itemsPerRow}
                        columnWidth={itemSize}
                        rowCount={rowCount}
                        rowHeight={370}
                        cellRenderer={props => {
                          const {columnIndex, rowIndex, isVisible, key, style}: GridCellProps = props

                          if (isVisible) {
                            const fromIndex = rowIndex * itemsPerRow;
                            const i = fromIndex + columnIndex;
                            return (
                              <div
                                className='beatmap-grid-card'
                                key={key}
                                style={style}
                              >
                                <BeatmapCard key={i} beatmap={loadedBeatmapData[i]}
                                             setShowBeatmapDetails={setOpenBeatmapId}/>
                              </div>
                            )
                          }
                        }}
                      />
                    } else {
                      return <List
                        className={"beatmap-scroll-container"}
                        ref={registerChild}
                        width={width}
                        height={height}
                        onRowsRendered={onRowsRendered}
                        rowCount={loadedBeatmapData.length}
                        rowHeight={200}
                        rowRenderer={props => {
                          const {index, isVisible, key, style}: ListRowProps = props
                          if (isVisible) {
                            return (
                              <div
                                className='beatmap-list-row'
                                key={key}
                                style={style}
                              >
                                return (<BeatmapTableRow key={key} beatmap={loadedBeatmapData[index]}/>)
                              </div>
                            )
                          }
                        }}
                      />
                    }
                  }}
                </AutoSizer>
              )}
            </InfiniteLoader>
          </div>
        </div>
      </div>
      <BeatmapDetailsContainer openBeatmapId={openBeatmapId} setOpenBeatmapId={setOpenBeatmapId}/>
    </>
  )
}

export default Beatmaps