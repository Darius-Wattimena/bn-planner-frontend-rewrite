import {BEATMAP_GAMEMODE, BEATMAP_STATUS} from "../Constants";
import {Gamemode, NewBeatmapStatus} from "../models/Types";

export function getBeatmapStatus(status: NewBeatmapStatus) {
  switch (status) {
    case "Qualified":
      return BEATMAP_STATUS.Qualified
    case "Nominated":
      return BEATMAP_STATUS.Nominated
    case "Disqualified":
      return BEATMAP_STATUS.Disqualified
    case "Reset":
      return BEATMAP_STATUS.Reset
    case "Pending":
      return BEATMAP_STATUS.Pending
    case "Ranked":
      return BEATMAP_STATUS.Ranked
    case "Graved":
      return BEATMAP_STATUS.Graved
    case "Unfinished":
      return BEATMAP_STATUS.Unfinished
  }

  return BEATMAP_STATUS.Pending
}

export function getBeatmapGamemode(gamemode: Gamemode) {
  switch (gamemode) {
    case Gamemode.Osu:
      return BEATMAP_GAMEMODE.OSU
    case Gamemode.Taiko:
      return BEATMAP_GAMEMODE.TAIKO
    case Gamemode.Catch:
      return BEATMAP_GAMEMODE.CATCH
    case Gamemode.Mania:
      return BEATMAP_GAMEMODE.MANIA
  }

  return BEATMAP_STATUS.Pending
}