import React, {useEffect, useState} from "react";
import "./Admin.scss"
import {Beatmap, BeatmapStatus, UserContext} from "../../models/Types";
import { useNavigate } from "react-router-dom";
import BeatmapDetailsContainer from "../beatmapDetails/BeatmapDetailsContainer";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {ImPlus} from "react-icons/im";

interface HomeProps {
  userContext: UserContext | undefined
}

function Admin({userContext}: HomeProps) {

  return (
    <>
      <div className={`page-container admin-page`}>
        <h3 className="admin-page-header">
          Admin Panel
        </h3>
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
    <div className="panel">
      <SyncUsers />
      <hr />
      <SyncBeatmaps />
    </div>
  )
}

function SyncBeatmaps() {
  const [syncing, setSyncing] = useState(false)
  const [status, setStatus] = useState<BeatmapStatus>()
  const [, execute] = useAxios("", {manual: true})

  function onSyncBeatmaps() {
    setSyncing(true)
    execute(Api.syncBeatmaps(status)).then(() => {
      setSyncing(false)
    })
  }

  return (
    <div className="panel-item">
      <h4>Sync Beatmaps</h4>
      <p>Force sync all beatmaps of the pending page, this will search them up via the osuV2 api. <b>When no status is selected it will sync all beatmaps regardless of status (which can take quite long).</b></p>

      {syncing &&
        <p>Syncing beatmaps, this can take a while depending if a status has been chosen.</p>
      }

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
          <option value="">All Beatmaps</option>
          <option value="Qualified">Qualified</option>
          <option value="Nominated">Nominated</option>
          <option value="Disqualified">Disqualified</option>
          <option value="Reset">Reset</option>
          <option value="Pending">Pending</option>
          <option value="Unfinished">Unfinished</option>
        </select>
      </div>
      <button disabled={syncing} onClick={() => {
        onSyncBeatmaps()
      }} className={"button button-submit button-text"}>
        <ImPlus/> Sync Beatmaps
      </button>
    </div>
  )
}

function SyncUsers() {
  const usersRegex = /[0-9]+/g
  const [value, setValue] = useState("")
  const [syncing, setSyncing] = useState(false)
  const [incorrect, setIncorrect] = useState(false)
  const [, execute] = useAxios("", {manual: true})

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
      execute(Api.fixUsers(result)).then(() => {
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
        <ImPlus/> Sync Users
      </button>
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