import React from "react";
import {Gamemode, User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import {ReactComponent as OsuLogo} from '../../../assets/osu.svg';
import {ReactComponent as TaikoLogo} from '../../../assets/taiko.svg';
import {ReactComponent as CatchLogo} from '../../../assets/catch.svg';
import {ReactComponent as ManiaLogo} from '../../../assets/mania.svg';

export interface UserNominatedGamemode {
  user: User
  nominated: boolean
  gamemode: Gamemode
}

interface BeatmapTableMultipleUsersProps {
  users: UserNominatedGamemode[]
}

function BeatmapTableMultipleUsers(props: BeatmapTableMultipleUsersProps) {

  return (
      <td>
        {props.users.map(user => {
          if (user.user.osuId == "0") {
            return (
              <div className={`beatmap-table-user beatmap-table-user-multiple`}>
                <div className={`beatmap-nominator-container`}>
                  -
                </div>
              </div>
            )
          }

          let name = user.user.username
          let profilePictureUri = getProfilePictureUri(user.user.osuId)

          let hasNominatedClass = "";
          let nominatorRole = getUserRole(user.user)

          if (user.nominated) {
            hasNominatedClass = "nominated"
          }

          let gamemodeText = <></>

          if (user.gamemode == Gamemode.Osu) {
            gamemodeText = <OsuLogo/>
          } else if (user.gamemode == Gamemode.Taiko) {
            gamemodeText = <TaikoLogo/>
          } else if (user.gamemode == Gamemode.Catch) {
            gamemodeText = <CatchLogo/>
          } else if (user.gamemode == Gamemode.Mania) {
            gamemodeText = <ManiaLogo/>
          }

          return (
            <div className={`beatmap-table-user beatmap-table-user-multiple ${hasNominatedClass}`}>
              <div className={`beatmap-nominator-container ${nominatorRole.className}`}>
                <div
                  className={`beatmap-nominator-picture`}
                  style={{backgroundImage: `url(${profilePictureUri})`}}/>
                <div className={"beatmap-nominator-text"}>
                  {name}
                </div>
                {gamemodeText}
              </div>
            </div>
          )
        })
      }
    </td>
  )
}

export default BeatmapTableMultipleUsers