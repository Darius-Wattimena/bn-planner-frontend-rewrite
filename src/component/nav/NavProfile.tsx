import React from "react";
import {getFrontendRole, getProfilePictureUri} from "../../utils/UserUtils";
import {NewUser, UserRole} from "../../models/Types";

interface NavProfileProps {
  user: NewUser
  role: UserRole
}

function NavProfile({user, role}: NavProfileProps) {
  if (user) {
    let profilePictureUri = getProfilePictureUri(user.osuId)
    let frontendRole = getFrontendRole(role)

    return (
      <div className={"navbar-profile"}>
        <img src={profilePictureUri} alt={""}/>
        <div className={"navbar-profile-details"}>
          <div className={"username"}>{user.username}</div>
          <div className={"role"}>
            <div className={`role-text ${frontendRole.className}`}>
              {frontendRole.short}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>TODO LOGIN BUTTON</div>
  }
}

export default NavProfile