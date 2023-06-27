import React from "react";
import {User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";

interface BeatmapTableUserProps {
  user: User
  nominated: boolean
  rowSpan?: number
}

function BeatmapTableUser(props: BeatmapTableUserProps) {
  let name = props.user.username
  let profilePictureUri = getProfilePictureUri(props.user.osuId)

  let hasNominatedClass = "";
  let nominatorRole = getUserRole(props.user)

  if (props.nominated) {
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