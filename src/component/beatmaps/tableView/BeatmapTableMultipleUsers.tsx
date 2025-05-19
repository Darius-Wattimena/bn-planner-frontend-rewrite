import React from "react";
import {Gamemode, User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import OsuLogo from "../../../assets/osu.svg?react";
import TaikoLogo from "../../../assets/taiko.svg?react";
import CatchLogo from "../../../assets/catch.svg?react";
import ManiaLogo from "../../../assets/mania.svg?react";

export interface UserNominatedGamemode {
  user: User
  nominated: boolean
  gamemode: Gamemode
}

interface BeatmapTableMultipleUsersProps {
  beatmapId: number
  users: UserNominatedGamemode[]
}

function BeatmapTableMultipleUsers(props: BeatmapTableMultipleUsersProps) {

  return (
      <td>
        {props.users.map((user, index) => {
          if (user.user.osuId === "0") {
            return (
              <div key={`beatmap-${props.beatmapId}-user-${user.gamemode}-${index}`} className={`beatmap-table-user beatmap-table-user-multiple`}>
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

          if (user.gamemode === Gamemode.Osu) {
            gamemodeText = <OsuLogo/>
          } else if (user.gamemode === Gamemode.Taiko) {
            gamemodeText = <TaikoLogo/>
          } else if (user.gamemode === Gamemode.Catch) {
            gamemodeText = <CatchLogo/>
          } else if (user.gamemode === Gamemode.Mania) {
            gamemodeText = <ManiaLogo/>
          }

          return (
            <div key={`beatmap-${props.beatmapId}-user-${user.gamemode}-${index}`} className={`beatmap-table-user beatmap-table-user-multiple ${hasNominatedClass}`}>
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