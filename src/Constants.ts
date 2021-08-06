import {BeatmapStatus} from "./models/Types";

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
    id: 5,
    name: 'Pending',
    className: 'beatmap-status-pending'
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

export const USER_ROLES = {
  BeatmapNominator: {
    id: 'BN',
    name: 'Beatmap Nominator',
    className: 'user-role-bn'
  },
  ProbationBeatmapNominator: {
    id: 'PBN',
    name: 'Probation Beatmap Nominator',
    className: 'user-role-pbn'
  },
  NominationAssessmentTeam: {
    id: 'NAT',
    name: 'Nomination Assessment Team',
    className: 'user-role-nat'
  },
  RetiredCatch: {
    id: 'CA',
    name: 'Retired Nominator',
    className: 'user-role-rc'
  },
  Observer: {
    id: 'OBS',
    name: 'Observer',
    className: 'user-role-observer'
  },
  Guest: {
    id: 'GST',
    name: 'Guest',
    className: 'user-role-observer'
  }
}
