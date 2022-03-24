import React from "react";
import {Beatmap} from "../../../models/Types";
import {AiOutlinePaperClip} from 'react-icons/ai';
import {GoCommentDiscussion} from 'react-icons/go';
import {FiInfo} from 'react-icons/fi';
import {getBeatmapStatus} from "../../../utils/BeatmapUtils";
import {getUserRole} from "../../../utils/UserUtils";
import {BeatmapCardNominator} from "./BeatmapCardNominator";

interface BeatmapCardProps {
  beatmap: Beatmap | undefined
  setShowBeatmapDetails: React.Dispatch<React.SetStateAction<number | undefined>>
}

function BeatmapCard({beatmap, setShowBeatmapDetails}: BeatmapCardProps) {
  if (!beatmap) return <></>

  let mapperRoleClass = getUserRole(beatmap.mapper)?.className
  const beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <div className={`beatmap-card ${beatmapStatus?.className}`}>
      <div className={`beatmap-status-stripe ${beatmapStatus?.className}`}/>
      <div className={"beatmap-banner-container"}>
        <div className={"beatmap-banner"}
             style={{backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card.jpg)`}}>
          <div className={"beatmap-mapper-container"}>
            <div className={"beatmap-mapper"}>
              <div className={"beatmap-mapper-spacer"}/>
              <div className={"beatmap-mapper-picture-container"}>
                <div className={"beatmap-mapper-picture"}
                     style={{backgroundImage: `url(https://a.ppy.sh/${beatmap.mapper.osuId})`}}/>
              </div>
              <div className={`beatmap-user-username ${mapperRoleClass}`}>
                {beatmap.mapper.username}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"beatmap-details"}>
        <div className={"beatmap-details-title"}>
          {truncate(beatmap.title, 25)}
        </div>
        <div className={"beatmap-details-artist"}>
          {truncate(beatmap.artist, 25)}
        </div>
        <div className={"beatmap-nominators"}>
          {beatmap.gamemodes.map(gamemodeBeatmap =>
            gamemodeBeatmap.nominators.map(beatmapNominator =>
              <BeatmapCardNominator key={beatmapNominator.nominator.osuId} user={beatmapNominator.nominator}
                                    nominated={beatmapNominator.hasNominated}/>
            )
          )}
        </div>
      </div>

      <div className={"beatmap-card-footer"}>
        <button className='beatmap-button' onClick={() => setShowBeatmapDetails(beatmap.osuId)}><FiInfo/></button>
        <a className='beatmap-button' href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}`}><AiOutlinePaperClip/></a>
        <a className='beatmap-button'
           href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}/discussion`}><GoCommentDiscussion/></a>
      </div>
    </div>
  )
}

function truncate(str: string, n: number) {
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

export default BeatmapCard