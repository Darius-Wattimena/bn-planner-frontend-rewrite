import {FrontendBeatmapStatus, UserRole} from "./models/Types";

export const BEATMAP_STATUS = {
  Qualified: {
    id: 1,
    name: 'Qualified',
    className: 'beatmap-status-qualified'
  },
  Bubbled: {
    id: 2,
    name: 'Bubbled',
    className: 'beatmap-status-bubbled'
  },
  Disqualified: {
    id: 3,
    name: 'Disqualified',
    className: 'beatmap-status-disqualified'
  },
  Popped: {
    id: 4,
    name: 'Popped',
    className: 'beatmap-status-popped'
  },
  Pending: {
    id: 5,
    name: 'Pending',
    className: 'beatmap-status-pending'
  },
  Ranked: {
    id: 6,
    name: 'Ranked',
    className: 'beatmap-status-ranked'
  },
  Graved: {
    id: 7,
    name: 'Graved',
    className: 'beatmap-status-graved'
  },
  Unfinished: {
  id: 8,
    name: 'Unfinished',
    className: 'beatmap-status-unfinished'
  }
}

export const USER_ROLES = {
  Nominator: {
    id: 'BN',
    name: 'Beatmap Nominator',
    short: 'Nominator',
    className: 'role-bn'
  },
  Probation: {
    id: 'PBN',
    name: 'Probation Beatmap Nominator',
    short: 'Probation',
    className: 'role-pbn'
  },
  NAT: {
    id: 'NAT',
    name: 'Nomination Assessment',
    short: 'NAT',
    className: 'role-nat'
  },
  Retired: {
    id: 'CA',
    name: 'Retired Nominator',
    short: 'Retired',
    className: 'role-retired'
  },
  Observer: {
    id: 'OBS',
    name: 'Observer',
    short: 'Observer',
    className: 'role-user'
  },
  Guest: {
    id: 'GST',
    name: 'Guest',
    short: 'Guest',
    className: 'role-user'
  }
}
