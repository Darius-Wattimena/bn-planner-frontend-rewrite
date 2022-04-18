import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";
import React from "react";

interface BasicPaginationProps {
  currentPage: number
  lastPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function BasicPagination({currentPage, lastPage, setPage}: BasicPaginationProps) {
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

export default BasicPagination