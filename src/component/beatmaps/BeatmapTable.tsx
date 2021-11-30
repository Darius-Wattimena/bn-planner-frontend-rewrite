import React from "react";
import {Beatmap} from "../../models/Types";
import BeatmapTableNominator from "./BeatmapTableNominator";
import './BeatmapTable.scss'

interface BeatmapTableProps {
  beatmaps: Array<Beatmap>
}

function BeatmapTable({ beatmaps }: BeatmapTableProps) {
  return (
    <table className={"beatmap-table"}>
      <thead>
        <tr>
          <th>#</th>
          <th>Artist</th>
          <th>Title</th>
          <th>Mapper</th>
          <th>Nominator #1</th>
          <th>Nominator #2</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        { beatmaps.map(beatmap => {
          return (
            <>
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
            </>
          )
        })}
      </tbody>
    </table>
  )
}

export default BeatmapTable