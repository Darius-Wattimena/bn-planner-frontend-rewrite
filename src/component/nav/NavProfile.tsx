import React from "react";
import {getProfilePictureUri} from "../../utils/UserUtils";

interface NavProfileProps {
  userId: string
  username: string
  role: string
}

function NavProfile({ userId, username, role }: NavProfileProps) {
  let profilePictureUri = getProfilePictureUri(userId)

  return (
    <div className={"navbar-profile"}>
      <img src={profilePictureUri} alt={""} />
      <div className={"navbar-profile-details"}>
        <div className={"username"}>{username}</div>
        <div className={"role"}>
          <div className={"role-text"}>
            {role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavProfile