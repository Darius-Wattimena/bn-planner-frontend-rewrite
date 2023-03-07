import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {IconContext} from "react-icons";
import {ImBin, ImCheckmark, ImCross, ImPencil} from "react-icons/im";
import React from "react";
import {Gamemode, User} from "../../models/Types";
import {USER_ROLES} from "../../Constants";

interface BeatmapDetailsUserProps {
  user: User
  editable: boolean
  deletable: boolean
  hasNominated?: boolean
  nominator?: number
  setOpenUserSearcher?: React.Dispatch<React.SetStateAction<boolean>>
  gamemode?: Gamemode
  setChangingGamemode?: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser?: React.Dispatch<React.SetStateAction<string | undefined>>
  onDeleteNominator?: (gamemode: Gamemode, osuId: string) => void
}

function BeatmapDetailsUser(
  {
    user,
    hasNominated,
    editable,
    deletable,
    nominator,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser,
    gamemode,
    onDeleteNominator
  }: BeatmapDetailsUserProps
) {
  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)

  const nominatorClassName = (nominator) ? "beatmap-user-nominator" : ""
  const hasNominatedClassName = (hasNominated) ? "nominated" : ""

  return (
    <div key={user.osuId} className={`beatmap-user ${nominatorClassName} ${hasNominatedClassName}`}>
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
        <div className={`beatmap-user-text beatmap-user-username`}>
          <div className={"beatmap-user-username-text"}>
            {user.username}
          </div>
          {editable && nominator && setOpenUserSearcher && setChangingGamemode && setChangingUser &&
            <button className={"beatmap-button"} onClick={() => {
              setOpenUserSearcher(true)
              setChangingGamemode(gamemode)
              setChangingUser(user.osuId)
            }}>
              <ImPencil className={"beatmap-nominator-edit-button"} />
            </button>
          }
          {deletable && gamemode && onDeleteNominator && user.osuId !== "0" &&
            <button className={"beatmap-button"} onClick={() => {
              onDeleteNominator(gamemode, user.osuId)
            }}>
              <ImBin className={"beatmap-nominator-edit-button"} />
            </button>
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