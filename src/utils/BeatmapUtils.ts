import {BEATMAP_STATUS} from "../Constants";

export function getBeatmapStatus(statusId: number) {
  if (statusId) {
    return BEATMAP_STATUS.find(i => i.id === statusId)
  }

  return null
}

export function getRoleClass(role: string | null | undefined) {
  if (role === "NAT") {
    return "role-nat"
  } else if (role === "BN") {
    return "role-bn"
  } else if (role === "PBN") {
    return "role-pbn"
  } else if (role === "CA") {
    return "role-retired"
  } else {
    return "role-user"
  }
}