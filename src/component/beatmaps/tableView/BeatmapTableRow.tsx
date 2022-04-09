import BeatmapTableUser from "./BeatmapTableUser";
import React from "react";
import {Beatmap} from "../../../models/Types";
import "./BeatmapTable.scss"
import {GoCommentDiscussion} from "react-icons/go";
import {FiInfo} from "react-icons/fi";
import {AiOutlinePaperClip} from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import {FaStickyNote} from "react-icons/fa";
import {getBeatmapStatus} from "../../../utils/BeatmapUtils";

interface BeatmapTableRowProps {
  beatmap: Beatmap
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapTableRow({beatmap, setOpenBeatmapId}: BeatmapTableRowProps) {
  const beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <tr className={"beatmap-table-row"}>
      <td className={"beatmap-banner-container"}>
        <div className={"beatmap-banner"}
             style={{backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card.jpg)`}}/>
      </td>
      <td className={`beatmap-status`}>
        <div className={`beatmap-status-label ${beatmapStatus.className}`}>{beatmapStatus.name}</div>
      </td>
      <td className={"beatmap-text-cell"}>
        <div className={"beatmap-text"}>
          {beatmap.artist}
        </div>
      </td>
      <td className={"beatmap-text-cell"}>
        <div className={"beatmap-text"}>
          {beatmap.title}
        </div>
      </td>
      <BeatmapTableUser user={beatmap.mapper} nominated={false}/>
      {beatmap.gamemodes.map(gamemodeBeatmap => {
        let bnOne = gamemodeBeatmap.nominators[0]
        let bnTwo = gamemodeBeatmap.nominators[1]

        return (
          <>
            {(bnOne) ? <BeatmapTableUser key={`${gamemodeBeatmap.gamemode}-${bnOne.nominator.osuId}`} user={bnOne.nominator} nominated={bnOne.hasNominated}/> : <td/>}
            {(bnTwo) ? <BeatmapTableUser key={`${gamemodeBeatmap.gamemode}-${bnTwo.nominator.osuId}`} user={bnTwo.nominator} nominated={bnTwo.hasNominated}/> : <td/>}
          </>
        )
      })}
      <td className={"beatmap-table-note"}>
        {beatmap.note &&
        <>
          <a className={"beatmap-button"} data-tip data-for={`${beatmap.osuId}-nominator-note`}><FaStickyNote/></a>
          <ReactTooltip id={`${beatmap.osuId}-nominator-note`} type="dark" effect="solid">
            {beatmap.note}
          </ReactTooltip>
        </>
        }
      </td>
      <td className={"beatmap-table-actions-cell"}>
        <div className={"beatmap-table-actions"}>
          <button className='beatmap-button' onClick={() => setOpenBeatmapId(beatmap.osuId)}><FiInfo/></button>
          <a className='beatmap-button'
             href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}`}><AiOutlinePaperClip/></a>
          <a className='beatmap-button'
             href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}/discussion`}><GoCommentDiscussion/></a>
        </div>
      </td>
    </tr>
  )
}

export default BeatmapTableRow