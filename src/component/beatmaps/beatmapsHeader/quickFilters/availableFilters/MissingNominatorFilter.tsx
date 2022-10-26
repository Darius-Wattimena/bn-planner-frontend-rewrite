import {AvailableQuickFilter, BeatmapFilter, Gamemode} from "../../../../../models/Types";
import React, {useState} from "react";
import {ImUserMinus} from "react-icons/im";
import {remove, values} from "lodash";

interface MissingNominatorFilterProps {
  gamemode: Gamemode
  initialBeatmapFilter: BeatmapFilter
}

const MissingNominatorFilter = ({gamemode, initialBeatmapFilter}: MissingNominatorFilterProps): AvailableQuickFilter<Gamemode> => {
  const [selected, setSelected] = useState(shouldBeSelected(gamemode, initialBeatmapFilter))

  function onSelect(value: Gamemode, beatmapFilter: BeatmapFilter) {
    if (!beatmapFilter.missingNominator.includes(value)) {
      beatmapFilter.missingNominator.push(value)
    }

    return beatmapFilter
  }

  function onRemove(value: Gamemode, beatmapFilter: BeatmapFilter) {
    remove(beatmapFilter.missingNominator, it => it === value)
    return beatmapFilter
  }

  function shouldBeSelected(value: Gamemode, beatmapFilter: BeatmapFilter) {
    return beatmapFilter.missingNominator.includes(value)
  }

  return  {
    key: `missing-nominator-filter-${gamemode}`,
    onSelect: onSelect,
    onRemove: onRemove,
    shouldBeSelected: shouldBeSelected,
    setSelected: setSelected,
    selected: selected,
    disabled: initialBeatmapFilter.gamemodes.length !== 0 && !initialBeatmapFilter.gamemodes.includes(gamemode),
    props: undefined,
    type: undefined,
    value: gamemode,
    label: `Missing ${Object.keys(Gamemode)[Object.values(Gamemode).indexOf(gamemode)]}`,
    description: "Hide claimed beatmaps",
    icon: ImUserMinus({})
  }
}

export default MissingNominatorFilter