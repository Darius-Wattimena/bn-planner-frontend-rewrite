import {AvailableQuickFilter, BeatmapFilter, Gamemode} from "../../../../../models/Types";
import {useState} from "react";
import {remove} from "lodash";
import {ImMusic} from "react-icons/im";

interface GamemodeQuickFilterProps {
  gamemode: Gamemode
  initialBeatmapFilter: BeatmapFilter
}

const GamemodeQuickFilter = ({gamemode, initialBeatmapFilter}: GamemodeQuickFilterProps): AvailableQuickFilter<Gamemode> => {
  const [selected, setSelected] = useState(shouldBeSelected(gamemode, initialBeatmapFilter))

  function onSelect(value: Gamemode, beatmapFilter: BeatmapFilter) {
    if (!beatmapFilter.gamemodes.includes(value)) {
      beatmapFilter.gamemodes.push(value)
    }

    return beatmapFilter
  }

  function onRemove(value: Gamemode, beatmapFilter: BeatmapFilter) {
    remove(beatmapFilter.gamemodes, it => it === value)
    return beatmapFilter
  }

  function shouldBeSelected(value: Gamemode, beatmapFilter: BeatmapFilter) {
    return beatmapFilter.gamemodes.includes(value)
  }

  return  {
    key: `gamemode-filter-${gamemode}`,
    onSelect: onSelect,
    onRemove: onRemove,
    shouldBeSelected: shouldBeSelected,
    setSelected: setSelected,
    selected: selected,
    disabled: false,
    props: undefined,
    type: undefined,
    value: gamemode,
    label: `${Object.keys(Gamemode)[Object.values(Gamemode).indexOf(gamemode)]}`,
    description: `Show ${Object.keys(Gamemode)[Object.values(Gamemode).indexOf(gamemode)]} beatmaps`,
    icon: ImMusic({})
  }
}

export default GamemodeQuickFilter