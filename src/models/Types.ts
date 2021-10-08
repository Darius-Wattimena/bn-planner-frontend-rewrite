export type NominatorPair = Array<number>

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

export interface UserRole {
  id: string
  name: string
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
  value: number
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
  status: number[],
  page: 'PENDING' | 'RANKED' | 'GRAVEYARD',
  hideWithTwoNominators: boolean,
  nominators: number[]
}
