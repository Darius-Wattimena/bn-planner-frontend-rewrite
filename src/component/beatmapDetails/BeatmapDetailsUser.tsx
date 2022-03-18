import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {IconContext} from "react-icons";
import {ImCheckmark, ImCross, ImPencil} from "react-icons/im";
import React from "react";
import {NewUser} from "../../models/Types";
import {USER_ROLES} from "../../Constants";

interface BeatmapDetailsUserProps {
  user: NewUser
  editable: boolean
  hasNominated?: boolean
  nominator?: number
  setOpenUserSearcher?: React.Dispatch<React.SetStateAction<boolean>>
}

function BeatmapDetailsUser({user, hasNominated, editable, nominator, setOpenUserSearcher}: BeatmapDetailsUserProps) {
  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)

  const nominatorClassName = (nominator) ? "beatmap-user-nominator" : ""
  const hasNominatedClassName = (hasNominated) ? "nominated" : ""

  return (
    <div className={`beatmap-user ${nominatorClassName} ${hasNominatedClassName}`}>
      <div className={"beatmap-user-picture-container"}>
        <div className={"beatmap-user-picture"} style={{backgroundImage: `url(${profilePictureUri})`}}>
          {roleDetails.id !== USER_ROLES.Mapper.id &&
            <div className={`beatmap-user-ribbon`}>
              <div className={`beatmap-user-role ${roleDetails.className}`}>
                {roleDetails.short}
              </div>
            </div>
          }
        </div>
      </div>
      <div className={"beatmap-user-details"}>
        {nominator &&
          <div className={`beatmap-user-text`}>
            {`Nominator #${nominator}`}
          </div>
        }
        <div className={`beatmap-user-text`}>
          {user.username} {nominator && setOpenUserSearcher &&
            <a href="#">
              <ImPencil onClick={() => setOpenUserSearcher(true)} />
            </a>
          }
        </div>
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