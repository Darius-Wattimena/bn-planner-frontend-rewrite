import React from "react";
import {Gamemode, User} from "../../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import OsuLogo from "../../../assets/osu.svg?react";
import TaikoLogo from "../../../assets/taiko.svg?react";
import CatchLogo from "../../../assets/catch.svg?react";
import ManiaLogo from "../../../assets/mania.svg?react";
import {FaCheck, FaRegThumbsUp} from "react-icons/fa6";

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

  if (props.gamemode === Gamemode.Osu) {
    gamemodeText = <OsuLogo/>
  } else if (props.gamemode === Gamemode.Taiko) {
    gamemodeText = <TaikoLogo/>
  } else if (props.gamemode === Gamemode.Catch) {
    gamemodeText = <CatchLogo/>
  } else if (props.gamemode === Gamemode.Mania) {
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
        <div className={"beatmap-nominator-icons"}>
          {props.nominated &&
            <FaCheck className={"beatmap-nominator-nominated-icon"} />
          }
          {gamemodeText}
        </div>

      </div>
    </td>
  )
}

export default BeatmapTableUser