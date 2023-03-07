import React from "react";

export type UserRole = 'Mapper' | 'Nominator' | 'Probation' | 'NominationAssessment'
export type ViewMode = 'CARDS' | 'TABLE'
export type PageLimit = 'TEN' | 'TWENTY' | 'FIFTY'
export type BeatmapPage = 'PENDING' | 'RANKED' | 'GRAVEYARD'

export interface UserContext {
  user: User,
  accessToken: string,
  refreshToken: string,
  validUntilEpochMilli: number
  permission: RolePermission
}

export interface RolePermission {
  osuRole: UserRole,
  roles: string[]
}

export interface User {
  osuId: string,
  username: string,
  gamemodes: UserGamemode[]
}

export interface UserGamemode {
  gamemode: Gamemode,
  role: UserRole
}

export interface Beatmap {
  osuId: number
  artist: string
  title: string
  note: string,
  mapper: User,
  status: BeatmapStatus
  gamemodes: BeatmapGamemode[]
}

export interface NewBeatmap {
  osuId: string
  gamemodes: Gamemode[]
}

export interface BeatmapGamemode {
  gamemode: Gamemode,
  nominators: BeatmapNominator[],
  isReady: boolean
}

export interface BeatmapNominator {
  nominator: User,
  hasNominated: boolean
}

export interface FrontendUserRole {
  id: string
  name: string
  short: string
  className: string
}

export interface SelectFilterItem {
  index: number
  label: string
  value: any
  selected: boolean
  disabled?: boolean
}

export interface AvailableQuickFilter<T> extends JSX.Element {
  icon?: JSX.Element
  value?: T
  label: string
  description: string
  disabled: boolean
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  onSelect: (value: T, beatmapFilter: BeatmapFilter) => BeatmapFilter
  onRemove: (value: T, beatmapFilter: BeatmapFilter) => BeatmapFilter
  shouldBeSelected: (value: T, beatmapFilter: BeatmapFilter) => boolean
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
  status: BeatmapStatus[],
  page: BeatmapPage,
  nominators: string[],
  gamemodes: Gamemode[]
  missingNominator: Gamemode[]
}

export enum Gamemode {
  Osu = "osu",
  Taiko = "taiko",
  Catch = "fruits",
  Mania = "mania"
}

export enum BeatmapStatus {
  Qualified = "Qualified",
  Nominated = "Nominated",
  Disqualified = "Disqualified",
  Reset = "Reset",
  Pending = "Pending",
  Ranked = "Ranked",
  Graved = "Graved",
  Unfinished = "Unfinished"
}
