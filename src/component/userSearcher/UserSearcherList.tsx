import React from "react";
import {BeatmapGamemode, Gamemode, NewUser} from "../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {ImCheckmark, ImPlus} from "react-icons/im";

interface UserSearcherListProps {
  data: NewUser[] | undefined
  loading: boolean
  beatmapGamemodes: BeatmapGamemode[]
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string, newNominatorId: string) => void
}

function UserSearcherList({
                            data,
                            loading,
                            beatmapGamemodes,
                            changingGamemode,
                            changingUserId,
                            onSelectNominator
                          }: UserSearcherListProps) {
  return (
    <div className={"user-searcher-list"}>
      {data && data.map(item => {
        return (
          <UserSearcherUser
            key={item.osuId}
            user={item}
            alreadyNominator={!beatmapGamemodes.find(gamemode =>
              !gamemode.nominators.find(nominator => nominator.nominator.osuId === item.osuId)
            )}
            changingGamemode={changingGamemode}
            changingUserId={changingUserId}
            onSelectNominator={onSelectNominator}
          />
        )
      })}
    </div>
  )
}

interface UserSearcherUserProps {
  user: NewUser
  alreadyNominator: boolean
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string, newNominatorId: string) => void
}

function UserSearcherUser({
                            user,
                            alreadyNominator,
                            changingGamemode,
                            changingUserId,
                            onSelectNominator
                          }: UserSearcherUserProps) {
  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)
  const canNominateGamemode = user.gamemodes.find(it => it.gamemode === changingGamemode)

  return (
    <div className={`user-searcher-user ${alreadyNominator ? "already-nominator" : ""}`}>
      <div className={"user-searcher-user-picture-container"}>
        <div className={"user-searcher-user-picture"} style={{backgroundImage: `url(${profilePictureUri})`}}/>
      </div>
      <div className={"user-searcher-user-info"}>
        <div className={"user-searcher-user-name"}>
          {user.username}
        </div>
        <div className={`user-searcher-user-role ${roleDetails.className}`}>
          {roleDetails.short}
        </div>
      </div>
      <div className={"user-searcher-user-actions"}>
        {(alreadyNominator) ? (
          <div className={"already-nominator"}>
            <ImCheckmark/> Already Nominator
          </div>
        ) : (canNominateGamemode) ? (
          <button className='user-select-button' onClick={() => {
            if (changingUserId) {
              onSelectNominator(changingUserId, user.osuId)
            }
          }}>
            <ImPlus/>
            <div className={`user-select-button-text ${alreadyNominator ? "already-nominator" : ""}`}>
              Select Nominator
            </div>
          </button>
        ) : (
          <div className={"cant-nominate"}>
            Can't nominate gamemode
          </div>
        )}
      </div>
    </div>
  )
}

export default UserSearcherList