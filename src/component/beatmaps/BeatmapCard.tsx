import React from "react";
import {Beatmap} from "../../models/Types";

interface BeatmapCardProps {
  beatmap: Beatmap
}

function getRole(userId: number) {
  if (userId === 702598) {
    return "role-nat"
  } else if (userId === 6345176) {
    return "role-bn"
  } else {
    return "role-user"
  }
}

function BeatmapCard({ beatmap }: BeatmapCardProps) {
  let mapperRoleClass = getRole(beatmap.mapperId)

  return (
    <div className={"beatmap-card"}>
      <div className={"beatmap-banner-container"}>
        <div className={"beatmap-banner"} style={{ backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card@2x.jpg)`}}>
          <div className={"beatmap-mapper-container"}>
            <div className={"beatmap-mapper"}>
              <div className={"beatmap-mapper-spacer"} />
              <div className={"beatmap-mapper-picture"} style={{ backgroundImage: `url(https://a.ppy.sh/${beatmap.mapperId})`}} />
              <div className={`beatmap-user-username ${mapperRoleClass}`}>
                {beatmap.mapper}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"beatmap-details"}>
        <div className={"beatmap-details-title"}>
          {beatmap.title}
        </div>
        <div className={"beatmap-details-artist"}>
          {beatmap.artist}
        </div>
        <div className={"beatmap-nominators"}>
          <BeatmapCardNominator nominatorId={beatmap.nominators[0]} nominated={beatmap.nominatedByBNOne} />
          <BeatmapCardNominator nominatorId={beatmap.nominators[1]} nominated={beatmap.nominatedByBNTwo} />
        </div>
      </div>
    </div>
  )
}

interface BeatmapCardNominatorProps {
  nominatorId: number
  nominated: boolean
}

function BeatmapCardNominator({ nominatorId, nominated }: BeatmapCardNominatorProps) {
  let hasNominatedClass;
  let nominatorRoleClass = getRole(nominatorId)

  if (nominated) {
    hasNominatedClass = "nominated"
  } else {
    hasNominatedClass = "not-nominated"
  }

  return (
    <div className={"beatmap-nominator"}>
      <div
        className={`beatmap-nominator-picture ${hasNominatedClass}`}
        style={{ backgroundImage: `url(https://a.ppy.sh/${nominatorId})`}} />
      <div className={"beatmap-nominator-text"}>
        <div className={`beatmap-user-username beatmap-nominator-name ${nominatorRoleClass}`}>
          {nominatorId}
        </div>
        <div className={hasNominatedClass}>
          {(nominated) ? "Nominated" : "Nominated"}
        </div>
      </div>
    </div>
  )
}

export default BeatmapCard