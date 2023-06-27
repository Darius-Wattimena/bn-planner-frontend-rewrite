import BeatmapTableUser from "./BeatmapTableUser";
import React from "react";
import {Beatmap, BeatmapGamemode, Gamemode} from "../../../models/Types";
import "./BeatmapTable.scss"
import {GoCommentDiscussion} from "react-icons/go";
import {FiInfo} from "react-icons/fi";
import {AiOutlinePaperClip} from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import {FaStickyNote} from "react-icons/fa";
import {getBeatmapStatus} from "../../../utils/BeatmapUtils";
import {openInNewTab} from "../../../utils/LinkUtils";
import BeatmapTableMultipleUsers, {UserNominatedGamemode} from "./BeatmapTableMultipleUsers";

interface BeatmapTableRowProps {
  beatmap: Beatmap
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapTableRow({beatmap, setOpenBeatmapId}: BeatmapTableRowProps) {
  const beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <>
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
      <BeatmapTableUser
        key={`beatmap-table-row-${beatmap.osuId}-mapper`}
        user={beatmap.mapper}
        nominated={false}
      />
      <BeatmapTableRowNominators
        beatmapId={beatmap.osuId}
        gamemodes={beatmap.gamemodes}
      />
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
    </>
  )
}

interface BeatmapTableRowNominatorsProps {
  beatmapId: number
  gamemodes: BeatmapGamemode[]
}

function BeatmapTableRowNominators(props: BeatmapTableRowNominatorsProps) {
  if (props.gamemodes.length == 1) {
    let gamemode = props.gamemodes[0]
    let nominatorOne = gamemode.nominators[0]
    let nominatorTwo = gamemode.nominators[1]

    return (
      <>
        {
          (nominatorOne && nominatorOne.nominator.osuId !== "0") ? (
            <BeatmapTableUser
              key={`beatmap-table-row-${props.beatmapId}-nominator-${gamemode}-${nominatorOne.nominator.osuId}`}
              user={nominatorOne.nominator}
              nominated={nominatorOne.hasNominated}
              gamemode={gamemode.gamemode}
            />
          ) : <td key={`beatmap-table-row-${props.beatmapId}-nominator-${gamemode}-one`}>-</td>
        }
        {
          (nominatorTwo && nominatorTwo.nominator.osuId !== "0") ? (
            <BeatmapTableUser
              key={`beatmap-table-row-${props.beatmapId}-nominator-${gamemode}-${nominatorTwo.nominator.osuId}`}
              user={nominatorTwo.nominator}
              nominated={nominatorTwo.hasNominated}
              gamemode={gamemode.gamemode}
            />
          ) : <td key={`beatmap-table-row-${props.beatmapId}-nominator-${gamemode}-two`}>-</td>
        }
      </>
    )
  }

  let sortedGamemodes = props.gamemodes.sort((a, b) => {
    function getGamemodeNumber(gamemode: Gamemode) {
      switch (gamemode) {
        case Gamemode.Osu:
          return 1;
        case Gamemode.Taiko:
          return 2;
        case Gamemode.Catch:
          return 3;
        case Gamemode.Mania:
          return 4;
      }
    }

    return getGamemodeNumber(a.gamemode) - getGamemodeNumber(b.gamemode)
  })

  let preparedFirstUsers: UserNominatedGamemode[] = sortedGamemodes.map(gamemode => {
    let nominatorOne = gamemode.nominators[0]

    return {
      user: nominatorOne.nominator,
      nominated: nominatorOne.hasNominated,
      gamemode: gamemode.gamemode
    } as UserNominatedGamemode
  })

  let preparedSecondUsers: UserNominatedGamemode[] = sortedGamemodes.map(gamemode => {
    let nominatorTwo = gamemode.nominators[1]

    return {
      user: nominatorTwo.nominator,
      nominated: nominatorTwo.hasNominated,
      gamemode: gamemode.gamemode
    } as UserNominatedGamemode
  })

  return (
    <>
      <BeatmapTableMultipleUsers users={preparedFirstUsers} />
      <BeatmapTableMultipleUsers users={preparedSecondUsers} />
    </>
  )
}

export default BeatmapTableRow