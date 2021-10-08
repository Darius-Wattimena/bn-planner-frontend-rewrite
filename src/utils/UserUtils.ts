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