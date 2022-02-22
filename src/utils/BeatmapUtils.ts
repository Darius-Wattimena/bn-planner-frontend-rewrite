import {BEATMAP_STATUS} from "../Constants";
import {NewBeatmapStatus} from "../models/Types";

export function getBeatmapStatus(status: NewBeatmapStatus) {
  switch (status) {
    case "Qualified":
      return BEATMAP_STATUS.Qualified
    case "Bubbled":
      return BEATMAP_STATUS.Bubbled
    case "Disqualified":
      return BEATMAP_STATUS.Disqualified
    case "Popped":
      return BEATMAP_STATUS.Popped
    case "Pending":
      return BEATMAP_STATUS.Pending
    case "Ranked":
      return BEATMAP_STATUS.Ranked
    case "Graved":
      return BEATMAP_STATUS.Graved
    case "Unfinished":
      return BEATMAP_STATUS.Unfinished
  }
}