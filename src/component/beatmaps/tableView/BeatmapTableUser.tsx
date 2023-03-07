import React from "react";
import {User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";

interface BeatmapTableUserProps {
  user: User
  nominated: boolean
}

function BeatmapTableUser({user, nominated}: BeatmapTableUserProps) {
  let name = user.username
  let profilePictureUri = getProfilePictureUri(user.osuId)

  let hasNominatedClass = "";
  let nominatorRole = getUserRole(user)

  if (nominated) {
    hasNominatedClass = "nominated"
  }

  return (
    <td className={`beatmap-table-user ${hasNominatedClass}`}>
      <div className={`beatmap-nominator-container ${nominatorRole.className}`}>
        <div
          className={`beatmap-nominator-picture`}
          style={{backgroundImage: `url(${profilePictureUri})`}}/>
        <div className={"beatmap-nominator-text"}>
          {name}
        </div>
      </div>
    </td>
  )
}

export default BeatmapTableUser