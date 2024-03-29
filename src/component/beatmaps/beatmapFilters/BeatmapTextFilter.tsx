import {debouncingFilter} from "../../../utils/FilterUtils";
import React from "react";
import {BeatmapFilter} from "../../../models/Types";

interface BeatmapTextFilterProps {
  target: keyof BeatmapFilter
  label?: string | JSX.Element
  placeholder?: string
  beatmapFilter: BeatmapFilter
  setBeatmapFormFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  timeout: number
  setTimeout: React.Dispatch<React.SetStateAction<number>>
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapTextFilter(
  {
    target,
    label,
    placeholder,
    beatmapFilter,
    setBeatmapFormFilter,
    timeout,
    setTimeout,
    setQueryFilter
  }: BeatmapTextFilterProps) {
  const value = beatmapFilter[target]

  function updateBeatmapFilter(newValue: string) {
    debouncingFilter(
      beatmapFilter,
      timeout,
      target,
      newValue,
      setBeatmapFormFilter,
      setTimeout,
      setQueryFilter
    )
  }

  return (
    <div className={`beatmap-filter-textbox`}>
      {label &&
        <label htmlFor={target}>
          {label}
        </label>
      }
      <input
        id={target}
        placeholder={placeholder}
        value={value?.toString()}
        onChange={event => {
          updateBeatmapFilter(event.target.value)
        }}
      />
    </div>
  )
}

export default BeatmapTextFilter