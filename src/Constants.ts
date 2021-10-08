import {BeatmapStatus, UserRole} from "./models/Types";

export const BEATMAP_STATUS: BeatmapStatus[] = [
  {
    id: 1,
    name: 'Qualified',
    className: 'beatmap-status-qualified'
  },
  {
    id: 2,
    name: 'Bubbled',
    className: 'beatmap-status-bubbled'
  },
  {
    id: 3,
    name: 'Disqualified',
    className: 'beatmap-status-disqualified'
  },
  {
    id: 4,
    name: 'Popped',
    className: 'beatmap-status-popped'
  },
  {
    id: 5,
    name: 'Pending',
    className: 'beatmap-status-pending'
  },
  {
    id: 6,
    name: 'Ranked',
    className: 'beatmap-status-ranked'
  },
  {
    id: 7,
    name: 'Graved',
    className: 'beatmap-status-graved'
  },
  {
    id: 8,
    name: 'Unfinished',
    className: 'beatmap-status-unfinished'
  }
]

export const USER_ROLES: UserRole[] = [
  {
    id: 'BN',
    name: 'Beatmap Nominator',
    className: 'role-bn'
  },
  {
    id: 'PBN',
    name: 'Probation Beatmap Nominator',
    className: 'role-pbn'
  },
  {
    id: 'NAT',
    name: 'Nomination Assessment',
    className: 'role-nat'
  },
  {
    id: 'CA',
    name: 'Retired Nominator',
    className: 'role-retired'
  },
  {
    id: 'OBS',
    name: 'Observer',
    className: 'role-user'
  },
  {
    id: 'GST',
    name: 'Guest',
    className: 'role-user'
  }
]