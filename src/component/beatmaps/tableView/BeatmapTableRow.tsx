import BeatmapTableNominator from "./BeatmapTableNominator";
import React from "react";
import {Beatmap, User} from "../../../models/Types";

interface BeatmapTableRowProps {
  beatmap: Beatmap | undefined
  users: User[]
}

function BeatmapTableRow({ beatmap, users }: BeatmapTableRowProps) {
  if (beatmap) {
    return (
      <tr key={beatmap.osuId}>
        <td className={"beatmap-banner-container"}>
          <div className={"beatmap-banner"} style={{ backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card.jpg)`}} />
        </td>
        <td>
          <p>{beatmap.artist}</p>
        </td>
        <td>
          <p>{beatmap.title}</p>
        </td>
        <td>
          <p>{beatmap.mapper}</p>
        </td>
        <BeatmapTableNominator osuId={beatmap.nominators[0]}/>
        <BeatmapTableNominator osuId={beatmap.nominators[1]}/>
        <td>
          <p>{beatmap.note}</p>
        </td>
      </tr>
    )
  } else {
    return <div />
  }
}

export default BeatmapTableRow