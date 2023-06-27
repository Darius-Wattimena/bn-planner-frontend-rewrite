import React from "react";
import {Gamemode, User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import {ReactComponent as OsuLogo} from "../../../assets/osu.svg";
import {ReactComponent as TaikoLogo} from "../../../assets/taiko.svg";
import {ReactComponent as CatchLogo} from "../../../assets/catch.svg";
import {ReactComponent as ManiaLogo} from "../../../assets/mania.svg";

interface BeatmapTableUserProps {
  user: User
  nominated: boolean
  rowSpan?: number
  gamemode?: Gamemode
}

function BeatmapTableUser(props: BeatmapTableUserProps) {
  let name = props.user.username
  let profilePictureUri = getProfilePictureUri(props.user.osuId)

  let hasNominatedClass = "";
  let nominatorRole = getUserRole(props.user)

  if (props.nominated) {
    hasNominatedClass = "nominated"
  }

  let gamemodeText = <></>

  if (props.gamemode == Gamemode.Osu) {
    gamemodeText = <OsuLogo/>
  } else if (props.gamemode == Gamemode.Taiko) {
    gamemodeText = <TaikoLogo/>
  } else if (props.gamemode == Gamemode.Catch) {
    gamemodeText = <CatchLogo/>
  } else if (props.gamemode == Gamemode.Mania) {
    gamemodeText = <ManiaLogo/>
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
        {gamemodeText}
      </div>
    </td>
  )
}

export default BeatmapTableUser