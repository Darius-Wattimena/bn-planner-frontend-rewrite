import React from "react";
import {getFrontendRole, getProfilePictureUri} from "../../utils/UserUtils";
import {Gamemode, User, UserGamemode} from "../../models/Types";
import {ReactComponent as OsuLogo} from "../../assets/osu.svg";
import {ReactComponent as TaikoLogo} from "../../assets/taiko.svg";
import {ReactComponent as CatchLogo} from "../../assets/catch.svg";
import {ReactComponent as ManiaLogo} from "../../assets/mania.svg";
import {Dictionary, groupBy} from "lodash";

interface NavProfileProps {
  user: User
}

function NavProfile({user}: NavProfileProps) {
  if (user) {
    let profilePictureUri = getProfilePictureUri(user.osuId)
    const proficientGamemodes: Dictionary<UserGamemode[]> = groupBy(user.gamemodes, it => it.role)
    let preparedGamemodes: JSX.Element[] = []

    for (const [role, gamemodes] of Object.entries(proficientGamemodes)) {
      const roleDetails = getFrontendRole(role as "Mapper" | "Nominator" | "Probation" | "NominationAssessment")
      let icons = (
        <div className={`navbar-user-role ${roleDetails.className}`}>
          <div className={"navbar-user-role-name"}>{roleDetails.short}</div>
          <div className={"navbar-user-role-icons"}>
            {gamemodes.map(beatmapGamemode => {
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
                <div className={"navbar-user-role-icon"}>
                  {gamemodeLogo}
                </div>
              )
            })}
          </div>
        </div>
      )

      preparedGamemodes.push(icons)
    }

    return (
      <div className={"navbar-profile"}>
        <img src={profilePictureUri} alt={""}/>
        <div className={"navbar-profile-details"}>
          <div className={"username"}>{user.username}</div>
          <div className={"navbar-user-roles"}>
            {preparedGamemodes}
          </div>
        </div>
      </div>
    )
  } else {
    return <div>TODO LOGIN BUTTON</div>
  }
}

export default NavProfile