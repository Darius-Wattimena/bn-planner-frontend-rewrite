import {AvailableQuickFilter, BeatmapFilter, BeatmapPage, BeatmapStatus} from "../../../../../models/Types";
import {useState} from "react";
import {remove} from "lodash";
import {FaComment} from "react-icons/fa6";

interface StatusQuickFilterProps {
  status: BeatmapStatus
  initialBeatmapFilter: BeatmapFilter
  page: BeatmapPage
}

const StatusQuickFilter = ({status, initialBeatmapFilter, page}: StatusQuickFilterProps): AvailableQuickFilter<BeatmapStatus> => {
  const [selected, setSelected] = useState(shouldBeSelected(status, initialBeatmapFilter))

  function onSelect(value: BeatmapStatus, beatmapFilter: BeatmapFilter) {
    if (!beatmapFilter.status.includes(value)) {
      beatmapFilter.status.push(value)
    }

    return beatmapFilter
  }

  function onRemove(value: BeatmapStatus, beatmapFilter: BeatmapFilter) {
    remove(beatmapFilter.status, it => it === value)
    return beatmapFilter
  }

  function shouldBeSelected(value: BeatmapStatus, beatmapFilter: BeatmapFilter) {
    return beatmapFilter.status.includes(value)
  }

  function shouldBeDisabled(value: BeatmapStatus, page: BeatmapPage) {
    switch (page) {
      case "RANKED":
      case "GRAVEYARD":
        return true
      case "PENDING":
        return value === BeatmapStatus.Ranked || value === BeatmapStatus.Graved
    }
  }

  return  {
    key: `status-filter-${status}`,
    onSelect: onSelect,
    onRemove: onRemove,
    shouldBeSelected: shouldBeSelected,
    setSelected: setSelected,
    selected: selected,
    disabled: shouldBeDisabled(status, page),
    props: undefined,
    type: undefined,
    value: status,
    label: `${Object.keys(BeatmapStatus)[Object.values(BeatmapStatus).indexOf(status)]}`,
    description: `Show ${Object.keys(BeatmapStatus)[Object.values(BeatmapStatus).indexOf(status)]} beatmaps`,
    icon: FaComment({})
  }
}

export default StatusQuickFilter