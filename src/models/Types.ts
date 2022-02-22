export type NominatorPair = Array<number>

export enum ViewMode {
  CARDS,
  TABLE
}

export interface UserContext {
  user?: NewUser,
  accessToken: string,
  refreshToken: string,
  validUntilEpochMilli: number
}

export interface FindResponse<T> {
  total: number,
  count: number,
  response: T[],
  hasMoreData: boolean
  uuid: string
}

export interface NewUser {
  osuId: string,
  username: string,
  gamesmodes: UserGamemode[]
}

export interface UserGamemode {
  gamemode: 'osu' | 'taiko' | 'fruit' | 'mania',
  role: 'Mapper' | 'Nominator' | 'Probation' | 'NominationAssessment' | 'Loved'
}

export enum BeatmapPage {
  PENDING = "PENDING",
  RANKED = "RANKED",
  GRAVEYARD = "GRAVEYARD"
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
  status: number
  mapper: string
  mapperId: number
  nominatedByBNOne: boolean
  nominatedByBNTwo: boolean
  nominators: NominatorPair
  interested: number[]
  note: string
}

export interface DetailedBeatmap {
  osuId: number
  artist: string
  title: string
  status: number
  mapper: string
  mapperId: number
  nominatedByBNOne: boolean
  nominatedByBNTwo: boolean
  nominators: NominatorPair
  interested: number[]
  note: string
  dateAdded: number
  dateRanked: number
  dateUpdated: number
  osuEvents: Event[]
  plannerEvents: Event[]
  aiessEvents: Event[]
}

export interface Event {
  title: string,
  description: string
  userId: number,
  timestamp: number
}

export interface UserRole {
  id: string
  name: string
  short: string
  className: string
}

export interface BeatmapStatus {
  id: number
  name: string
  className: string
}

export interface SelectFilterItem {
  index: number
  label: string
  value: any
  selected: boolean
}

export interface NominatorSelectFilterItem {
  index: number
  label: string
  value: number
  role: string
  selected: boolean
}

export interface BeatmapFilter {
  artist: string | null,
  title: string | null,
  mapper: string | null,
  status: NewBeatmapStatus[],
  page: BeatmapPage,
  hideWithTwoNominators: boolean,
  nominators: number[]
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
