import BeatmapTableNominator from "./BeatmapTableNominator";
import React from "react";
import {Beatmap} from "../../../models/Types";

interface BeatmapTableRowProps {
  beatmap: Beatmap | undefined
}

function BeatmapTableRow({ beatmap }: BeatmapTableRowProps) {
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
          <p>{beatmap.mapper.username}</p>
        </td>
        {beatmap.gamemodes.map(gamemodeBeatmap =>
          gamemodeBeatmap.nominators.map(beatmapNominator =>
            <BeatmapTableNominator osuId={beatmapNominator.nominator.osuId}/>)
        )}
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