import React, {useState} from "react";
import {BeatmapFilter, BeatmapGamemode, Gamemode, User} from "../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";
import {ImCheckmark, ImMinus, ImPlus} from "react-icons/im";

interface UserSearcherListProps {
  data: User[] | undefined
  loading: boolean
  beatmapGamemodes?: BeatmapGamemode[]
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string | undefined) => void
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

  function isAlreadySelected(user: User) {
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
            beatmapFilter={beatmapFilter}
          />
        )
      })}
    </div>
  )
}

interface UserSearcherUserProps {
  user: User
  alreadySelected: boolean
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string | undefined) => void
  userSelected: boolean
  setUserSelected: (value: boolean) => void
  beatmapFilter: BeatmapFilter | undefined
}

function UserSearcherUser(
  {
    user,
    alreadySelected,
    changingGamemode,
    changingUserId,
    onSelectNominator,
    userSelected,
    setUserSelected,
    beatmapFilter
  }: UserSearcherUserProps) {

  const profilePictureUri = getProfilePictureUri(user.osuId)
  const roleDetails = getUserRole(user)
  const canNominateGamemode = changingGamemode ? user.gamemodes.find(it => it.gamemode === changingGamemode) !== undefined : true

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
          alreadySelected={alreadySelected}
          canNominateGamemode={canNominateGamemode}
          changingGamemode={changingGamemode}
          changingUserId={changingUserId}
          onSelectNominator={onSelectNominator}
          setUserSelected={setUserSelected}
          userId={user.osuId}
          userSelected={userSelected}
          beatmapFilter={beatmapFilter} />
      </div>
    </div>
  )
}

interface UserSearcherUserButtonProps {
  userId: string
  alreadySelected: boolean
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string | undefined) => void
  userSelected: boolean
  setUserSelected: (value: boolean) => void
  canNominateGamemode: boolean
  beatmapFilter: BeatmapFilter | undefined
}

function UserSearcherUserButton(
  {
    userId,
    alreadySelected,
    canNominateGamemode,
    userSelected,
    changingUserId,
    setUserSelected,
    onSelectNominator,
    beatmapFilter
  }: UserSearcherUserButtonProps) {
  if (alreadySelected) {
    // When we have a beatmap filter it means we are filtering on the beatmaps page
    if (beatmapFilter) {
      return (
        <button className='user-select-button deselect' disabled={userSelected} onClick={() => {
          setUserSelected(true)
          onSelectNominator(userId, undefined)
        }}>
          <ImMinus/>
          <div className={`user-select-button-text ${alreadySelected ? "already-nominator" : ""}`}>
            Deselect
          </div>
        </button>
      )
    }

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