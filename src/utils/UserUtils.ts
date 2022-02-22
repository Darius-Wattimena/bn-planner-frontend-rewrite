import {FrontendUserRole, NewUser, UserRole} from "../models/Types";
import {USER_ROLES} from "../Constants";

export function getUserRole(user: NewUser): FrontendUserRole {
  for (let gamemode of user.gamemodes) {
    switch (gamemode.role) {
      case "Nominator":
        return USER_ROLES.Nominator;
      case "Probation":
        return USER_ROLES.Probation;
      case "NominationAssessment":
        return USER_ROLES.NAT;
      case "Loved":
        return USER_ROLES.Observer;
      case "Mapper":
        return USER_ROLES.Observer;
    }
  }

  return USER_ROLES.Observer;
}

export function getFrontendRole(role: UserRole): FrontendUserRole {
  switch (role) {
    case "Nominator":
      return USER_ROLES.Nominator;
    case "Probation":
      return USER_ROLES.Probation;
    case "NominationAssessment":
      return USER_ROLES.NAT;
    case "Loved":
      return USER_ROLES.Observer;
    case "Mapper":
      return USER_ROLES.Observer;
  }
}

export function getUsersHighestRole(user: NewUser): UserRole {
  let highestRole = 0
  for (let gamemode of user.gamemodes) {
    switch (gamemode.role) {
      case "Nominator":
        if (highestRole < 3) highestRole = 3;
        break;
      case "Probation":
        if (highestRole < 2) highestRole = 2;
        break;
      case "NominationAssessment":
        highestRole = 4;
        break;
      case "Loved":
        if (highestRole < 1) highestRole = 1;
        break;
    }
  }

  if (highestRole === 4) {
    return "NominationAssessment"
  } else if (highestRole === 3) {
    return "Nominator"
  } else if (highestRole === 2) {
    return "Probation"
  } else if (highestRole === 1) {
    return "Loved"
  } else {
    return "Mapper"
  }
}

export function getRole(role: string | null | undefined) {
  switch (role) {
    case "BN":
      return USER_ROLES.Nominator
    case "PBN":
      return USER_ROLES.Probation
    case "NAT":
      return USER_ROLES.NAT
    case "CA":
      return USER_ROLES.Retired
    default:
      return USER_ROLES.Guest
  }
}

export function getProfilePictureUri(userId: string | number | undefined) {
  let profilePictureUri
  const parsedUserId = userId?.toString()

  if (!parsedUserId || parsedUserId === "0") {
    profilePictureUri = 'https://osu.ppy.sh/images/layout/avatar-guest.png'
  } else {
    profilePictureUri = `https://a.ppy.sh/${parsedUserId}`
  }

  return profilePictureUri
}