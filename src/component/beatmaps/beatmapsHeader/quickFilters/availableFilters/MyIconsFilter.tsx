import {AvailableQuickFilter, BeatmapFilter, UserContext} from "../../../../../models/Types";
import React, {useState} from "react";
import {ImUser} from "react-icons/im";

interface MyIconsFilterProps {
  userContext: UserContext | undefined
  initialBeatmapFilter: BeatmapFilter
}

const MyIconsFilter = ({userContext, initialBeatmapFilter}: MyIconsFilterProps): AvailableQuickFilter<string> => {
  const [selected, setSelected] = useState(userContext?.user.osuId ? shouldBeSelected(userContext?.user.osuId, initialBeatmapFilter): false)

  function onSelect(value: string, beatmapFilter: BeatmapFilter) {
    if (!beatmapFilter.nominators.includes((value))) {
      beatmapFilter.nominators.push(value)
    }

    return beatmapFilter
  }

  function onRemove(value: string, beatmapFilter: BeatmapFilter) {
    beatmapFilter.nominators = beatmapFilter.nominators.filter(it => it !== value)
    return beatmapFilter
  }

  function shouldBeSelected(value: string, beatmapFilter: BeatmapFilter) {
    return beatmapFilter.nominators.includes(value)
  }

  return  {
    key: "my-icons-filter",
    onSelect: onSelect,
    onRemove: onRemove,
    shouldBeSelected: shouldBeSelected,
    setSelected: setSelected,
    selected: selected,
    disabled: userContext?.permission.osuRole === "Mapper",
    props: undefined,
    type: undefined,
    value: userContext?.user.osuId,
    label: "My Icons",
    description: "Hide Others",
    icon: ImUser({}),
  }
}

export default MyIconsFilter