import React, {useEffect, useState} from "react";
import {Beatmap, PageLimit} from "../../../models/Types";
import './BeatmapTable.scss'
import BeatmapTableRow from "./BeatmapTableRow";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";

interface BeatmapTableProps {
  total: number,
  beatmaps: Array<Beatmap | undefined>
  fetchNewPage: (pageNumber: number, pageLimit: PageLimit) => void
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapTable({total, beatmaps, fetchNewPage, setOpenBeatmapId}: BeatmapTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState<PageLimit>('TEN')

  useEffect(() => {
    fetchNewPage(currentPage, limit)
  }, [currentPage, limit])

  let limitValue
  if (limit === "TEN") {
    limitValue = 10
  } else if (limit === "TWENTY") {
    limitValue = 20
  } else {
    limitValue = 50
  }

  let possibleLastPage = Math.ceil(total / limitValue)

  return (
    <div className={"table-container"}>
      <table className={"beatmap-table"}>
        <thead>
        <tr>
          <th className={"beatmap-banner-header"}>#</th>
          <th className={"beatmap-status-header"}>Status</th>
          <th className={"beatmap-text-header"}>Artist</th>
          <th className={"beatmap-text-header"}>Title</th>
          <th className={"beatmap-table-user-header"}>Mapper</th>
          <th className={"beatmap-table-user-header"}>Nominator #1</th>
          <th className={"beatmap-table-user-header"}>Nominator #2</th>
          <th className={"beatmap-table-note-header"}>Note</th>
          <th className={"beatmap-table-actions-header"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {beatmaps.map(beatmap => {
          if (beatmap) {
            return (
              <BeatmapTableRow key={beatmap.osuId} beatmap={beatmap} setOpenBeatmapId={setOpenBeatmapId}/>
            )
          }
        })}
        </tbody>
      </table>
      <div className={"table-footer"}>
        <div>
          {total} Beatmaps found
        </div>
        <div className={"table-footer-end"}>
          <div className={"table-footer-limit-selector"}>
            <div>Limit:</div>
            <select onChange={event => setLimit(event.target.value as PageLimit)} value={limit}>
              <option value={"TEN"}>10</option>
              <option value={"TWENTY"}>20</option>
              <option value={"FIFTY"}>50</option>
            </select>
          </div>
          <div className={"table-footer-pagination"}>
            <BasicPagination currentPage={currentPage} lastPage={possibleLastPage} setPage={setCurrentPage}/>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BasicPaginationProps {
  currentPage: number
  lastPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const BasicPagination = ({currentPage, lastPage, setPage}: BasicPaginationProps) => {
  return (
    <div className={"table-pagination"}>
      <button className={"beatmap-button"} disabled={currentPage === 1} onClick={() => setPage(1)}>
        <FaAngleDoubleLeft/>
      </button>
      <button className={"beatmap-button"} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
        <FaAngleLeft/>
      </button>
      <button className={"beatmap-button"}>{currentPage}</button>
      <button className={"beatmap-button"} disabled={!(lastPage > currentPage)}
              onClick={() => setPage(currentPage + 1)}>
        <FaAngleRight/>
      </button>
      <button className={"beatmap-button"} disabled={lastPage <= currentPage} onClick={() => setPage(lastPage)}>
        <FaAngleDoubleRight/>
      </button>
    </div>
  )
}

export default BeatmapTable