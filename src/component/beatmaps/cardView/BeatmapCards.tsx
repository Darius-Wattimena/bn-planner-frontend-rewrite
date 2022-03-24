import {AutoSizer, Grid, Index, IndexRange, InfiniteLoader} from "react-virtualized";
import {GridCellProps} from "react-virtualized/dist/es/Grid";
import BeatmapCard from "./BeatmapCard";
import React from "react";
import {Beatmap} from "../../../models/Types";
import "./BeatmapCards.scss"

interface BeatmapCardsProps {
  loadedBeatmapData: Array<Beatmap | undefined>
  fetchNewData: (range: IndexRange) => void
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapCards({loadedBeatmapData, fetchNewData, setOpenBeatmapId}: BeatmapCardsProps) {

  function isRowLoaded({index}: Index) {
    return !!loadedBeatmapData[index]
  }

  function loadMoreRows({startIndex, stopIndex}: IndexRange) {
    fetchNewData({startIndex, stopIndex})
    return new Promise(() => null)
  }

  const MIN_ITEM_SIZE = 400

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      threshold={25}
      minimumBatchSize={1}
      rowCount={loadedBeatmapData.length}>
      {({onRowsRendered, registerChild}) => (
        <AutoSizer className={"beatmap-scroll-autosizer"}>
          {({width, height}) => {
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
              rowHeight={380}
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
                      <BeatmapCard beatmap={loadedBeatmapData[i]} setShowBeatmapDetails={setOpenBeatmapId}/>
                    </div>
                  )
                }
              }}
            />
          }}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
}

export default BeatmapCards