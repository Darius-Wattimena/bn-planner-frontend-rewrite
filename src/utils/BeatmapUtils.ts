import {BEATMAP_STATUS} from "../Constants";

export function getBeatmapStatus(statusId: number) {
  if (statusId) {
    return BEATMAP_STATUS.find(i => i.id === statusId)
  }

  return null
}