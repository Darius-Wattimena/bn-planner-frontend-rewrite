import React, {useEffect, useState} from "react";
import "./Admin.scss"
import {BeatmapStatus, SyncInfo, UserContext} from "../../models/Types";
import {useNavigate} from "react-router-dom";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import PageHeader from "../generic/PageHeader";
import {FaArrowsRotate, FaMap, FaWandMagicSparkles} from "react-icons/fa6";

interface HomeProps {
  userContext: UserContext | undefined
}

function Admin({userContext}: HomeProps) {

  return (
    <>
      <PageHeader title={"Syncing Panel"} icon={<FaWandMagicSparkles />} />
      <div className={`page-container admin-page`}>
        <div className={"page-container-content admin-page-content"}>
          {
            (userContext?.permission.osuRole === "NominationAssessment")
              ? <AdminPanel />
              : <NoPermission />
          }
        </div>
      </div>
    </>

  )
}

function AdminPanel() {
  return (
    <>
      <h3 className="admin-page-header">
        User Syncing Panel
      </h3>
      <div className="panel">
        <SyncUsers />
      </div>
      <h3 className="admin-page-header">
        Beatmap Syncing Panel
      </h3>
      <div className="panel">
        <SyncBeatmaps />
      </div>
    </>

  )
}

function SyncBeatmaps() {
  const [result, setResult] = useState<SyncInfo>()
  const [syncing, setSyncing] = useState(false)
  const [status, setStatus] = useState<BeatmapStatus>(BeatmapStatus.Qualified)
  const [, execute] = useAxios<SyncInfo>("", {manual: true})

  function onSyncBeatmaps(forcedStatus?: BeatmapStatus[]) {
    let syncedStatus = forcedStatus ? forcedStatus : [status]
    setSyncing(true)
    execute(Api.syncBeatmaps(syncedStatus)).then(it => {
      setResult(it.data)
      setSyncing(false)
    })
  }

  return (
    <div className="panel-item">
      <h4>Sync Beatmaps</h4>
      <p>Force sync all beatmaps of the Beatmaps page, this will search them up via the osuV2 api.</p>

      <div className={"message error-message"}>
        <div className={"header"}>Be careful when using this!</div>
        <div className={"content"}>
          <p>When the user can't be found yet on the planner it will force find it.</p>
          <p>1 beatmapset = at least 2 seconds</p>
        </div>
      </div>

      {syncing &&
        <p>Syncing beatmaps, this can take a while depending if a status has been chosen.</p>
      }

      {result &&
        <p>Synced {result.totalSynced} beatmap(s) in {result.duration} milliseconds.</p>
      }

      <div className={"textboxes"}>
        <div className={"textbox"}>
          <label htmlFor={"sync-beatmaps"}>
            Beatmap Status
          </label>
          <select
            id="sync-beatmaps"
            value={status?.toString()}
            disabled={syncing}
            onChange={event => {
              setStatus(event.target.value as BeatmapStatus)
            }}
          >
            <option value="">All beatmaps on the Beatmaps page. This takes a very long time!!!!</option>
            <option value="Qualified">Qualified</option>
            <option value="Nominated">Nominated</option>
            <option value="Disqualified">Disqualified</option>
            <option value="Reset">Reset</option>
            <option value="Pending">Pending</option>
            <option value="Unfinished">Unfinished</option>
          </select>
        </div>

        <div className={"button-group"}>
          <button disabled={syncing} onClick={() => {
            onSyncBeatmaps()
          }} className={"button button-submit button-text"}>
            <FaMap /> Sync Beatmaps
          </button>
          <button disabled={syncing} onClick={() => {
            onSyncBeatmaps([BeatmapStatus.Qualified, BeatmapStatus.Nominated, BeatmapStatus.Disqualified, BeatmapStatus.Reset])
          }} className={"button button-edit button-text"}>
            <FaMap /> Sync Qualified/Nominated/Popped/Disqualified Beatmaps
          </button>
        </div>
      </div>
    </div>
  )
}

function SyncUsers() {
  const [result, setResult] = useState<SyncInfo>()
  const usersRegex = /[0-9]+/g
  const [value, setValue] = useState("")
  const [syncing, setSyncing] = useState(false)
  const [incorrect, setIncorrect] = useState(false)
  const [, execute] = useAxios<SyncInfo>("", {manual: true})

  function validateUsers() {
    const matches = value.matchAll(usersRegex)
    const result = Array.from(matches)

    if (result.length === 0) {
      setIncorrect(true)
      return undefined
    }

    return value.split(',').map(Number)
  }

  function onSyncUsers() {
    let result = validateUsers()
    if (result) {
      setSyncing(true)
      execute(Api.syncUsers(result)).then(it => {
        setResult(it.data)
        setIncorrect(false)
        setSyncing(false)
      })
    }
  }

  return (
    <div className="panel-item">
      <h4>Sync Users</h4>
      <p>Force sync a user, this will search them up via the osuV2 api. User IDs should be provided, separated by a comma.</p>

      {syncing &&
        <p>Syncing users, this should be done in a couple seconds.</p>
      }
      {incorrect &&
        <p>Provided user ids were incorrect. Please provide them correctly!</p>
      }

      {result &&
        <p>Synced {result.totalSynced} user(s) in {result.duration} milliseconds.</p>
      }

      <div className={"textboxes"}>
        <div className={"textbox"}>
          <label htmlFor={"sync-users"}>
            User Ids
          </label>
          <input
            id={"sync-users"}
            value={value?.toString()}
            placeholder={"2369776,318565"}
            onChange={event => {
              setValue(event.target.value)
            }}
            disabled={syncing}
          />
        </div>
        <button disabled={syncing} onClick={() => {
          onSyncUsers()
        }} className={"button button-submit button-text"}>
          <FaArrowsRotate /> Sync Users
        </button>
      </div>
    </div>
  )
}

function NoPermission() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 5000)
  }, [])

  return (
    <div>
      You don't have permission to view the admin panel, redirecting back to home page.
    </div>
  )
}

export default Admin