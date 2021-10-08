import React, {useEffect, useState} from "react";
import {Beatmap, User, UserRole} from "../../models/Types";
import {NavLink, useParams} from "react-router-dom";
import './BeatmapsDetails.scss';
import {getBeatmapStatus} from "../../utils/BeatmapUtils";
import {getUserRole} from "../../utils/UserUtils";
import {ImCheckmark, ImCross, ImBin2, FaStickyNote} from "react-icons/all";
import { IconContext } from "react-icons";
import { useHistory } from "react-router-dom";

interface BeatmapDetailsParams {
  beatmapId: string | undefined
}

function BeatmapDetails() {
  const [beatmap, setBeatmap] = useState<Beatmap>()
  let { beatmapId } = useParams<BeatmapDetailsParams>();

  let tempBeatmaps = require('./../beatmaps/temp-beatmaps.json') as Beatmap[];
  let tempUsers = require('./../beatmaps/temp-users.json') as User[];

  useEffect(() => {
    // TODO replace with a call to the API
    const numberBeatmapId = Number(beatmapId)
    if (!isNaN(+numberBeatmapId)) {
      const foundBeatmap = tempBeatmaps.find(item => item.osuId === Number(beatmapId))
      setBeatmap(foundBeatmap)
    }
  }, [beatmapId, tempBeatmaps])

  return (
    <div className={"page-container beatmap-details-page"}>
      { (beatmap) ? (
        <BeatmapDetailsContainer beatmap={beatmap} users={tempUsers} />
      ) : (
        (
          <p>Could not find Beatmap with Id {beatmapId}</p>
        )
      )}
    </div>
  )
}

interface BeatmapDetailsContainerProps {
  beatmap: Beatmap,
  users: User[]
}

function BeatmapDetailsContainer({ beatmap, users }: BeatmapDetailsContainerProps) {
  let history = useHistory()

  const mapperDetails = users.find(user => user.osuId === beatmap.mapperId)
  const roleDetails = getUserRole(mapperDetails)
  const beatmapStatus = getBeatmapStatus(beatmap.status)
  const nominator1 = getNominatorDetails(beatmap.nominators[0])
  const nominator1Role = getUserRole(nominator1)
  const nominator2 = getNominatorDetails(beatmap.nominators[1])
  const nominator2Role = getUserRole(nominator2)

  function getNominatorDetails(nominatorId: number) {
    if (nominatorId === 0) {
      return {
        aliases: [],
        hasAdminPermissions: false,
        hasEditPermissions: false,
        osuId: 0,
        osuName: "-",
        profilePictureUri: "https://osu.ppy.sh/images/layout/avatar-guest@2x.png",
        role: "GST"
      } as User
    } else {
      return users.find(user => user.osuId === nominatorId)
    }
  }

  return (
    <div className={"beatmap-details-container-border"}>
      <div className={"beatmap-details-container"}>
        <div className={"beatmap-banner"} style={{backgroundImage: `linear-gradient(to top, rgba(64, 64, 64), rgba(64, 64, 64, 0.8), rgba(64, 64, 64, 0.6), rgba(64, 64, 64, 0.4), rgba(0,0,0,0)), url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/cover@2x.jpg)`}}/>
        <div className={"beatmap-details"}>
          <div className={"beatmap-details-sub-container beatmap-nominators-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Nominators
            </div>
            <BeatmapDetailsUser
              userId={nominator1?.osuId}
              username={nominator1?.osuName}
              role={nominator1Role}
              hasNominated={beatmap.nominatedByBNOne}
              editable={false}
            />
            <BeatmapDetailsUser
              userId={nominator2?.osuId}
              username={nominator2?.osuName}
              role={nominator2Role}
              hasNominated={beatmap.nominatedByBNTwo}
              editable={false}
            />
          </div>
          <div className={"beatmap-details-sub-container beatmap-metadata-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Metadata
            </div>
            <div className={"beatmap-metadata"}>
              <BeatmapDetailsMetadataField
                value={beatmap.artist}
                label={"Artist"}
              />
              <BeatmapDetailsMetadataField
                value={beatmap.title}
                label={"Title"}
              />
            </div>
          </div>
          <div className={"beatmap-details-sub-container beatmap-mapper-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Mapper
            </div>
            <BeatmapDetailsUser
              userId={beatmap.mapperId}
              username={beatmap.mapper}
              role={roleDetails}
              editable={false}
            />
          </div>
        </div>
        <div className={"beatmap-details-sub-container beatmap-actions"}>
          <div className={"beatmap-details-sub-container-title"}>
            Actions
          </div>
          <div className={"actions-row"}>
            <div className={"actions-button-group actions-button-group-left"}>
              <button onClick={() => {history.goBack()}} className={"button button-cancel button-text"}>
                <ImBin2 /> Delete
              </button>
            </div>
            <div className={"actions-button-group actions-button-group-right"}>
              <button onClick={() => {history.goBack()}} className={"button button-edit button-text"}>
                <FaStickyNote /> Edit Nominator Note
              </button>

              <button onClick={() => {history.goBack()}} className={"button button-cancel button-text"}>
                <ImCross /> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BeatmapDetailsUserProps {
  editable: boolean
  userId?: number
  username?: string
  role?: UserRole
  hasNominated?: boolean
}

function BeatmapDetailsUser({ userId, username, role, hasNominated, editable }: BeatmapDetailsUserProps) {
  return (
    <div className={"beatmap-user"}>
      <div className={"beatmap-user-picture-container"}>
        <div className={"beatmap-user-picture"} style={{ backgroundImage: `url(https://a.ppy.sh/${userId})`}} />
      </div>
      <div className={"beatmap-user-details"}>
        <div className={`beatmap-user-username`}>
          {username}
        </div>
        {role &&
          <div className={`beatmap-user-role ${role.className}`}>
            {role.name}
          </div>
        }
        <div className="beatmap-user-nomination-status">
          {hasNominated === true &&
            <IconContext.Provider value={{ className: "beatmap-user-nominated" }}>
              <div className={"beatmap-user-nominated"}>
                <ImCheckmark /> Nominated
              </div>
            </IconContext.Provider>
          }
          {hasNominated === false &&
            <IconContext.Provider value={{ className: "beatmap-user-not-nominated" }}>
              <div className={"beatmap-user-not-nominated"}>
                <ImCross /> Not Nominated
              </div>
            </IconContext.Provider>
          }
        </div>
      </div>
    </div>
  )
}

interface BeatmapDetailsMetadataFieldProps {
  label: string
  value: string
}

function BeatmapDetailsMetadataField({ label, value }: BeatmapDetailsMetadataFieldProps) {
  return (
    <div className={"beatmap-metadata-item"}>
      <div className={"beatmap-metadata-label"}>{label}</div>
      <p className={"beatmap-metadata-value"}>{value}</p>
    </div>
  )
}

export default BeatmapDetails