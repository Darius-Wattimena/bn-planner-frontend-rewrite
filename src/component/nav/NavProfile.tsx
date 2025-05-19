import React, {JSX} from "react";
import {getFrontendRole, getProfilePictureUri} from "../../utils/UserUtils";
import {Gamemode, User, UserGamemode} from "../../models/Types";
import OsuLogo from "../../assets/osu.svg?react";
import TaikoLogo from "../../assets/taiko.svg?react";
import CatchLogo from "../../assets/catch.svg?react";
import ManiaLogo from "../../assets/mania.svg?react";
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
        <div key={"user-roles-" + role + "-" + user.osuId} className={`navbar-user-role ${roleDetails.className}`}>
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
                <div key={beatmapGamemode.gamemode} className={"navbar-user-role-icon"}>
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
          <div key={"navbar-user-username-" + user.osuId} className={"username"}>{user.username}</div>
          <div key={"navbar-user-roles" + user.osuId} className={"navbar-user-roles"}>
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