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
import {openInNewTab} from "../../../utils/LinkUtils";

interface BeatmapTableRowProps {
  beatmap: Beatmap
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapTableRow({beatmap, setOpenBeatmapId}: BeatmapTableRowProps) {
  const beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <tr className={"beatmap-table-row"}>
      <td key={`beatmap-table-row-${beatmap.osuId}-banner`} className={"beatmap-banner-container"}>
        <div className={"beatmap-banner"}
             style={{backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card.jpg)`}}/>
      </td>
      <td key={`beatmap-table-row-${beatmap.osuId}-status`} className={`beatmap-status`}>
        <div className={`beatmap-status-label ${beatmapStatus.className}`}>{beatmapStatus.name}</div>
      </td>
      <td key={`beatmap-table-row-${beatmap.osuId}-artist`} className={"beatmap-text-cell"}>
        <div className={"beatmap-text"}>
          {beatmap.artist}
        </div>
      </td>
      <td key={`beatmap-table-row-${beatmap.osuId}-title`} className={"beatmap-text-cell"}>
        <div className={"beatmap-text"}>
          {beatmap.title}
        </div>
      </td>
      <BeatmapTableUser key={`beatmap-table-row-${beatmap.osuId}-mapper`} user={beatmap.mapper} nominated={false}/>
      {beatmap.gamemodes.map(gamemodeBeatmap => {
        let bnOne = gamemodeBeatmap.nominators[0]
        let bnTwo = gamemodeBeatmap.nominators[1]

        return (
          <React.Fragment key={`beatmap-table-row-${beatmap.osuId}-nominators-${gamemodeBeatmap.gamemode}`}>
            {(bnOne && bnOne.nominator.osuId !== "0") ? (
              <BeatmapTableUser
                key={`beatmap-table-row-${beatmap.osuId}-nominator-${gamemodeBeatmap.gamemode}-${bnOne.nominator.osuId}`}
                user={bnOne.nominator}
                nominated={bnOne.hasNominated}
              />
            ) : <td key={`beatmap-table-row-${beatmap.osuId}-nominator-${gamemodeBeatmap.gamemode}-one`} />}
            {(bnTwo && bnTwo.nominator.osuId !== "0") ? (
              <BeatmapTableUser
                key={`beatmap-table-row-${beatmap.osuId}-nominator-${gamemodeBeatmap.gamemode}-${bnTwo.nominator.osuId}`}
                user={bnTwo.nominator}
                nominated={bnTwo.hasNominated}
              />
            ) : <td key={`beatmap-table-row-${beatmap.osuId}-nominator-${gamemodeBeatmap.gamemode}-two`} />}
          </React.Fragment>
        )
      })}
      <td key={`beatmap-table-row-${beatmap.osuId}-note`} className={"beatmap-table-note"}>
        {beatmap.note &&
        <>
          <a className={"beatmap-button"} data-tip data-for={`${beatmap.osuId}-nominator-note`}><FaStickyNote/></a>
          <ReactTooltip id={`${beatmap.osuId}-nominator-note`} type="dark" effect="solid">
            {beatmap.note}
          </ReactTooltip>
        </>
        }
      </td>
      <td key={`beatmap-table-row-${beatmap.osuId}-actions`} className={"beatmap-table-actions-cell"}>
        <div className={"beatmap-table-actions"}>
          <button key={`beatmap-table-row-beatmap-${beatmap.osuId}-button`} className='beatmap-button' onClick={() => setOpenBeatmapId(beatmap.osuId)}><FiInfo/></button>
          <button key={`beatmap-table-row-beatmap-${beatmap.osuId}-link-button`} className='beatmap-button' onClick={() => openInNewTab(`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}`)}>
            <AiOutlinePaperClip/>
          </button>
          <button key={`beatmap-table-row-beatmap-${beatmap.osuId}-discussion-button`} className='beatmap-button' onClick={() => openInNewTab(`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}/discussion`)}>
            <GoCommentDiscussion/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BeatmapTableRow