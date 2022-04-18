import React, {useState} from "react";
import {BeatmapFilter, BeatmapGamemode, Gamemode, NewUser} from "../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {ImCheckmark, ImPlus} from "react-icons/im";

interface UserSearcherListProps {
  data: NewUser[] | undefined
  loading: boolean
  beatmapGamemodes?: BeatmapGamemode[]
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string) => void
  beatmapFilter?: BeatmapFilter
}

function UserSearcherList(
  {
    data,
    loading,
    beatmapGamemodes,
    changingGamemode,
    changingUserId,
    onSelectNominator,
    beatmapFilter
  }: UserSearcherListProps) {
  const [userSelected, setUserSelected] = useState(false)

  function isAlreadySelected(user: NewUser) {
    if (beatmapGamemodes !== undefined) {
      return !beatmapGamemodes.find(gamemode =>
        !gamemode.nominators.find(nominator => nominator.nominator.osuId === user.osuId)
      )
    } else if (beatmapFilter !== undefined) {
      const nominators = beatmapFilter["nominators"]

      return nominators.find(nominator => nominator === user.osuId) !== undefined
    }

    return false
  }

  return (
    <div className={"user-searcher-list"}>
      {data && data.map(item => {
        return (
          <UserSearcherUser
            key={item.osuId}
            user={item}
            alreadySelected={isAlreadySelected(item)}
            changingGamemode={changingGamemode}
            changingUserId={changingUserId}
            onSelectNominator={onSelectNominator}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
          />
        )
      })}
    </div>
  )
}

interface UserSearcherUserProps {
  user: NewUser
  alreadySelected: boolean
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string) => void
  userSelected: boolean
  setUserSelected: (value: boolean) => void
}

function UserSearcherUser(
  {
    user,
    alreadySelected,
    changingGamemode,
    changingUserId,
    onSelectNominator,
    userSelected,
    setUserSelected
  }: UserSearcherUserProps) {

  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)
  const canNominateGamemode = user.gamemodes.find(it => it.gamemode === changingGamemode) !== undefined

  return (
    <div className={`user-searcher-user ${alreadySelected ? "already-nominator" : ""}`}>
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
        <UserSearcherUserButton
          alreadySelected={alreadySelected} canNominateGamemode={canNominateGamemode}
          changingGamemode={changingGamemode} changingUserId={changingUserId}
          onSelectNominator={onSelectNominator} setUserSelected={setUserSelected}
          userId={user.osuId} userSelected={userSelected}/>
      </div>
    </div>
  )
}

interface UserSearcherUserButtonProps {
  userId: string
  alreadySelected: boolean
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string) => void
  userSelected: boolean
  setUserSelected: (value: boolean) => void
  canNominateGamemode: boolean
}

function UserSearcherUserButton(
  {
    userId,
    alreadySelected,
    canNominateGamemode,
    userSelected,
    changingUserId,
    setUserSelected,
    onSelectNominator
  }: UserSearcherUserButtonProps) {
  if (alreadySelected) {
    return (
      <div className={"already-nominator"}>
        <ImCheckmark/> Already Selected
      </div>
    )
  }

  if (canNominateGamemode) {
    return (
      <button className='user-select-button' disabled={userSelected} onClick={() => {
        setUserSelected(true)
        onSelectNominator(changingUserId, userId)
      }}>
        <ImPlus/>
        <div className={`user-select-button-text ${alreadySelected ? "already-nominator" : ""}`}>
          Select
        </div>
      </button>
    )
  }

  return (
    <div className={"cant-nominate"}>
      Can't nominate gamemode
    </div>
  )
}

export default UserSearcherList