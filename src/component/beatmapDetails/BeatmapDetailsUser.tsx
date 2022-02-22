import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {IconContext} from "react-icons";
import {ImCheckmark, ImCross} from "react-icons/im";
import React from "react";
import {NewUser} from "../../models/Types";

interface BeatmapDetailsUserProps {
  user: NewUser
  editable: boolean
  hasNominated?: boolean
}

function BeatmapDetailsUser({user, hasNominated, editable}: BeatmapDetailsUserProps) {
  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)

  return (
    <div className={"beatmap-user"}>
      <div className={"beatmap-user-picture-container"}>
        <div className={"beatmap-user-picture"} style={{backgroundImage: `url(${profilePictureUri})`}}/>
      </div>
      <div className={"beatmap-user-details"}>
        <div className={`beatmap-user-username`}>
          {user.username}
        </div>
        {roleDetails &&
          <div className={`beatmap-user-role ${roleDetails.className}`}>
            {roleDetails.short}
          </div>
        }
        <div className="beatmap-user-nomination-status">
          {hasNominated === true &&
          <IconContext.Provider value={{className: "beatmap-user-nominated"}}>
            <div className={"beatmap-user-nominated"}>
              <ImCheckmark/> Nominated
            </div>
          </IconContext.Provider>
          }
          {hasNominated === false &&
          <IconContext.Provider value={{className: "beatmap-user-not-nominated"}}>
            <div className={"beatmap-user-not-nominated"}>
              <ImCross/> Not Nominated
            </div>
          </IconContext.Provider>
          }
        </div>
      </div>
    </div>
  )
}

export default BeatmapDetailsUser