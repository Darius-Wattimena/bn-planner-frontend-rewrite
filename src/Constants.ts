export const BEATMAP_GAMEMODE = {
  OSU: {
    id: 1,
    name: 'osu',
    className: 'beatmap-gamemode-osu'
  },
  TAIKO: {
    id: 2,
    name: 'taiko',
    className: 'beatmap-gamemode-taiko'
  },
  CATCH: {
    id: 3,
    name: 'catch',
    className: 'beatmap-gamemode-catch'
  },
  MANIA: {
    id: 4,
    name: 'mania',
    className: 'beatmap-gamemode-mania'
  }
}

export const BEATMAP_STATUS = {
  Qualified: {
    id: 1,
    name: 'Qualified',
    className: 'beatmap-status-qualified'
  },
  Nominated: {
    id: 2,
    name: 'Nominated',
    className: 'beatmap-status-bubbled'
  },
  Disqualified: {
    id: 3,
    name: 'Disqualified',
    className: 'beatmap-status-disqualified'
  },
  Reset: {
    id: 4,
    name: 'Reset',
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
  Mapper: {
    id: 'MPR',
    name: 'Mapper',
    short: 'Mapper',
    className: 'role-user'
  }
}
