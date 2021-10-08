import React, {useEffect, useState} from "react";
import {BeatmapFilter, BeatmapStatus, SelectFilterItem} from "../../../models/Types";
import {instantFilter} from "../../../utils/FilterUtils";
import {getBeatmapStatus} from "../../../utils/BeatmapUtils";
import Collapsible from "react-collapsible";

interface BeatmapStatusFilterProps {
  statuses: BeatmapStatus[]
  beatmapFilter: BeatmapFilter
  setBeatmapFormFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  timeout: number
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapStatusFilter({ statuses, beatmapFilter, setBeatmapFormFilter, timeout, setQueryFilter }: BeatmapStatusFilterProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([])
  const [filterItems, setFilterItems] = useState<SelectFilterItem[]>([])

  useEffect(() => {
    const preparedStatuses = statuses.map((status, index) => {
      const selectedStatus = selectedStatuses.find(item => item === status.id)
      const item: SelectFilterItem = {
        index: index,
        label: status.name,
        value: status.id,
        selected: selectedStatus != null || selectedStatus !== undefined
      };

      return item
    })

    setFilterItems(preparedStatuses)
  }, [selectedStatuses, statuses])

  function removeNumber(value: number, numbers: number[]){
    numbers.forEach( (item, index) => {
      if(item === value) numbers.splice(index,1);
    });
  }

  function updateSelectedItems(value: number, checked: boolean) {
    const selectedStatuses = beatmapFilter["status"]
    const newStatuses: number[] = [];

    selectedStatuses.forEach(val => newStatuses.push(val))

    if (checked) {
      newStatuses.push(value)
    } else {
      removeNumber(value, newStatuses)
    }

    setSelectedStatuses(newStatuses)

    instantFilter(
      beatmapFilter,
      "status",
      newStatuses,
      setBeatmapFormFilter,
      timeout,
      setQueryFilter
    )
  }

  return (
    <div className={"beatmap-filter-nominators"}>
      <Collapsible
        trigger={"Status"}
        open={true}
        className={"collapsible-parent-group"}
        openedClassName={"collapsible-parent-group"}
      >
        <div className={"beatmap-filter-nominators-groups"}>
          {filterItems.map((selectItem, index) => {
            let statusClass = getBeatmapStatus(selectItem.value)?.className

            return (
              <div className={`beatmap-filter-status`} key={index}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-status`}
                  checked={selectItem.selected}
                  onChange={event => {
                    updateSelectedItems(selectItem.value, event.target.checked)
                  }}
                />
                <label className={statusClass} htmlFor={`${selectItem.index}-status`}>
                  {selectItem.label}
                </label>
              </div>
            )
          })}
        </div>
      </Collapsible>

    </div>
  )
}

export default BeatmapStatusFilter