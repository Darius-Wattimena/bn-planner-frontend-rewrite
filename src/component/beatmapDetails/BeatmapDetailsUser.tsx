import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {IconContext} from "react-icons";
import React from "react";
import {Gamemode, User} from "../../models/Types";
import {USER_ROLES} from "../../Constants";
import OsuLogo from "../../assets/osu.svg?react";
import TaikoLogo from "../../assets/taiko.svg?react";
import CatchLogo from "../../assets/catch.svg?react";
import ManiaLogo from "../../assets/mania.svg?react";
import {FaCheck, FaPencil, FaTrashCan, FaXmark} from "react-icons/fa6";

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
              <div className={"beatmap-user-role-icons"}>
                {user.gamemodes.map(beatmapGamemode => {
                  let gamemodeLogo = <></>
                  if (beatmapGamemode.gamemode === Gamemode.Osu) {
                    gamemodeLogo = <OsuLogo/>
                  } else if (beatmapGamemode.gamemode === Gamemode.Taiko) {
                    gamemodeLogo = <TaikoLogo/>
                  } else if (beatmapGamemode.gamemode === Gamemode.Catch) {
                    gamemodeLogo = <CatchLogo/>
                  } else if (beatmapGamemode.gamemode === Gamemode.Mania) {
                    gamemodeLogo = <ManiaLogo/>
                  }

                  return (
                    <div className={"beatmap-user-role-icon"}>
                      {gamemodeLogo}
                    </div>
                  )
                })}
              </div>
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
              <FaPencil className={"beatmap-nominator-edit-button"} />
            </button>
          }
          {deletable && gamemode && onDeleteNominator && user.osuId !== "0" &&
            <button className={"beatmap-button"} onClick={() => {
              onDeleteNominator(gamemode, user.osuId)
            }}>
              <FaTrashCan className={"beatmap-nominator-edit-button"} />
            </button>
          }
        </div>
        <div className="beatmap-user-nomination-status">
          {hasNominated === true &&
          <IconContext.Provider value={{className: "beatmap-user-nominated"}}>
            <div className={"beatmap-user-nominated"}>
              <FaCheck /> Nominated
            </div>
          </IconContext.Provider>
          }
          {hasNominated === false &&
          <IconContext.Provider value={{className: "beatmap-user-not-nominated"}}>
            <div className={"beatmap-user-not-nominated"}>
              <FaXmark /> Not Nominated
            </div>
          </IconContext.Provider>
          }
        </div>
      </div>
    </div>
  )
}

export default BeatmapDetailsUser