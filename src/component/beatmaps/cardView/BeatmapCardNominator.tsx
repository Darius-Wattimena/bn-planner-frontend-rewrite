import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import React from "react";
import {User} from "../../../models/Types";

interface BeatmapCardNominatorProps {
  user: User
  nominated: boolean
}

export function BeatmapCardNominator({user, nominated}: BeatmapCardNominatorProps) {
  let nominatorName = user.username
  let nominatorProfilePictureUri = getProfilePictureUri(user.osuId)

  let hasNominatedClass;
  let nominatorRole = getUserRole(user)

  if (nominated) {
    hasNominatedClass = "nominated"
  } else {
    hasNominatedClass = "not-nominated"
  }

  return (
    <div className={`beatmap-nominator ${hasNominatedClass}`}>
      <div className={`beatmap-nominator-picture-container`}>
        <div
          className={`beatmap-nominator-picture`}
          style={{backgroundImage: `url(${nominatorProfilePictureUri})`}}/>
      </div>
      <div className={"beatmap-nominator-text"}>
        <div className={`beatmap-user-username beatmap-nominator-name`}>
          <div className={"beatmap-nominator-name-text"}>
            {nominatorName}
          </div>
          <div className={`beatmap-nominator-role ${nominatorRole.className}`}>
            {nominatorRole.short}
          </div>
        </div>
      </div>
    </div>
  )
}