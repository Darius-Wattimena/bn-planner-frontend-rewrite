export type NominatorPair = Array<number>

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

export interface BeatmapStatus {
  id: number
  name: string
  className: string
}