import React from "react";
import BeatmapTable from "./BeatmapTable"
import {Beatmap} from "../../models/Types";
import BeatmapCard from "./BeatmapCard";
import './Beatmaps.scss';

const TEMP_BEATMAPS: Array<Beatmap> = [{
  "osuId": 1538404,
  "artist": "zts",
  "title": "dreamenddischarger",
  "note": "",
  "mapper": "Spectator",
  "mapperId": 702598,
  "status": 1,
  "nominators": [
    7890134,
    4741164
  ],
  "interested": [],
  "nominatedByBNOne": true,
  "nominatedByBNTwo": true
},
  {
    "osuId": 1532268,
    "artist": "subplaid",
    "title": "If you went out with friends in a way",
    "note": "",
    "mapper": "zerokt",
    "mapperId": 13776127,
    "status": 1,
    "nominators": [
      14057792,
      4741164
    ],
    "interested": [],
    "nominatedByBNOne": true,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1385482,
    "artist": "Yamamoto Mineko",
    "title": "Rinne",
    "note": "",
    "mapper": "Riana",
    "mapperId": 1997633,
    "status": 1,
    "nominators": [
      4778689,
      4741164
    ],
    "interested": [],
    "nominatedByBNOne": true,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1454177,
    "artist": "DJ Genki vs. Camellia feat. moimoi",
    "title": "Sunshine",
    "note": "",
    "mapper": "wonjae",
    "mapperId": 5032045,
    "status": 1,
    "nominators": [
      4778689,
      5431196
    ],
    "interested": [],
    "nominatedByBNOne": true,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1293903,
    "artist": "Camellia as \"Reverse of Riot\"",
    "title": "Completeness Under Incompleteness (\"true prooF\" Long ver.)",
    "note": "",
    "mapper": "Rocma",
    "mapperId": 566276,
    "status": 1,
    "nominators": [
      7890134,
      702598
    ],
    "interested": [],
    "nominatedByBNOne": true,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1007778,
    "artist": "Sakuzyo",
    "title": "Fracture Ray",
    "note": "",
    "mapper": "GiGas",
    "mapperId": 7300747,
    "status": 1,
    "nominators": [
      318565,
      702598
    ],
    "interested": [],
    "nominatedByBNOne": true,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1134081,
    "artist": "Horie Yui",
    "title": "The World's End",
    "note": "",
    "mapper": "Bastian",
    "mapperId": 6345176,
    "status": 2,
    "nominators": [
      2306637,
      5032045
    ],
    "interested": [],
    "nominatedByBNOne": false,
    "nominatedByBNTwo": true
  },
  {
    "osuId": 1507312,
    "artist": "Dreamcatcher",
    "title": "YOU AND I (Cut Ver.)",
    "note": "ready for du5t check",
    "mapper": "zerokt",
    "mapperId": 13776127,
    "status": 3,
    "nominators": [
      6053071,
      6524765
    ],
    "interested": [],
    "nominatedByBNOne": false,
    "nominatedByBNTwo": false
  },
  {
    "osuId": 1363052,
    "artist": "Ikimonogakari",
    "title": "Netsujou no Spectrum (TV Size)",
    "note": "",
    "mapper": "AlexDemon-",
    "mapperId": 16253321,
    "status": 3,
    "nominators": [
      6053071,
      7592136
    ],
    "interested": [],
    "nominatedByBNOne": false,
    "nominatedByBNTwo": false
  },
  {
    "osuId": 1423576,
    "artist": "kors k as teranoid",
    "title": "Bad Maniacs",
    "note": "",
    "mapper": "Lacrima",
    "mapperId": 4915649,
    "status": 3,
    "nominators": [
      5032045,
      636114
    ],
    "interested": [],
    "nominatedByBNOne": false,
    "nominatedByBNTwo": false
  }]

function Beatmaps() {
  return (
    <div className={"page-container-full"}>
      <div className={"card-container"}>
        {TEMP_BEATMAPS.map(beatmap => {
          return (
            <BeatmapCard beatmap={beatmap} />
          )
        })}
      </div>
      {/*<BeatmapTable beatmaps={TEMP_BEATMAPS} />*/}
    </div>
  )
}

export default Beatmaps