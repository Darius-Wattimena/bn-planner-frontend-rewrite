export type Gamemode = 'osu' | 'taiko' | 'fruits' | 'mania'
export type UserRole = 'Mapper' | 'Nominator' | 'Probation' | 'NominationAssessment' | 'Loved'
export type ViewMode = 'CARDS' | 'TABLE'
export type PageLimit = 'TEN' | 'TWENTY' | 'FIFTY'
export type BeatmapPage = 'PENDING' | 'RANKED' | 'GRAVEYARD'

export interface UserContext {
  user: NewUser,
  accessToken: string,
  refreshToken: string,
  validUntilEpochMilli: number
  permission: RolePermission
}

export interface RolePermission {
  osuRole: UserRole,
  roles: string[]
}

export interface NewUser {
  osuId: string,
  username: string,
  gamemodes: UserGamemode[]
}

export interface UserGamemode {
  gamemode: Gamemode,
  role: UserRole
}

export interface User {
  aliases: string[];
  hasAdminPermissions: boolean;
  hasEditPermissions: boolean;
  osuId: number;
  osuName: string;
  profilePictureUri: string;
  role: string;
}

export interface Beatmap {
  osuId: number
  artist: string
  title: string
  note: string,
  mapper: NewUser,
  status: NewBeatmapStatus
  gamemodes: BeatmapGamemode[]
}

export interface BeatmapGamemode {
  gamemode: Gamemode,
  nominators: BeatmapNominator[],
  isReady: boolean
}

export interface BeatmapNominator {
  nominator: NewUser,
  hasNominated: boolean
}

export interface FrontendUserRole {
  id: string
  name: string
  short: string
  className: string
}

export interface FrontendBeatmapStatus {
  id: number
  name: string
  className: string
}

export interface SelectFilterItem {
  index: number
  label: string
  value: any
  selected: boolean
  disabled?: boolean
}

export interface NominatorSelectFilterItem {
  index: number
  label: string
  value: string
  role: string
  selected: boolean
}

export interface UserSearchFilter {
  username: string | null,
  gamemodes: Gamemode[],
  roles: UserRole[]
}

export interface BeatmapFilter {
  artist: string | null,
  title: string | null,
  mapper: string | null,
  status: NewBeatmapStatus[],
  page: BeatmapPage,
  hideWithTwoNominators: boolean,
  nominators: string[]
}

export enum NewBeatmapStatus {
  Qualified = "Qualified",
  Bubbled = "Bubbled",
  Disqualified = "Disqualified",
  Popped = "Popped",
  Pending = "Pending",
  Ranked = "Ranked",
  Graved = "Graved",
  Unfinished = "Unfinished"
}
