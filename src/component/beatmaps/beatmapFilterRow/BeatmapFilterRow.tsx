import BeatmapTextFilter from "../beatmapFilters/BeatmapTextFilter";
import React, {Dispatch, SetStateAction, useState} from "react";
import {BeatmapFilter, BeatmapPage, UserContext} from "../../../models/Types";
import "./BeatmapFilterRow.scss";
import {IoAdd, IoSearch} from "react-icons/io5";
import UserSearcher from "../../userSearcher/UserSearcher";
import QuickFilters from "../beatmapsHeader/quickFilters/QuickFilters";

interface BeatmapFilterRowProps {
  userContext?: UserContext
  page: BeatmapPage
  openAddBeatmap: boolean
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  beatmapFilter: BeatmapFilter
  setBeatmapFilter: Dispatch<SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter: Dispatch<SetStateAction<BeatmapFilter>>
}

export default function BeatmapFilterRow(props: BeatmapFilterRowProps) {
  const [timeout, setTimeout] = useState<number>(0)
  const [openUserSearcher, setOpenUserSearcher] = useState(false)

  return (
    <div className={"beatmap-filter-row"}>
      <div className={"beatmap-search-bar"}>
        <BeatmapTextFilter
          target={"search"}
          label={<IoSearch />}
          placeholder={"Search artist, title, mapper..."}
          beatmapFilter={props.beatmapFilter}
          setBeatmapFormFilter={props.setBeatmapFilter}
          setQueryFilter={props.setBeatmapQueryFilter}
          timeout={timeout}
          setTimeout={setTimeout}
        />
        <QuickFilters
          beatmapPage={props.page}
          userContext={props.userContext}
          beatmapFilter={props.beatmapFilter}
          setBeatmapFilter={props.setBeatmapFilter}
          setBeatmapQueryFilter={props.setBeatmapQueryFilter}
        />
      </div>
      <div className={"beatmap-filter-row-buttons"}>
        <button className={"primary"} onClick={() => setOpenUserSearcher(true)}>
          <IoSearch />
          <div className={"beatmap-button-text"}>
            Nominators
          </div>
        </button>
        <button
          disabled={props.page !== "PENDING" || props.userContext?.permission.osuRole === "Mapper" || props.openAddBeatmap}
          className='accent'
          onClick={() => props.setOpenAddBeatmap(true)}
        >
          <IoAdd />
          <div className='beatmap-button-text'>
            Add Beatmap
          </div>
        </button>
      </div>
      <UserSearcher
        currentUser={props.userContext?.user}
        openUserSearcher={openUserSearcher}
        setOpenUserSearcher={setOpenUserSearcher}
        beatmapFilter={props.beatmapFilter}
        setBeatmapFilter={props.setBeatmapFilter}
        setBeatmapQueryFilter={props.setBeatmapQueryFilter}
      />
    </div>
  )
}