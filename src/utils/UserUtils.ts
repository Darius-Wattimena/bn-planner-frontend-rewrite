import {User} from "../models/Types";
import {USER_ROLES} from "../Constants";

export function getUserRole(user: User | undefined) {
  if (user) {
    return USER_ROLES.find(role => role.id === user.role)
  }
}

export function getRole(role: string | null | undefined) {
  const foundUserRole = USER_ROLES.find(it => it.id === role)

  if (foundUserRole) {
    return foundUserRole
  } else {
    return USER_ROLES.find(it => it.id === "GST")
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