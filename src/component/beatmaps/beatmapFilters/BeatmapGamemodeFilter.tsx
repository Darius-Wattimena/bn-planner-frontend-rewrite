import React, {useEffect, useState} from "react";
import {BeatmapFilter, Gamemode, SelectFilterItem} from "../../../models/Types";
import {instantFilter} from "../../../utils/FilterUtils";
import {getBeatmapGamemode} from "../../../utils/BeatmapUtils";
import Collapsible from "react-collapsible";

interface BeatmapGamemodeFilterProps {
  gamemodes: Gamemode[]
  beatmapFilter: BeatmapFilter
  setBeatmapFormFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  timeout: number
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapGamemodeFilter(
  {
    gamemodes,
    beatmapFilter,
    setBeatmapFormFilter,
    timeout,
    setQueryFilter
  }: BeatmapGamemodeFilterProps) {
  const [selectedGamemodes, setSelectedGamemodes] = useState<Gamemode[]>(beatmapFilter.gamemodes)
  const [filterItems, setFilterItems] = useState<SelectFilterItem[]>([])

  useEffect(() => {
    const preparedStatuses = gamemodes.map((gamemode, index) => {
      const selectedGamemode = selectedGamemodes.find(item => item === gamemode)
      const item: SelectFilterItem = {
        index: index,
        label: Object.keys(Gamemode)[index],
        value: gamemode,
        selected: selectedGamemode != null || selectedGamemode !== undefined
      };

      return item
    })

    setFilterItems(preparedStatuses)
  }, [selectedGamemodes, gamemodes])

  function removeGamemode(value: Gamemode, gamemodes: Gamemode[]) {
    gamemodes.forEach((item, index) => {
      if (item === value) gamemodes.splice(index, 1);
    });
  }

  function updateSelectedItems(value: Gamemode, checked: boolean) {
    const selectedStatuses = beatmapFilter["gamemodes"]
    const newGamemode: Gamemode[] = [];

    selectedStatuses.forEach(val => newGamemode.push(val))

    if (checked) {
      newGamemode.push(value)
    } else {
      removeGamemode(value, newGamemode)
    }

    setSelectedGamemodes(newGamemode)

    instantFilter(
      beatmapFilter,
      "gamemodes",
      newGamemode,
      setBeatmapFormFilter,
      timeout,
      setQueryFilter
    )
  }

  return (
    <div className={"beatmap-filter-status-container"}>
      <Collapsible
        trigger={"Gamemode"}
        open={false}
        className={"collapsible-parent-group"}
        openedClassName={"collapsible-parent-group"}
      >
        <div className={"beatmap-filter-select-groups"}>
          {filterItems.map((selectItem, index) => {
            let gamemodeClass = getBeatmapGamemode(selectItem.value)?.className

            return (
              <div className={`beatmap-filter-gamemode`} key={index}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-gamemode`}
                  checked={selectItem.selected}
                  onChange={event => {
                    updateSelectedItems(selectItem.value, event.target.checked)
                  }}
                />
                <label className={gamemodeClass} htmlFor={`${selectItem.index}-gamemode`}>
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

export default BeatmapGamemodeFilter